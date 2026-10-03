# Python Practice | DSA & ML Studio

An interactive, browser-based coding platform tailored for developers (especially those with a C++ background) mastering Python for Online Assessments (OA) and technical interviews.

Runs **100% locally in-browser** using WebAssembly (Pyodide Python 3.11). No backend or API keys required.

---

## Quick Start

### 1. Clone the repository
```bash
git clone https://github.com/akshitmanocha/Python-Practice.git
cd Python-Practice
```

### 2. (Optional) Install Python packages
For local offline scripting or testing:
```bash
pip install -r requirements.txt
```

### 3. Start the local server
```bash
python3 -m http.server 8000
```

### 4. Open in browser
Navigate to **[http://localhost:8000](http://localhost:8000)**.

---

## Curriculum Tracks

| Track | Questions | Focus |
|:---|:---:|:---|
| **Track 1: DSA (Striver SDE Sheet)** | **39** | Curated classic problems with blank starter code (`pass`) and hidden solutions. Every problem includes a C++ STL $\rightarrow$ Python cheat-sheet and time complexities. |
| **Track 2: OA Python Theory** | **15** | Interactive multiple-choice drills on language internals (tuples vs lists, small integer caching, mutable defaults, GIL, dunder methods). |
| **Track 3: ML & Data Science** | **41** | Pure syntax drills focused strictly on syntax muscle memory across Pandas, NumPy, SciPy, and Scikit-Learn. |
| **Track 4: Timed Projects** | **4** | Real-world timed ML interview simulations (Fraud Detection, Churn Prediction, Real Estate, Sentiment Analysis) with live countdown timers and rubrics. |

---

## Features
- **LeetCode Dark Theme UI:** Problem list drawer (`⌘K`), split-pane layout, testcase/result drawer, and confetti on pass.
- **Zero Pre-Filled Solutions:** Code editor loads clean function signatures with `pass`. Solutions are only revealed when clicking the Editorial tab.
- **Local Persistence:** Code and solved status are auto-saved to your browser's `localStorage`.
- **Keyboard Shortcuts:**
  - `⌘ + Enter` / `Ctrl + Enter`: Run code
  - `⌘ + K` / `Ctrl + K`: Toggle problem drawer
  - `Esc`: Close problem drawer
