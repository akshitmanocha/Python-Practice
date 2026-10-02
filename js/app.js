// ==========================================================================
// LeetCode Python Mastery Platform: Main Application Controller
// ==========================================================================

class App {
  constructor() {
    this.currentTrack = "dsa";
    this.activeTopicId = "dsa-1";
    this.editor = null;
    this.timerInterval = null;
    this.timerSecondsLeft = 0;
    this.isTimerRunning = false;
    this.activeConsoleTab = "testcase"; // 'testcase' | 'result'
    this.selectedCaseIndex = 0;
    this.lastRunResult = null;

    this.init();
  }

  async init() {
    this.setupCodeMirror();
    this.setupEventListeners();
    this.setupPyodideStatusListener();

    // Restore last state or defaults
    const last = window.StorageManager.getLastState();
    this.switchTrack(last.track, last.topicId);

    // Initialize Pyodide in background
    window.PyodideRunner.init();
  }

  // ------------------------------------------------------------------------
  // CodeMirror Initialization
  // ------------------------------------------------------------------------
  setupCodeMirror() {
    const textarea = document.getElementById("code-editor");
    if (!textarea) return;

    this.editor = CodeMirror.fromTextArea(textarea, {
      mode: "python",
      theme: "dracula",
      lineNumbers: true,
      indentUnit: 4,
      tabSize: 4,
      indentWithTabs: false,
      matchBrackets: true,
      autoCloseBrackets: true,
      lineWrapping: false,
      extraKeys: {
        "Cmd-Enter": () => this.runCurrentCode(false),
        "Ctrl-Enter": () => this.runCurrentCode(false),
        Tab: (cm) => cm.replaceSelection("    ", "end")
      }
    });

    // Auto-save on change
    this.editor.on("change", () => {
      if (!this.activeTopicId) return;
      const code = this.editor.getValue();
      window.StorageManager.saveCode(this.activeTopicId, code);
    });
  }

  // ------------------------------------------------------------------------
  // Pyodide Status
  // ------------------------------------------------------------------------
  setupPyodideStatusListener() {
    const dot = document.getElementById("status-dot");
    const text = document.getElementById("status-text");

    window.PyodideRunner.onStatusChange((status, msg) => {
      if (!dot || !text) return;
      dot.className = "lc-status-dot";

      if (status === "loading") {
        text.textContent = msg || "Loading Python 3.11...";
      } else if (status === "ready") {
        dot.classList.add("ready");
        text.textContent = "Python 3.11";
      } else if (status === "error") {
        text.textContent = "Engine Error";
      }
    });
  }

  // ------------------------------------------------------------------------
  // Navigation & Track Switching
  // ------------------------------------------------------------------------
  switchTrack(trackName, targetTopicId = null) {
    this.currentTrack = trackName;

    // Update track buttons active state
    document.querySelectorAll(".lc-track-tab").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.track === trackName);
    });

    // Hide/show timer pill for Track 4 (Projects)
    const timerPill = document.getElementById("lc-timer-pill");
    if (timerPill) {
      timerPill.style.display = trackName === "projects" ? "flex" : "none";
    }

    // Ensure packages are loaded for data science tracks
    if (trackName === "datascience" || trackName === "projects") {
      window.PyodideRunner.ensurePackagesForTrack(trackName);
    }

    // Load data for track
    const topics = this.getTrackData(trackName);
    const validTopicId = targetTopicId && topics.some((t) => t.id === targetTopicId)
      ? targetTopicId
      : topics[0]?.id;

    this.renderDrawerList(topics);
    if (validTopicId) {
      this.selectTopic(validTopicId);
    }
  }

  getTrackData(trackName) {
    switch (trackName) {
      case "dsa":
        return window.TRACK_1_DSA || [];
      case "theory":
        return window.TRACK_2_THEORY || [];
      case "datascience":
        return window.TRACK_3_DATASCIENCE || [];
      case "projects":
        return window.TRACK_4_PROJECTS || [];
      default:
        return window.TRACK_1_DSA || [];
    }
  }

  getCurrentTopic() {
    const topics = this.getTrackData(this.currentTrack);
    return topics.find((t) => t.id === this.activeTopicId) || topics[0];
  }

  // ------------------------------------------------------------------------
  // Problem List Drawer (LeetCode style)
  // ------------------------------------------------------------------------
  renderDrawerList(topics, filterQuery = "") {
    const container = document.getElementById("drawer-list-container");
    if (!container) return;
    container.innerHTML = "";

    const query = filterQuery.toLowerCase().trim();

    // Group by module
    const groups = {};
    topics.forEach((t) => {
      const mod = t.module || "General";
      if (!groups[mod]) groups[mod] = [];
      groups[mod].push(t);
    });

    Object.keys(groups).forEach((modName) => {
      const filtered = groups[modName].filter((t) => {
        if (!query) return true;
        return (
          t.title.toLowerCase().includes(query) ||
          (t.topic && t.topic.toLowerCase().includes(query)) ||
          (t.lcNum && String(t.lcNum).includes(query)) ||
          (t.module && t.module.toLowerCase().includes(query))
        );
      });

      if (filtered.length === 0) return;

      const groupEl = document.createElement("div");
      groupEl.className = "lc-drawer-group";

      const headerEl = document.createElement("div");
      headerEl.className = "lc-drawer-group-title";
      headerEl.innerHTML = `<span>${modName}</span> <span>${filtered.length}</span>`;
      groupEl.appendChild(headerEl);

      filtered.forEach((topic) => {
        const isCompleted = window.StorageManager.isCompleted(topic.id);
        const isActive = topic.id === this.activeTopicId;

        const itemEl = document.createElement("div");
        itemEl.className = `lc-drawer-item ${isActive ? "active" : ""}`;
        itemEl.dataset.topicId = topic.id;

        const diffClass =
          topic.difficulty === "easy"
            ? "lc-diff-easy"
            : topic.difficulty === "hard"
            ? "lc-diff-hard"
            : "lc-diff-medium";

        itemEl.innerHTML = `
          <div class="lc-drawer-item-left">
            <div class="lc-drawer-check ${isCompleted ? "solved" : ""}">
              ${isCompleted ? "✓" : ""}
            </div>
            <span>${topic.lcNum ? topic.lcNum + ". " : ""}${topic.title}</span>
          </div>
          ${topic.difficulty ? `<span class="lc-difficulty-badge ${diffClass}">${topic.difficulty}</span>` : ""}
        `;

        itemEl.addEventListener("click", () => {
          this.selectTopic(topic.id);
          this.toggleDrawer(false);
        });

        groupEl.appendChild(itemEl);
      });

      container.appendChild(groupEl);
    });
  }

  toggleDrawer(show = null) {
    const drawer = document.getElementById("problem-list-drawer");
    const input = document.getElementById("drawer-search-input");
    if (!drawer) return;

    const willOpen = show !== null ? show : !drawer.classList.contains("open");
    drawer.classList.toggle("open", willOpen);

    if (willOpen) {
      if (input) {
        input.value = "";
        input.focus();
      }
      this.renderDrawerList(this.getTrackData(this.currentTrack));
    }
  }

  // ------------------------------------------------------------------------
  // Select and Render Topic
  // ------------------------------------------------------------------------
  selectTopic(topicId) {
    this.activeTopicId = topicId;
    this.selectedCaseIndex = 0;
    this.lastRunResult = null;
    window.StorageManager.saveLastState(this.currentTrack, topicId);

    // Update active highlight in drawer
    document.querySelectorAll(".lc-drawer-item").forEach((el) => {
      el.classList.toggle("active", el.dataset.topicId === topicId);
    });

    const topic = this.getCurrentTopic();
    if (!topic) return;

    // RULE: ALWAYS switch back to the "Description" tab when loading a problem
    // Solutions must remain completely hidden until user explicitly clicks the solution tab!
    this.switchLeftTab("desc");

    // Render left panel
    this.renderLeftPanel(topic);

    // Render code in CodeMirror: ALWAYS load starterCode or user saved code (NEVER pre-fill solution!)
    const savedCode = window.StorageManager.getSavedCode(topic.id, topic.starterCode);
    if (this.editor) {
      this.editor.setValue(savedCode || "");
      this.editor.clearHistory();
    }

    // Render testcase console view
    this.switchConsoleTab("testcase");
    this.renderConsoleTestcases(topic);

    // Update stepper button states
    this.updateStepperButtons();

    // If projects track, reset/init project timer
    if (this.currentTrack === "projects" && topic.durationMinutes) {
      this.initProjectTimer(topic.durationMinutes);
    }
  }

  updateStepperButtons() {
    const topics = this.getTrackData(this.currentTrack);
    const currIdx = topics.findIndex((t) => t.id === this.activeTopicId);

    const prevBtn = document.getElementById("nav-prev-btn");
    const nextBtn = document.getElementById("nav-next-btn");

    if (prevBtn) prevBtn.style.opacity = currIdx > 0 ? "1" : "0.3";
    if (nextBtn) nextBtn.style.opacity = currIdx < topics.length - 1 ? "1" : "0.3";
  }

  stepTopic(direction) {
    const topics = this.getTrackData(this.currentTrack);
    const currIdx = topics.findIndex((t) => t.id === this.activeTopicId);
    const targetIdx = currIdx + direction;

    if (targetIdx >= 0 && targetIdx < topics.length) {
      this.selectTopic(topics[targetIdx].id);
    }
  }

  // ------------------------------------------------------------------------
  // Left Panel Rendering (LeetCode Tab Content)
  // ------------------------------------------------------------------------
  switchLeftTab(tabTarget) {
    document.querySelectorAll(".lc-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.tabTarget === tabTarget);
    });

    document.querySelectorAll(".lc-tab-content").forEach((content) => {
      content.classList.remove("active");
    });

    const activeContent = document.getElementById(`tab-content-${tabTarget}`);
    if (activeContent) {
      activeContent.classList.add("active");
    }
  }

  getDSInfo(topic) {
    if (!window.DS_REGISTRY) return null;

    if (topic.dsKey && window.DS_REGISTRY[topic.dsKey]) {
      return window.DS_REGISTRY[topic.dsKey];
    }

    const t = ((topic.topic || "") + " " + (topic.title || "") + " " + (topic.module || "")).toLowerCase();

    if (t.includes("set") || t.includes("consecutive") || t.includes("intersection") || t.includes("repeating characters")) {
      return window.DS_REGISTRY["hash_set"];
    }
    if (t.includes("counter") || t.includes("anagram") || t.includes("majority")) {
      return window.DS_REGISTRY["counter"];
    }
    if (t.includes("monotonic") || t.includes("deque") || t.includes("sliding window") || t.includes("rotting")) {
      return window.DS_REGISTRY["deque"];
    }
    if (t.includes("stack") || t.includes("parentheses")) {
      return window.DS_REGISTRY["stack"];
    }
    if (t.includes("heap") || t.includes("kth largest") || t.includes("median from data stream") || t.includes("top k")) {
      return window.DS_REGISTRY["heapq"];
    }
    if (t.includes("bisect") || t.includes("binary search") || t.includes("rotated")) {
      return window.DS_REGISTRY["bisect"];
    }
    if (t.includes("sortedlist") || t.includes("pbds") || t.includes("reverse pairs")) {
      return window.DS_REGISTRY["sorted_list"];
    }
    if (t.includes("linked list") || t.includes("merge two sorted lists")) {
      return window.DS_REGISTRY["linked_list"];
    }
    if (t.includes("dsu") || t.includes("union") || t.includes("provinces")) {
      return window.DS_REGISTRY["dsu"];
    }
    if (t.includes("tree") || t.includes("depth") || t.includes("path sum")) {
      return window.DS_REGISTRY["binary_tree"];
    }
    if (t.includes("graph") || t.includes("course schedule") || t.includes("topological")) {
      return window.DS_REGISTRY["defaultdict"];
    }
    if (t.includes("bit") || t.includes("pow") || t.includes("single number")) {
      return window.DS_REGISTRY["bitwise"];
    }
    if (t.includes("sort") || t.includes("intervals") || t.includes("largest number")) {
      return window.DS_REGISTRY["sorting"];
    }
    if (t.includes("dp") || t.includes("memo") || t.includes("edit distance") || t.includes("knapsack")) {
      return window.DS_REGISTRY["dp_memo"];
    }
    if (t.includes("string") || t.includes("palindrome") || t.includes("reverse words")) {
      return window.DS_REGISTRY["string"];
    }
    if (t.includes("range") || t.includes("reverse iteration") || t.includes("enumerate") || t.includes("zip")) {
      return window.DS_REGISTRY["iterators"];
    }
    if (t.includes("matrix") || t.includes("pascal") || t.includes("comprehension") || t.includes("two sum") || t.includes("stock")) {
      return window.DS_REGISTRY["dynamic_array"];
    }
    if (t.includes("pandas") || t.includes("dataframe") || t.includes("series")) {
      return window.DS_REGISTRY["pandas_df"];
    }
    if (t.includes("numpy") || t.includes("vectorization")) {
      return window.DS_REGISTRY["numpy"];
    }
    if (t.includes("scipy") || t.includes("ttest") || t.includes("stats")) {
      return window.DS_REGISTRY["scipy_stats"];
    }
    if (t.includes("scikit") || t.includes("sklearn") || t.includes("pipeline") || t.includes("regression")) {
      return window.DS_REGISTRY["sklearn"];
    }

    return null;
  }

  renderLeftPanel(topic) {
    const titleEl = document.getElementById("lc-title");
    const metaRow = document.getElementById("lc-meta-row");
    const descBody = document.getElementById("lc-desc-body");
    const examplesContainer = document.getElementById("lc-examples-container");
    const constraintsBox = document.getElementById("lc-constraints-box");
    const bridgeBody = document.getElementById("lc-bridge-body");
    const solutionBody = document.getElementById("lc-solution-body");

    const isCompleted = window.StorageManager.isCompleted(topic.id);

    // 1. Title
    if (titleEl) {
      titleEl.textContent = `${topic.lcNum ? topic.lcNum + ". " : ""}${topic.title}`;
    }

    // 2. Meta Row
    if (metaRow) {
      const diffClass =
        topic.difficulty === "easy"
          ? "lc-diff-easy"
          : topic.difficulty === "hard"
          ? "lc-diff-hard"
          : "lc-diff-medium";

      metaRow.innerHTML = `
        ${topic.difficulty ? `<span class="lc-difficulty-badge ${diffClass}">${topic.difficulty.toUpperCase()}</span>` : ""}
        ${topic.module ? `<span class="lc-tag-pill">${topic.module}</span>` : ""}
        ${topic.topic ? `<span class="lc-tag-pill">${topic.topic}</span>` : ""}
        ${topic.lcSlug ? `<a class="lc-tag-pill" style="color: var(--lc-brand-orange); text-decoration: none;" href="https://leetcode.com/problems/${topic.lcSlug}/" target="_blank" rel="noopener noreferrer">LeetCode ↗</a>` : ""}
        ${isCompleted ? `<span class="lc-tag-pill" style="color: var(--lc-easy); border: 1px solid var(--lc-easy);">✓ Solved</span>` : ""}
      `;
    }

    // 3. Tab 1: Description Body + Data Structure Focus Card
    if (descBody) {
      const dsInfo = this.getDSInfo(topic);
      const dsCardHtml = dsInfo ? `
        <div class="lc-ds-card">
          <div class="lc-ds-header">
            <span class="lc-ds-badge">DATA STRUCTURE FOCUS</span>
            <span class="lc-ds-title">${dsInfo.name}</span>
          </div>

          <div class="lc-ds-grid">
            <div class="lc-ds-col">
              <div class="lc-ds-label">C++ EQUIVALENT</div>
              <div class="lc-ds-code"><code>${this.escapeHtml(dsInfo.cppEquiv)}</code></div>
            </div>
            <div class="lc-ds-col">
              <div class="lc-ds-label">PYTHON CONSTRUCT</div>
              <div class="lc-ds-code"><code>${this.escapeHtml(dsInfo.pyConstruct)}</code></div>
            </div>
          </div>

          <div class="lc-ds-methods-section">
            <div class="lc-ds-methods-title">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
              <span>Associated Python Functions & Time Complexities</span>
            </div>
            <div class="lc-ds-methods-list">
              ${dsInfo.methods.map((m) => `
                <div class="lc-method-row">
                  <div class="lc-method-sig"><code>${this.escapeHtml(m.sig)}</code></div>
                  <div class="lc-method-desc">${this.escapeHtml(m.desc)}</div>
                  <div class="lc-method-time">${this.escapeHtml(m.time)}</div>
                </div>
              `).join("")}
            </div>
          </div>
        </div>
      ` : "";

      if (this.currentTrack === "theory") {
        descBody.innerHTML = `
          ${dsCardHtml}
          <div style="font-size: 14.5px; line-height: 1.7; white-space: pre-line; color: #eff1f6;">${topic.concept || ""}</div>
        `;
      } else if (this.currentTrack === "projects") {
        descBody.innerHTML = `
          ${dsCardHtml}
          <div style="font-size: 14px; line-height: 1.6; margin-bottom: 16px;">
            <p>${topic.description || ""}</p>
          </div>
          <div class="lc-bridge-box" style="border-left-color: var(--lc-brand-orange);">
            <h4 style="color: var(--lc-brand-orange);">Evaluation Metric</h4>
            <p>${topic.targetMetric || "End-to-end execution without errors"}</p>
          </div>
        `;
      } else {
        descBody.innerHTML = `
          ${dsCardHtml}
          <p style="font-size: 14px; line-height: 1.65; color: #eff1f6;">${topic.desc || ""}</p>
        `;
      }
    }

    // 4. Tab 1: Examples or Quiz / Rubric Container
    if (examplesContainer) {
      examplesContainer.innerHTML = "";

      if (this.currentTrack === "theory") {
        this.renderTheoryExtras(topic, examplesContainer);
      } else if (this.currentTrack === "projects") {
        this.renderProjectExtras(topic, examplesContainer);
      } else if (topic.testCases && topic.testCases.length > 0) {
        examplesContainer.innerHTML = topic.testCases.map((tc, idx) => `
          <div class="lc-example-card">
            <div class="lc-example-title">Example ${idx + 1}:</div>
            <pre class="lc-example-pre"><strong>Input:</strong> ${this.escapeHtml(tc.input)}
<strong>Output:</strong> ${this.escapeHtml(tc.expected)}</pre>
          </div>
        `).join("");
      }
    }

    // 5. Tab 1: Constraints Box
    if (constraintsBox) {
      constraintsBox.style.display = this.currentTrack === "theory" ? "none" : "block";
    }

    // 6. Tab 2: C++ Bridge & Theory
    if (bridgeBody) {
      bridgeBody.innerHTML = `
        <div class="lc-bridge-box">
          <h4>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5"/></svg>
            C++ STL to Python Bridge
          </h4>
          <p>${topic.cppBridge || "Direct Python idioms apply."}</p>
        </div>

        ${topic.theory ? `
          <div class="lc-bridge-box" style="border-left-color: var(--lc-brand-orange);">
            <h4 style="color: var(--lc-brand-orange);">Core Syntax & Pythonic Idioms</h4>
            <p style="white-space: pre-line;">${topic.theory}</p>
          </div>
        ` : ""}

        ${topic.pitfalls ? `
          <div class="lc-bridge-box" style="border-left-color: var(--lc-hard);">
            <h4 style="color: var(--lc-hard);">⚠️ Watch Out: C++ Gotchas in Python</h4>
            <p>${topic.pitfalls}</p>
          </div>
        ` : ""}
      `;
    }

    // 7. Tab 3: Solution (Only shown when user clicks this tab)
    if (solutionBody) {
      solutionBody.innerHTML = `
        <div style="margin-bottom: 20px;">
          <h3 style="font-size: 16px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">
            Editorial & Optimal Solution
          </h3>
          <p style="font-size: 13.5px; line-height: 1.6; color: var(--lc-text-secondary); margin-bottom: 16px;">
            Optimal implementation adhering to Python idioms and standard library constructs.
          </p>

          ${topic.solutionCode ? `
            <pre class="lc-example-pre" style="background-color: var(--lc-bg-editor); border: 1px solid var(--lc-border); padding: 14px; color: #7dd3fc; margin-bottom: 14px;"><code>${this.escapeHtml(topic.solutionCode)}</code></pre>
            <button class="lc-btn-run" id="copy-solution-btn">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
              <span>Load Solution to Editor</span>
            </button>
          ` : `
            <p style="color: var(--lc-text-muted);">No reference code for this section.</p>
          `}
        </div>
      `;

      const copyBtn = document.getElementById("copy-solution-btn");
      if (copyBtn && topic.solutionCode) {
        copyBtn.addEventListener("click", () => {
          if (this.editor) {
            this.editor.setValue(topic.solutionCode);
          }
        });
      }
    }
  }

  renderTheoryExtras(topic, container) {
    const savedAns = window.StorageManager.getQuizAnswer(topic.id);

    container.innerHTML = `
      ${topic.codeSnippet ? `
        <div style="margin-bottom: 16px;">
          <div class="lc-example-title">Reference Snippet:</div>
          <pre class="lc-example-pre" style="color: #38bdf8;"><code>${this.escapeHtml(topic.codeSnippet)}</code></pre>
        </div>
      ` : ""}

      ${topic.quiz ? `
        <div class="lc-quiz-container">
          <div class="lc-quiz-badge">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
            OA Screening Quiz Drill
          </div>
          <div class="lc-quiz-question">${topic.quiz.question}</div>
          <div class="lc-quiz-options">
            ${topic.quiz.options.map((opt, idx) => `
              <div class="lc-quiz-option" data-opt-idx="${idx}">
                <span style="font-weight: 700; width: 20px;">${String.fromCharCode(65 + idx)}.</span>
                <span>${opt}</span>
              </div>
            `).join("")}
          </div>
          <div class="lc-quiz-explanation" id="quiz-explanation" style="display: none;">
            <strong>Explanation:</strong> ${topic.quiz.explanation}
          </div>
        </div>
      ` : ""}
    `;

    // Hook up quiz clicks
    if (topic.quiz) {
      const optEls = container.querySelectorAll(".lc-quiz-option");
      const explanationEl = document.getElementById("quiz-explanation");

      const applySelection = (selectedIdx) => {
        optEls.forEach((el, idx) => {
          el.classList.remove("correct", "wrong");
          if (idx === topic.quiz.correctIndex) {
            el.classList.add("correct");
          } else if (idx === selectedIdx) {
            el.classList.add("wrong");
          }
        });
        if (explanationEl) explanationEl.style.display = "block";
      };

      if (savedAns !== null && savedAns !== undefined) {
        applySelection(Number(savedAns));
      }

      optEls.forEach((el) => {
        el.addEventListener("click", () => {
          const idx = Number(el.dataset.optIdx);
          window.StorageManager.saveQuizAnswer(topic.id, idx);
          applySelection(idx);

          if (idx === topic.quiz.correctIndex) {
            window.StorageManager.setCompleted(topic.id, true);
            this.renderDrawerList(this.getTrackData(this.currentTrack));
            this.renderLeftPanel(topic);
            this.triggerConfetti();
          }
        });
      });
    }
  }

  renderProjectExtras(topic, container) {
    if (!topic.rubric) return;

    container.innerHTML = `
      <div style="margin-top: 16px;">
        <h4 style="font-size: 13.5px; font-weight: 700; color: #ffffff; margin-bottom: 8px;">
          Project Rubric & Execution Steps
        </h4>
        <div class="lc-rubric-card">
          ${topic.rubric.map((r) => `
            <div class="lc-rubric-step">
              <div class="lc-rubric-num">${r.step}</div>
              <div class="lc-rubric-content">
                <h4>${r.title}</h4>
                <p>${r.desc}</p>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    `;
  }

  // ------------------------------------------------------------------------
  // Bottom Console Drawer (Testcase vs Test Result)
  // ------------------------------------------------------------------------
  switchConsoleTab(tabName) {
    this.activeConsoleTab = tabName;
    document.querySelectorAll(".lc-console-tab").forEach((tab) => {
      tab.classList.toggle("active", tab.dataset.consoleTab === tabName);
    });

    const topic = this.getCurrentTopic();
    if (!topic) return;

    if (tabName === "testcase") {
      this.renderConsoleTestcases(topic);
    } else if (tabName === "result") {
      this.renderConsoleResultTab(this.lastRunResult);
    }
  }

  renderConsoleTestcases(topic) {
    const consoleBody = document.getElementById("lc-console-body");
    const runtimeBadge = document.getElementById("lc-runtime-badge");
    if (!consoleBody) return;

    if (runtimeBadge) runtimeBadge.textContent = "";

    const testCases = topic.testCases || [];
    if (testCases.length === 0) {
      consoleBody.innerHTML = `
        <div style="color: var(--lc-text-muted); padding: 10px 0;">
          Hit 'Run' (⌘+Enter) or 'Submit' to execute your code in the Python 3.11 environment.
        </div>
      `;
      return;
    }

    const currentTc = testCases[this.selectedCaseIndex] || testCases[0];

    consoleBody.innerHTML = `
      <div class="lc-testcase-pills">
        ${testCases.map((tc, idx) => `
          <button class="lc-case-pill ${idx === this.selectedCaseIndex ? "active" : ""}" data-case-idx="${idx}">
            Case ${idx + 1}
          </button>
        `).join("")}
      </div>

      <div class="lc-field-box">
        <div class="lc-field-label">Input</div>
        <div style="font-family: var(--font-mono); color: #eff1f6;">${this.escapeHtml(currentTc.input)}</div>
      </div>

      <div class="lc-field-box">
        <div class="lc-field-label">Expected Output</div>
        <div style="font-family: var(--font-mono); color: #eff1f6;">${this.escapeHtml(currentTc.expected)}</div>
      </div>
    `;

    consoleBody.querySelectorAll(".lc-case-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        this.selectedCaseIndex = Number(pill.dataset.caseIdx);
        this.renderConsoleTestcases(topic);
      });
    });
  }

  renderConsoleResultTab(res) {
    const consoleBody = document.getElementById("lc-console-body");
    const runtimeBadge = document.getElementById("lc-runtime-badge");
    if (!consoleBody) return;

    if (!res) {
      consoleBody.innerHTML = `
        <div style="color: var(--lc-text-muted); padding: 10px 0;">
          You must run your code first. Click <strong>Run</strong> or <strong>Submit</strong> above.
        </div>
      `;
      if (runtimeBadge) runtimeBadge.textContent = "";
      return;
    }

    if (runtimeBadge) {
      runtimeBadge.textContent = `Runtime: ${res.executionTimeMs} ms`;
    }

    // 1. Syntax / Runtime Error
    if (res.stderr) {
      consoleBody.innerHTML = `
        <div class="lc-result-status-failed">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          <span>Runtime Error</span>
        </div>
        <pre class="lc-example-pre" style="color: #ff375f; border-color: rgba(255, 55, 95, 0.3); font-size: 12px;">${this.escapeHtml(res.stderr)}</pre>
      `;
      return;
    }

    const testResults = res.testResults || [];

    // 2. Program ran with 0 test assertions (e.g. custom print scripts)
    if (testResults.length === 0) {
      consoleBody.innerHTML = `
        <div class="lc-result-status-accepted">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          <span>Finished</span>
        </div>
        <div class="lc-field-box">
          <div class="lc-field-label">Stdout</div>
          <pre style="margin: 0; font-family: var(--font-mono); color: #eff1f6;">${this.escapeHtml(res.stdout || "(No stdout generated)")}</pre>
        </div>
      `;
      return;
    }

    // 3. Test Cases Assertions View
    const allPassed = res.success;
    const currentTc = testResults[this.selectedCaseIndex] || testResults[0];

    consoleBody.innerHTML = `
      <div class="${allPassed ? "lc-result-status-accepted" : "lc-result-status-failed"}">
        ${allPassed ? `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
          <span>Accepted</span>
        ` : `
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/></svg>
          <span>Wrong Answer</span>
        `}
      </div>

      <div class="lc-testcase-pills">
        ${testResults.map((tc, idx) => `
          <button class="lc-case-pill ${idx === this.selectedCaseIndex ? "active" : ""}" data-case-idx="${idx}" style="${tc.passed ? "" : "border-color: rgba(255, 55, 95, 0.4); color: #ff375f;"}">
            Case ${idx + 1} ${tc.passed ? "✓" : "✗"}
          </button>
        `).join("")}
      </div>

      <div class="lc-field-box">
        <div class="lc-field-label">Input</div>
        <div style="font-family: var(--font-mono); color: #eff1f6;">${this.escapeHtml(currentTc.input)}</div>
      </div>

      <div class="lc-field-box">
        <div class="lc-field-label">Output</div>
        <div style="font-family: var(--font-mono); color: ${currentTc.passed ? "#00b8a3" : "#ff375f"}; font-weight: 600;">${this.escapeHtml(currentTc.actual)}</div>
      </div>

      <div class="lc-field-box">
        <div class="lc-field-label">Expected</div>
        <div style="font-family: var(--font-mono); color: #eff1f6;">${this.escapeHtml(currentTc.expected)}</div>
      </div>

      ${res.stdout ? `
        <div class="lc-field-box">
          <div class="lc-field-label">Stdout</div>
          <pre style="margin: 0; font-family: var(--font-mono); color: #eff1f6;">${this.escapeHtml(res.stdout)}</pre>
        </div>
      ` : ""}
    `;

    consoleBody.querySelectorAll(".lc-case-pill").forEach((pill) => {
      pill.addEventListener("click", () => {
        this.selectedCaseIndex = Number(pill.dataset.caseIdx);
        this.renderConsoleResultTab(res);
      });
    });
  }

  // ------------------------------------------------------------------------
  // Run Code & Execute Tests
  // ------------------------------------------------------------------------
  async runCurrentCode(isSubmit = false) {
    const topic = this.getCurrentTopic();
    if (!topic || !this.editor) return;

    const userCode = this.editor.getValue();
    const runBtn = document.getElementById("run-code-btn");
    const submitBtn = document.getElementById("submit-code-btn");

    if (runBtn) runBtn.disabled = true;
    if (submitBtn) submitBtn.disabled = true;

    // Switch to result tab and show executing state
    this.switchConsoleTab("result");
    const consoleBody = document.getElementById("lc-console-body");
    if (consoleBody) {
      consoleBody.innerHTML = `
        <div style="color: var(--lc-text-secondary); display: flex; align-items: center; gap: 8px; padding: 12px 0;">
          <div class="lc-status-dot ready"></div>
          <span>Executing code in Python 3.11 engine...</span>
        </div>
      `;
    }

    const res = await window.PyodideRunner.runCodeAndTests(userCode, topic.testCases || []);
    this.lastRunResult = res;

    if (runBtn) runBtn.disabled = false;
    if (submitBtn) submitBtn.disabled = false;

    // Render result card
    this.renderConsoleResultTab(res);

    // If all tests passed: mark completed and trigger celebration
    if (res.success && (!topic.testCases || topic.testCases.length > 0)) {
      window.StorageManager.setCompleted(topic.id, true);
      this.renderDrawerList(this.getTrackData(this.currentTrack));
      this.renderLeftPanel(topic);
      this.triggerConfetti();
    }
  }

  // ------------------------------------------------------------------------
  // Timer Management for Track 4
  // ------------------------------------------------------------------------
  initProjectTimer(minutes) {
    clearInterval(this.timerInterval);
    this.timerSecondsLeft = minutes * 60;
    this.isTimerRunning = true;
    this.updateTimerDisplay();

    this.timerInterval = setInterval(() => {
      if (this.isTimerRunning && this.timerSecondsLeft > 0) {
        this.timerSecondsLeft--;
        this.updateTimerDisplay();
        if (this.timerSecondsLeft === 0) {
          clearInterval(this.timerInterval);
          alert("⏱ Time is up for this project simulation! Evaluate your metrics.");
        }
      }
    }, 1000);
  }

  updateTimerDisplay() {
    const el = document.getElementById("timer-display");
    if (!el) return;
    const mins = Math.floor(this.timerSecondsLeft / 60);
    const secs = this.timerSecondsLeft % 60;
    el.textContent = `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  }

  // ------------------------------------------------------------------------
  // Celebration Confetti
  // ------------------------------------------------------------------------
  triggerConfetti() {
    const canvas = document.createElement("canvas");
    canvas.style.position = "fixed";
    canvas.style.top = "0";
    canvas.style.left = "0";
    canvas.style.width = "100vw";
    canvas.style.height = "100vh";
    canvas.style.pointerEvents = "none";
    canvas.style.zIndex = "9999";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = Array.from({ length: 70 }, () => ({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.8) * 16,
      size: Math.random() * 6 + 3,
      color: ["#00b8a3", "#ffa116", "#38bdf8", "#ffc01e", "#2cbb5d"][Math.floor(Math.random() * 5)],
      life: 60
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;
      particles.forEach((p) => {
        if (p.life > 0) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.4;
          p.life--;
          ctx.fillStyle = p.color;
          ctx.fillRect(p.x, p.y, p.size, p.size);
        }
      });
      if (alive) {
        requestAnimationFrame(animate);
      } else {
        canvas.remove();
      }
    };
    animate();
  }

  // ------------------------------------------------------------------------
  // Event Listeners
  // ------------------------------------------------------------------------
  setupEventListeners() {
    // Problem List Drawer Toggle
    const probListBtn = document.getElementById("problem-list-btn");
    const closeDrawerBtn = document.getElementById("close-drawer-btn");
    const drawerOverlay = document.getElementById("problem-list-drawer");

    if (probListBtn) {
      probListBtn.addEventListener("click", () => this.toggleDrawer(true));
    }
    if (closeDrawerBtn) {
      closeDrawerBtn.addEventListener("click", () => this.toggleDrawer(false));
    }
    if (drawerOverlay) {
      drawerOverlay.addEventListener("click", (e) => {
        if (e.target === drawerOverlay) this.toggleDrawer(false);
      });
    }

    // Drawer Search Filter
    const searchInput = document.getElementById("drawer-search-input");
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        this.renderDrawerList(this.getTrackData(this.currentTrack), e.target.value);
      });
    }

    // Prev / Next Steppers
    const prevBtn = document.getElementById("nav-prev-btn");
    const nextBtn = document.getElementById("nav-next-btn");
    if (prevBtn) {
      prevBtn.addEventListener("click", () => this.stepTopic(-1));
    }
    if (nextBtn) {
      nextBtn.addEventListener("click", () => this.stepTopic(1));
    }

    // Track Tabs
    document.querySelectorAll(".lc-track-tab").forEach((btn) => {
      btn.addEventListener("click", () => {
        this.switchTrack(btn.dataset.track);
      });
    });

    // Left Pane Tabs (Description / C++ Bridge / Solutions)
    document.querySelectorAll(".lc-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        this.switchLeftTab(tab.dataset.tabTarget);
      });
    });

    // Run & Submit Buttons
    const runBtn = document.getElementById("run-code-btn");
    const submitBtn = document.getElementById("submit-code-btn");
    if (runBtn) {
      runBtn.addEventListener("click", () => this.runCurrentCode(false));
    }
    if (submitBtn) {
      submitBtn.addEventListener("click", () => this.runCurrentCode(true));
    }

    // Reset Code Button
    const resetBtn = document.getElementById("reset-code-btn");
    if (resetBtn) {
      resetBtn.addEventListener("click", () => {
        const topic = this.getCurrentTopic();
        if (topic && this.editor) {
          const defCode = window.StorageManager.resetCode(topic.id, topic.starterCode);
          this.editor.setValue(defCode);
        }
      });
    }

    // Console Tabs (Testcase vs Test Result)
    document.querySelectorAll(".lc-console-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        this.switchConsoleTab(tab.dataset.consoleTab);
      });
    });

    // Keyboard Shortcuts: Cmd+K / Ctrl+K opens drawer, Escape closes
    window.addEventListener("keydown", (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        this.toggleDrawer();
      }
      if (e.key === "Escape") {
        this.toggleDrawer(false);
      }
    });
  }

  escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }
}

// Instantiate on DOM load
window.addEventListener("DOMContentLoaded", () => {
  window.AppInstance = new App();
});
