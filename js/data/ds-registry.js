// ==========================================================================
// Comprehensive Data Structure & C++ STL to Python Function Registry
// Detailed API method cheat-sheets for every problem and container
// ==========================================================================

window.DS_REGISTRY = {
  // ------------------------------------------------------------------------
  // 1. Python Set (Hash Set)
  // ------------------------------------------------------------------------
  "hash_set": {
    name: "Hash Set (set)",
    cppEquiv: "std::unordered_set<T>",
    pyConstruct: "s = set()  # or s = {1, 2, 3}",
    methods: [
      { sig: "s.add(x)", desc: "Insert element x (C++ s.insert(x))", time: "O(1) avg" },
      { sig: "x in s", desc: "Check membership (C++ s.count(x) > 0)", time: "O(1) avg" },
      { sig: "s.remove(x)", desc: "Remove x; raises KeyError if not found", time: "O(1) avg" },
      { sig: "s.discard(x)", desc: "Remove x safely without error if missing", time: "O(1) avg" },
      { sig: "s.pop()", desc: "Remove and return an arbitrary element", time: "O(1)" },
      { sig: "s1 & s2", desc: "Set intersection: elements in BOTH s1 and s2", time: "O(min(|s1|, |s2|))" },
      { sig: "s1 | s2", desc: "Set union: elements in EITHER s1 or s2", time: "O(|s1| + |s2|)" },
      { sig: "s1 - s2", desc: "Set difference: elements in s1 but NOT in s2", time: "O(|s1|)" },
      { sig: "s1 ^ s2", desc: "Symmetric difference: in either s1 or s2, NOT both", time: "O(|s1| + |s2|)" },
      { sig: "len(s)", desc: "Count of unique elements (C++ s.size())", time: "O(1)" },
      { sig: "s.clear()", desc: "Remove all elements from the set", time: "O(1)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 2. Python List as Dynamic Array / Vector
  // ------------------------------------------------------------------------
  "dynamic_array": {
    name: "Dynamic Array (list)",
    cppEquiv: "std::vector<T>",
    pyConstruct: "arr = []  # or arr = [0] * n",
    methods: [
      { sig: "arr.append(x)", desc: "Push element to back (C++ arr.push_back(x))", time: "O(1) amortized" },
      { sig: "arr.pop()", desc: "Remove & return last element (C++ arr.pop_back())", time: "O(1)" },
      { sig: "arr[-1]", desc: "Peek last element (C++ arr.back())", time: "O(1)" },
      { sig: "arr[i]", desc: "Direct index access (0 to n - 1)", time: "O(1)" },
      { sig: "arr[l:r]", desc: "Slice subsequence from l to r - 1 (C++ vector copy)", time: "O(k)" },
      { sig: "arr.insert(i, x)", desc: "Insert x at index i (shifts elements)", time: "O(n)" },
      { sig: "arr.extend(iter)", desc: "Append all elements from another collection", time: "O(k)" },
      { sig: "arr.sort()", desc: "In-place Timsort (C++ std::sort)", time: "O(n log n)" },
      { sig: "arr.reverse()", desc: "In-place reversal (C++ std::reverse)", time: "O(n)" },
      { sig: "len(arr)", desc: "Size of array (C++ arr.size())", time: "O(1)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 3. Stack (LIFO)
  // ------------------------------------------------------------------------
  "stack": {
    name: "Stack (list as LIFO)",
    cppEquiv: "std::stack<T>",
    pyConstruct: "st = []",
    methods: [
      { sig: "st.append(x)", desc: "Push element onto stack (C++ st.push(x))", time: "O(1)" },
      { sig: "st.pop()", desc: "Pop and return top element (C++ st.top(); st.pop())", time: "O(1)" },
      { sig: "st[-1]", desc: "Peek top element without removing (C++ st.top())", time: "O(1)" },
      { sig: "if st: / if not st:", desc: "Check if non-empty / empty (C++ !st.empty())", time: "O(1)" },
      { sig: "len(st)", desc: "Stack depth (C++ st.size())", time: "O(1)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 4. Queue & Double-Ended Queue (collections.deque)
  // ------------------------------------------------------------------------
  "deque": {
    name: "Double-Ended Queue (collections.deque)",
    cppEquiv: "std::deque<T> / std::queue<T>",
    pyConstruct: "from collections import deque; q = deque()",
    methods: [
      { sig: "q.append(x)", desc: "Push to back (C++ q.push_back(x) / q.push(x))", time: "O(1)" },
      { sig: "q.popleft()", desc: "Pop from front (C++ q.pop_front() / q.pop())", time: "O(1)" },
      { sig: "q.appendleft(x)", desc: "Push to front (C++ q.push_front(x))", time: "O(1)" },
      { sig: "q.pop()", desc: "Pop from back (C++ q.pop_back())", time: "O(1)" },
      { sig: "q[0]", desc: "Peek front element (C++ q.front())", time: "O(1)" },
      { sig: "q[-1]", desc: "Peek back element (C++ q.back())", time: "O(1)" },
      { sig: "q.rotate(k)", desc: "Rotate elements k steps to the right", time: "O(k)" },
      { sig: "len(q)", desc: "Size of queue (C++ q.size())", time: "O(1)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 5. Hash Map / Dictionary (dict)
  // ------------------------------------------------------------------------
  "dict_hashmap": {
    name: "Hash Map (dict)",
    cppEquiv: "std::unordered_map<Key, Value>",
    pyConstruct: "d = {}  # or d = dict()",
    methods: [
      { sig: "d[key] = val", desc: "Insert or update key-value pair", time: "O(1) avg" },
      { sig: "d.get(key, default)", desc: "Get value safely without raising KeyError", time: "O(1) avg" },
      { sig: "key in d", desc: "Key existence check (C++ d.find(k) != d.end())", time: "O(1) avg" },
      { sig: "d.pop(key, default)", desc: "Remove key and return value", time: "O(1) avg" },
      { sig: "d.items()", desc: "Iterate (key, value) pairs (C++ for (auto& [k, v] : d))", time: "O(n)" },
      { sig: "d.keys()", desc: "View of all keys in dictionary", time: "O(n)" },
      { sig: "d.values()", desc: "View of all values in dictionary", time: "O(n)" },
      { sig: "d.setdefault(k, dflt)", desc: "Insert default if key missing, then return value", time: "O(1) avg" }
    ]
  },

  // ------------------------------------------------------------------------
  // 6. Default Dictionary (collections.defaultdict)
  // ------------------------------------------------------------------------
  "defaultdict": {
    name: "Default Map (collections.defaultdict)",
    cppEquiv: "std::unordered_map with automatic default constructor",
    pyConstruct: "from collections import defaultdict; d = defaultdict(list)",
    methods: [
      { sig: "d[u].append(v)", desc: "Auto-initializes empty list if key missing (Graph adjacency)", time: "O(1) avg" },
      { sig: "defaultdict(int)", desc: "Auto-initializes missing keys to 0 (Counter)", time: "O(1) avg" },
      { sig: "defaultdict(set)", desc: "Auto-initializes missing keys to empty set()", time: "O(1) avg" },
      { sig: "for k, v in d.items():", desc: "Iterate all keys and populated containers", time: "O(n)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 7. Frequency Counter (collections.Counter)
  // ------------------------------------------------------------------------
  "counter": {
    name: "Frequency Counter (collections.Counter)",
    cppEquiv: "std::unordered_map<T, int> frequency table",
    pyConstruct: "from collections import Counter; counts = Counter(iterable)",
    methods: [
      { sig: "counts[x]", desc: "Get frequency of x; returns 0 if missing (no KeyError)", time: "O(1)" },
      { sig: "counts.most_common(k)", desc: "Return top k elements by highest frequency", time: "O(n log k)" },
      { sig: "counts.update(iter)", desc: "Add counts from another sequence or iterable", time: "O(k)" },
      { sig: "counts.elements()", desc: "Iterator over elements repeating by count", time: "O(total_count)" },
      { sig: "c1 + c2 / c1 - c2", desc: "Multiset addition and subtraction operations", time: "O(n)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 8. Priority Queue / Min-Heap & Max-Heap (heapq)
  // ------------------------------------------------------------------------
  "heapq": {
    name: "Priority Queue / Min-Heap (heapq)",
    cppEquiv: "std::priority_queue<T, vector<T>, greater<T>>",
    pyConstruct: "import heapq; h = []",
    methods: [
      { sig: "heapq.heappush(h, val)", desc: "Push item onto min-heap (C++ pq.push(x))", time: "O(log n)" },
      { sig: "heapq.heappop(h)", desc: "Pop and return smallest element (C++ pq.pop())", time: "O(log n)" },
      { sig: "h[0]", desc: "Peek smallest element without removing (C++ pq.top())", time: "O(1)" },
      { sig: "heapq.heapify(lst)", desc: "Transform regular list into valid min-heap in-place", time: "O(n)" },
      { sig: "heapq.heappushpop(h, x)", desc: "Push x then immediately pop smallest element", time: "O(log n)" },
      { sig: "heapq.nlargest(k, iter)", desc: "Return k largest elements from iterable", time: "O(n log k)" },
      { sig: "heapq.nsmallest(k, iter)", desc: "Return k smallest elements from iterable", time: "O(n log k)" },
      { sig: "Max-Heap: heappush(h, -x)", desc: "Negate values to simulate C++ std::priority_queue<int>", time: "O(log n)" },
      { sig: "Tuple Heap: (priority, item)", desc: "Tuples sort by first element, then second", time: "O(log n)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 9. Binary Search (bisect)
  // ------------------------------------------------------------------------
  "bisect": {
    name: "Binary Search (bisect)",
    cppEquiv: "std::lower_bound & std::upper_bound",
    pyConstruct: "import bisect",
    methods: [
      { sig: "bisect.bisect_left(arr, x)", desc: "First index where arr[i] >= x (C++ std::lower_bound)", time: "O(log n)" },
      { sig: "bisect.bisect_right(arr, x)", desc: "First index where arr[i] > x (C++ std::upper_bound)", time: "O(log n)" },
      { sig: "bisect.bisect(arr, x)", desc: "Alias for bisect_right", time: "O(log n)" },
      { sig: "bisect.insort_left(arr, x)", desc: "Insert x into sorted list maintaining sort order", time: "O(n)" },
      { sig: "bisect.insort_right(arr, x)", desc: "Insert x after any duplicates maintaining order", time: "O(n)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 10. Policy-Based Data Structure / Ordered Multiset (SortedList)
  // ------------------------------------------------------------------------
  "sorted_list": {
    name: "Ordered Multiset / PBDS (SortedList)",
    cppEquiv: "std::multiset<T> / __gnu_pbds::tree",
    pyConstruct: "from sortedcontainers import SortedList; sl = SortedList()",
    methods: [
      { sig: "sl.add(x)", desc: "Insert x into balanced tree structure (C++ sl.insert(x))", time: "O(log n)" },
      { sig: "sl.remove(x)", desc: "Remove x; raises ValueError if missing", time: "O(log n)" },
      { sig: "sl.discard(x)", desc: "Remove x safely without raising error", time: "O(log n)" },
      { sig: "sl.bisect_left(x)", desc: "Order of x: count of elements strictly smaller than x", time: "O(log n)" },
      { sig: "sl.bisect_right(x)", desc: "Count of elements smaller than or equal to x", time: "O(log n)" },
      { sig: "sl[k]", desc: "k-th order statistic / find_by_order (O(log n) indexing)", time: "O(log n)" },
      { sig: "len(sl)", desc: "Total count of elements in balanced structure", time: "O(1)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 11. Strings (str)
  // ------------------------------------------------------------------------
  "string": {
    name: "Immutable String (str)",
    cppEquiv: "std::string",
    pyConstruct: 's = "hello"',
    methods: [
      { sig: "s.split(sep=None)", desc: "Split on whitespace or delimiter (C++ stringstream)", time: "O(n)" },
      { sig: "sep.join(list_of_strs)", desc: "Concatenate sequence with delimiter separator", time: "O(n)" },
      { sig: "s.strip()", desc: "Strip leading & trailing whitespace", time: "O(n)" },
      { sig: "s[l:r]", desc: "Substring slice from l to r - 1 (C++ s.substr(l, r - l))", time: "O(k)" },
      { sig: "s[::-1]", desc: "Reverse entire string (C++ std::reverse)", time: "O(n)" },
      { sig: "s.startswith(pre) / .endswith(suf)", desc: "Check prefix or suffix match", time: "O(k)" },
      { sig: "ord(c) - ord('a')", desc: "Character to 0-indexed integer (C++ c - 'a')", time: "O(1)" },
      { sig: "chr(97)", desc: "ASCII integer to character 'a'", time: "O(1)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 12. Singly Linked List (ListNode)
  // ------------------------------------------------------------------------
  "linked_list": {
    name: "Singly Linked List (ListNode)",
    cppEquiv: "struct ListNode { int val; ListNode *next; };",
    pyConstruct: "class ListNode:\n    def __init__(self, val=0, next=None):\n        self.val = val\n        self.next = next",
    methods: [
      { sig: "curr = head", desc: "Pointer initialization for traversal", time: "O(1)" },
      { sig: "dummy = ListNode(0, head)", desc: "Dummy head pattern to simplify edge-case pointer rewiring", time: "O(1)" },
      { sig: "prev, curr = None, head", desc: "Two-pointer in-place reversal: curr.next, prev, curr = prev, curr, curr.next", time: "O(n)" },
      { sig: "slow, fast = head, head.next", desc: "Tortoise and Hare fast/slow pointer cycle detection", time: "O(n)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 13. Binary Tree (TreeNode)
  // ------------------------------------------------------------------------
  "binary_tree": {
    name: "Binary Tree (TreeNode)",
    cppEquiv: "struct TreeNode { int val; TreeNode *left, *right; };",
    pyConstruct: "class TreeNode:\n    def __init__(self, val=0, left=None, right=None):\n        self.val = val\n        self.left = left\n        self.right = right",
    methods: [
      { sig: "root.left / root.right", desc: "Access left and right child pointers", time: "O(1)" },
      { sig: "if not node: return", desc: "Base case check for None/null pointer", time: "O(1)" },
      { sig: "deque([root])", desc: "Initialize queue for Level-Order BFS traversal", time: "O(1)" },
      { sig: "nonlocal max_val", desc: "Bind variable in outer enclosing recursive scope", time: "O(1)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 14. Disjoint Set Union (DSU / Union-Find)
  // ------------------------------------------------------------------------
  "dsu": {
    name: "Disjoint Set Union (DSU)",
    cppEquiv: "struct DSU { vector<int> parent, rank; };",
    pyConstruct: "class DSU:\n    def __init__(self, n):\n        self.parent = list(range(n))\n        self.rank = [0] * n",
    methods: [
      { sig: "def find(self, i):", desc: "Path compression: if self.parent[i] != i: parent[i] = find(parent[i])", time: "O(α(n))" },
      { sig: "def union(self, i, j):", desc: "Union by rank: attach smaller tree under root of larger tree", time: "O(α(n))" }
    ]
  },

  // ------------------------------------------------------------------------
  // 15. Bit Manipulation & Math
  // ------------------------------------------------------------------------
  "bitwise": {
    name: "Bitwise Operators & Math",
    cppEquiv: "Bitwise &, |, ^, ~, <<, >>, __builtin_popcount",
    pyConstruct: "a & b, a | b, a ^ b, ~a, a << k, a >> k",
    methods: [
      { sig: "x ^ y", desc: "XOR operator: x ^ x = 0, x ^ 0 = x", time: "O(1)" },
      { sig: "x & (x - 1)", desc: "Clear lowest set bit (Brian Kernighan's trick)", time: "O(1)" },
      { sig: "x.bit_count()", desc: "Count set 1-bits (C++ __builtin_popcount(x))", time: "O(1)" },
      { sig: "x.bit_length()", desc: "Number of bits required to represent integer in binary", time: "O(1)" },
      { sig: "bin(x)", desc: "Convert integer to binary string ('0b1010')", time: "O(log x)" },
      { sig: "pow(x, n, mod)", desc: "Modular binary exponentiation (x^n % mod) in logarithmic time", time: "O(log n)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 16. Iterators & Generators (range, enumerate, zip)
  // ------------------------------------------------------------------------
  "iterators": {
    name: "Generators & Iteration Tools",
    cppEquiv: "for (int i=0; ...), iterators, std::views::zip",
    pyConstruct: "range(), enumerate(), zip()",
    methods: [
      { sig: "range(start, stop, step)", desc: "Lazy integer range generator (excludes stop index)", time: "O(1) memory" },
      { sig: "range(n - 1, -1, -1)", desc: "Reverse step iteration down to 0", time: "O(1) memory" },
      { sig: "for i, val in enumerate(arr):", desc: "Tuple unpacking of index and element concurrently", time: "O(1) per step" },
      { sig: "for a, b in zip(list1, list2):", desc: "Parallel iteration across multiple sequences", time: "O(1) per step" },
      { sig: "zip(*matrix)", desc: "Unpack and transpose rows into columns", time: "O(R * C)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 17. Custom Sorting & Comparators
  // ------------------------------------------------------------------------
  "sorting": {
    name: "Sorting & Custom Comparators",
    cppEquiv: "std::sort(begin, end, custom_cmp)",
    pyConstruct: "sorted(arr, key=lambda x: ...) or cmp_to_key",
    methods: [
      { sig: "arr.sort(key=lambda x: x[0])", desc: "In-place sort by specific element attribute", time: "O(n log n)" },
      { sig: "sorted(arr, key=lambda x: (x[0], -x[1]))", desc: "Multi-key sort: primary ascending, secondary descending", time: "O(n log n)" },
      { sig: "from functools import cmp_to_key", desc: "Convert 2-argument C++ style comparator function to Python key", time: "O(n log n)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 18. Dynamic Programming & Memoization
  // ------------------------------------------------------------------------
  "dp_memo": {
    name: "Memoization & Dynamic Programming",
    cppEquiv: "Manual 2D DP array / unordered_map memoization",
    pyConstruct: "from functools import cache\n@cache\ndef dp(...):",
    methods: [
      { sig: "@functools.cache", desc: "Auto-memoizes return value for distinct argument tuples", time: "O(1) lookup" },
      { sig: "@functools.lru_cache(maxsize=1024)", desc: "Memoize with bounded LRU eviction cache", time: "O(1) lookup" },
      { sig: "dp = [0] * (amount + 1)", desc: "1D space-optimized rolling table for knapsack patterns", time: "O(amount)" },
      { sig: "sys.setrecursionlimit(200000)", desc: "Increase Python recursion limit for deep recursion", time: "O(1)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 19. Pandas DataFrame
  // ------------------------------------------------------------------------
  "pandas_df": {
    name: "Pandas DataFrame & Series",
    cppEquiv: "Relational table / Columnar vector storage",
    pyConstruct: "import pandas as pd\ndf = pd.DataFrame(data)",
    methods: [
      { sig: "df.loc[row_mask, ['col']]", desc: "Label-based row/column indexing and filtering", time: "O(n)" },
      { sig: "df.iloc[0:5, 1:3]", desc: "Integer position-based row/column slicing", time: "O(k)" },
      { sig: "df.assign(new_col=...)", desc: "Add or transform columns functionally without mutating", time: "O(n)" },
      { sig: "df.groupby('col').agg(...)", desc: "Grouped split-apply-combine aggregations (sum, mean, count)", time: "O(n log n)" },
      { sig: "df.rolling(window=k).mean()", desc: "Moving window calculations across time or index sequences", time: "O(n)" },
      { sig: "s.apply(lambda x: ...)", desc: "Element-wise custom transformations along a Series", time: "O(n)" },
      { sig: "df.dropna() / df.fillna(val)", desc: "Handle missing values via drop or imputation", time: "O(n)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 20. NumPy Ndarray
  // ------------------------------------------------------------------------
  "numpy": {
    name: "NumPy Ndarray (Vectorized Array)",
    cppEquiv: "Contiguous C-style arrays / SIMD vectorized buffers",
    pyConstruct: "import numpy as np\narr = np.array([1, 2, 3])",
    methods: [
      { sig: "np.where(cond, x, y)", desc: "Vectorized ternary if-else element-wise selector", time: "O(n)" },
      { sig: "arr[arr > threshold]", desc: "Boolean mask array indexing (SIMD accelerated)", time: "O(n)" },
      { sig: "arr.reshape(r, c)", desc: "Zero-copy shape manipulation", time: "O(1)" },
      { sig: "a @ b / np.dot(a, b)", desc: "BLAS-optimized matrix multiplication", time: "O(n^3) or sub-cubic" },
      { sig: "arr.mean(axis=0)", desc: "Axis-wise column or row aggregations", time: "O(n)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 21. SciPy Stats
  // ------------------------------------------------------------------------
  "scipy_stats": {
    name: "SciPy Statistics (scipy.stats)",
    cppEquiv: "Statistical libraries / numerical testing algorithms",
    pyConstruct: "from scipy import stats",
    methods: [
      { sig: "stats.ttest_ind(a, b)", desc: "Two-sample independent Student's t-test (stat, p-value)", time: "O(n)" },
      { sig: "stats.zscore(arr)", desc: "Z-score normalization: (x - mean) / std", time: "O(n)" },
      { sig: "stats.f_oneway(*groups)", desc: "One-way ANOVA test for equality of group means", time: "O(n)" },
      { sig: "stats.norm.cdf(x, loc, scale)", desc: "Normal cumulative distribution function", time: "O(1)" }
    ]
  },

  // ------------------------------------------------------------------------
  // 22. Scikit-Learn Pipeline & Models
  // ------------------------------------------------------------------------
  "sklearn": {
    name: "Scikit-Learn Estimator & Pipeline",
    cppEquiv: "ML model inference engine",
    pyConstruct: "from sklearn.base import BaseEstimator",
    methods: [
      { sig: "transformer.fit_transform(X)", desc: "Estimate scaling parameters and transform feature matrix", time: "O(n * d)" },
      { sig: "model.fit(X, y)", desc: "Train machine learning model on training partition", time: "Varies by model" },
      { sig: "model.predict(X)", desc: "Generate class or continuous predictions", time: "O(n * d)" },
      { sig: "model.predict_proba(X)", desc: "Generate calibrated probability estimates", time: "O(n * d)" }
    ]
  }
};

