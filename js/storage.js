// ==========================================================================
// Storage Manager: LocalStorage persistence for user code & progress
// ==========================================================================

const STORAGE_KEYS = {
  SCHEMA: "py_mastery_schema_version",
  COMPLETED: "py_mastery_completed_topics",
  CODE_PREFIX: "py_mastery_code_v2_",
  ACTIVE_TOPIC: "py_mastery_active_topic",
  ACTIVE_TRACK: "py_mastery_active_track",
  QUIZ_ANSWERS: "py_mastery_quiz_answers"
};

const CURRENT_SCHEMA = "v3_syntax_drills_clean";

// Purge any legacy cached code with pre-filled solutions
try {
  if (localStorage.getItem(STORAGE_KEYS.SCHEMA) !== CURRENT_SCHEMA) {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("py_mastery_code_")) {
        localStorage.removeItem(key);
      }
    });
    localStorage.setItem(STORAGE_KEYS.SCHEMA, CURRENT_SCHEMA);
  }
} catch (e) {
  console.warn("Storage migration error:", e);
}

window.StorageManager = {
  getCompletedTopics() {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.COMPLETED);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      console.warn("Storage access error:", e);
      return [];
    }
  },

  isCompleted(topicId) {
    const list = this.getCompletedTopics();
    return list.includes(topicId);
  },

  toggleCompleted(topicId) {
    const list = this.getCompletedTopics();
    const idx = list.indexOf(topicId);
    if (idx > -1) {
      list.splice(idx, 1);
    } else {
      list.push(topicId);
    }
    localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(list));
    return this.isCompleted(topicId);
  },

  setCompleted(topicId, status = true) {
    const list = this.getCompletedTopics();
    const idx = list.indexOf(topicId);
    if (status && idx === -1) {
      list.push(topicId);
    } else if (!status && idx > -1) {
      list.splice(idx, 1);
    }
    localStorage.setItem(STORAGE_KEYS.COMPLETED, JSON.stringify(list));
  },

  getSavedCode(topicId, defaultCode = "") {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CODE_PREFIX + topicId);
      return saved !== null ? saved : defaultCode;
    } catch (e) {
      return defaultCode;
    }
  },

  saveCode(topicId, code) {
    try {
      localStorage.setItem(STORAGE_KEYS.CODE_PREFIX + topicId, code);
    } catch (e) {
      console.warn("Could not save code:", e);
    }
  },

  resetCode(topicId, defaultCode = "") {
    try {
      localStorage.removeItem(STORAGE_KEYS.CODE_PREFIX + topicId);
    } catch (e) {}
    return defaultCode;
  },

  getQuizAnswer(quizId) {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS);
      const map = data ? JSON.parse(data) : {};
      return map[quizId] !== undefined ? map[quizId] : null;
    } catch (e) {
      return null;
    }
  },

  saveQuizAnswer(quizId, answerIndex) {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.QUIZ_ANSWERS);
      const map = data ? JSON.parse(data) : {};
      map[quizId] = answerIndex;
      localStorage.setItem(STORAGE_KEYS.QUIZ_ANSWERS, JSON.stringify(map));
    } catch (e) {}
  },

  getLastState() {
    return {
      track: localStorage.getItem(STORAGE_KEYS.ACTIVE_TRACK) || "dsa",
      topicId: localStorage.getItem(STORAGE_KEYS.ACTIVE_TOPIC) || "dsa-1"
    };
  },

  saveLastState(track, topicId) {
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TRACK, track);
    localStorage.setItem(STORAGE_KEYS.ACTIVE_TOPIC, topicId);
  }
};
