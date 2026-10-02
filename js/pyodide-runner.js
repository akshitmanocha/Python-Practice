// ==========================================================================
// Pyodide WebAssembly Python Execution Engine
// Executes user code inside the browser with zero server latency
// ==========================================================================

window.PyodideRunner = {
  pyodide: null,
  status: "uninitialized", // uninitialized | loading | ready | error
  statusMessage: "",
  initPromise: null,
  listeners: [],
  loadedPackages: new Set(),

  onStatusChange(fn) {
    this.listeners.push(fn);
    if (this.status !== "uninitialized") {
      fn(this.status, this.statusMessage);
    }
  },

  notifyStatus(status, message = "") {
    this.status = status;
    this.statusMessage = message;
    this.listeners.forEach((fn) => fn(status, message));
  },

  async init() {
    if (this.pyodide) return this.pyodide;
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      this.notifyStatus("loading", "Initializing Python 3.11 (WebAssembly)...");

      try {
        // Wait for Pyodide CDN script tag if still loading
        let retries = 0;
        while (typeof loadPyodide === "undefined" && retries < 60) {
          await new Promise((resolve) => setTimeout(resolve, 100));
          retries++;
        }

        if (typeof loadPyodide === "undefined") {
          throw new Error("Pyodide script failed to load from CDN. Please check your internet connection.");
        }

        const py = await loadPyodide({
          indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/"
        });

        // Redirect stdout and stderr buffer
        await py.runPythonAsync(`
import sys
import io

class OutputBuffer:
    def __init__(self):
        self.stdout_buf = io.StringIO()
        self.stderr_buf = io.StringIO()
        
    def get_and_clear_stdout(self):
        val = self.stdout_buf.getvalue()
        self.stdout_buf = io.StringIO()
        return val

    def get_and_clear_stderr(self):
        val = self.stderr_buf.getvalue()
        self.stderr_buf = io.StringIO()
        return val

__py_runner_buffer__ = OutputBuffer()
sys.stdout = __py_runner_buffer__.stdout_buf
sys.stderr = __py_runner_buffer__.stderr_buf
`);

        // Pre-install micropip and sortedcontainers
        try {
          await py.loadPackage("micropip");
          const micropip = py.pyimport("micropip");
          await micropip.install("sortedcontainers");
          this.loadedPackages.add("sortedcontainers");
        } catch (pkgErr) {
          console.warn("Could not preload sortedcontainers:", pkgErr);
        }

        this.pyodide = py;
        this.notifyStatus("ready", "Python 3.11");
        return this.pyodide;
      } catch (err) {
        console.error("Pyodide load error:", err);
        this.notifyStatus("error", err.message || "Failed to load Pyodide");
        this.initPromise = null; // Allow retry on failure
        throw err;
      }
    })();

    return this.initPromise;
  },

  async ensurePackagesForTrack(trackId) {
    if (!this.pyodide) {
      try {
        await this.init();
      } catch (e) {
        console.warn("Pyodide init warning:", e);
        return;
      }
    }
    if (!this.pyodide) return;

    if (trackId === "datascience" || trackId === "projects") {
      const required = ["numpy", "pandas", "scipy", "scikit-learn"];
      const toLoad = required.filter((pkg) => !this.loadedPackages.has(pkg));
      if (toLoad.length > 0) {
        this.notifyStatus("loading", `Loading ML libraries (${toLoad.join(", ")})...`);
        try {
          await this.pyodide.loadPackage(toLoad);
          toLoad.forEach((pkg) => this.loadedPackages.add(pkg));
          this.notifyStatus("ready", "Python 3.11 Ready");
        } catch (e) {
          console.warn("Package load warning:", e);
          this.notifyStatus("ready", "Python 3.11 Ready");
        }
      }
    }
  },

  async runCodeAndTests(userCode, testCases = []) {
    const startTime = performance.now();
    const result = {
      success: true,
      stdout: "",
      stderr: "",
      executionTimeMs: 0,
      testResults: []
    };

    if (!this.pyodide) {
      try {
        await this.init();
      } catch (err) {
        result.success = false;
        result.stderr = "Python 3.11 engine failed to initialize: " + (err.message || err);
        return result;
      }
    }

    if (!this.pyodide) {
      result.success = false;
      result.stderr = "Python 3.11 engine is still initializing. Please wait a few seconds and try again.";
      return result;
    }

    try {
      // Clear stdout/stderr buffers
      await this.pyodide.runPythonAsync(`
__py_runner_buffer__.get_and_clear_stdout()
__py_runner_buffer__.get_and_clear_stderr()
`);

      // 1. Execute User Code
      await this.pyodide.runPythonAsync(userCode);

      // Collect initial print output
      const initialStdout = await this.pyodide.runPythonAsync(`__py_runner_buffer__.get_and_clear_stdout()`);
      result.stdout = initialStdout || "";

      // 2. Execute Test Cases
      for (let i = 0; i < testCases.length; i++) {
        const tc = testCases[i];
        const tcStart = performance.now();
        const testRes = {
          id: i + 1,
          input: tc.input || "",
          expected: tc.expected || "",
          actual: "",
          passed: false,
          error: null,
          timeMs: 0
        };

        try {
          if (tc.call) {
            const rawVal = await this.pyodide.runPythonAsync(`
import json

try:
    __tc_res__ = ${tc.call}
    if isinstance(__tc_res__, bool):
        __tc_out__ = "True" if __tc_res__ else "False"
    elif isinstance(__tc_res__, (int, float)):
        __tc_out__ = str(__tc_res__)
    elif isinstance(__tc_res__, str):
        __tc_out__ = f'"{__tc_res__}"'
    else:
        __tc_out__ = repr(__tc_res__)
except Exception as e:
    __tc_out__ = f"ERROR: {e}"

__tc_out__
`);
            testRes.actual = String(rawVal);

            // Normalized comparison
            const normActual = testRes.actual.trim().replace(/\s+/g, " ");
            const normExpected = String(tc.expected).trim().replace(/\s+/g, " ");

            testRes.passed =
              normActual === normExpected ||
              normActual.toLowerCase() === normExpected.toLowerCase();
          } else {
            testRes.passed = true;
            testRes.actual = "Executed successfully";
          }
        } catch (tcErr) {
          testRes.passed = false;
          testRes.error = tcErr.message;
          testRes.actual = `Error: ${tcErr.message}`;
          result.success = false;
        }

        testRes.timeMs = Math.round(performance.now() - tcStart);
        result.testResults.push(testRes);
        if (!testRes.passed) result.success = false;
      }

      // Collect any lingering stdout
      const lingeringStdout = await this.pyodide.runPythonAsync(`__py_runner_buffer__.get_and_clear_stdout()`);
      if (lingeringStdout) {
        result.stdout += (result.stdout ? "\n" : "") + lingeringStdout;
      }
    } catch (err) {
      result.success = false;
      result.stderr = err.message;
    }

    result.executionTimeMs = Math.round(performance.now() - startTime);
    return result;
  }
};
