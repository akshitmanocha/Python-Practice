# Python Mastery: DSA, Language Internals & ML — Complete Study Plan

A comprehensive, interview- and OA-focused roadmap for high-performance engineers transitioning from C++ to Python. Spans:
1. **Core DSA mapped directly to Striver's SDE Sheet (Modules 1–8)**
2. **Python Language Internals & OA Core Theory Traps (Modules 9–11)**
3. **Data Science, ML & Feature Engineering (Modules 12–17)**
4. **4 Timed End-to-End Machine Learning Projects (Module 18)**

> [!IMPORTANT]
> **DSA Problem Source Rule:** All DSA questions are exclusively curated from **Striver's SDE Sheet** (`https://leetcode.com/problem-list/eeudwo2i/`). We pick **Easy, Medium, and straightforward Classic problems** so you don't waste mental energy on brainstorming algorithm logic and can focus 100% on **Python syntax muscle memory**.

---

## Master Table of Contents & Progress Tracker

- [ ] **Part 1: Core DSA in Python (Striver's SDE Sheet Mapped)**
  - [ ] Module 1: Loops, Iteration & 2D Grids (Topics 1–6)
  - [ ] Module 2: Strings & Sequence Manipulation (Topics 7–10)
  - [ ] Module 3: Queues, Deque & Hash Containers (Topics 11–15)
  - [ ] Module 4: Heaps & Priority Queues (Topics 16–18)
  - [ ] Module 5: Binary Search & Ordered Containers (Topics 19–23)
  - [ ] Module 6: Sorting & Custom Comparators (Topics 24–26)
  - [ ] Module 7: Recursion, DP & Math Idioms (Topics 27–30)
  - [ ] Module 8: Trees, Graphs & DSU Boilerplate (Topics 31–33)
- [ ] **Part 2: Python Language Internals & OA Theory Traps**
  - [ ] Module 9: Mutability, Tuples, Identity & Memory (Topics 34–38)
  - [ ] Module 10: Functions, Scopes, Closures & Decorators (Topics 39–43)
  - [ ] Module 11: OOP, Dunder Methods & Python Runtime/GIL (Topics 44–48)
- [ ] **Part 3: Machine Learning, Data Science & Feature Engineering**
  - [ ] Module 12: **[HIGH PRIORITY]** Exhaustive Pandas & Lambda Functions (Topics 49–58)
  - [ ] Module 13: **[HIGH PRIORITY]** Linear Regression From Scratch (Topics 59–61)
  - [ ] Module 14: **[HIGH PRIORITY]** Scikit-Learn Complete Pipeline & Modeling (Topics 62–68)
  - [ ] Module 15: **[MEDIUM PRIORITY]** Matplotlib & Seaborn for EDA (Topics 69–72)
  - [ ] Module 16: **[MEDIUM PRIORITY]** SciPy for Statistical Testing & Optimization (Topics 73–76)
  - [ ] Module 17: **[LOW PRIORITY]** NumPy Vectorization & Array Operations (Topics 77–81)
- [ ] **Part 4: Timed End-to-End Interview Projects**
  - [ ] Module 18: 4 Timed Interview & OA Projects (Projects 1–4)

---

# PART 1: Core DSA in Python (Striver's SDE Sheet)

## Module 1: Loops, Iteration & 2D Grids

### - [ ] 1. `range()` Fundamentals & Step Iteration
- **Target Question:** [LeetCode 121: Best Time to Buy and Sell Stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock/) *(Easy - Striver Sheet)*
- **Syntax Focus:** Clean forward pass using `for i in range(1, len(prices)):` and `min()`/`max()`.

### - [ ] 2. Reverse Iteration
- **Target Question:** [LeetCode 31: Next Permutation](https://leetcode.com/problems/next-permutation/) *(Medium - Striver Sheet)*
- **Syntax Focus:** Backward traversal with `for i in range(n - 2, -1, -1):` and in-place reversal slice `nums[i + 1:] = reversed(nums[i + 1:])`.

### - [ ] 3. `enumerate()`
- **Target Question:** [LeetCode 1: Two Sum](https://leetcode.com/problems/two-sum/) *(Easy - Striver Sheet)*
- **Syntax Focus:** `for i, num in enumerate(nums):` storing indices cleanly without `range(len(nums))`.

### - [ ] 4. `zip()` (Parallel Iteration)
- **Target Question:** [LeetCode 14: Longest Common Prefix](https://leetcode.com/problems/longest-common-prefix/) *(Easy - Striver Sheet)*
- **Syntax Focus:** `for chars in zip(*strs):` unpack strings and check `len(set(chars)) == 1`.

### - [ ] 5. 2D Matrix Initialization & Row/Col Traversal
- **Target Question:** [LeetCode 73: Set Matrix Zeroes](https://leetcode.com/problems/set-matrix-zeroes/) *(Medium - Striver Sheet)*
- **Syntax Focus:** Row and col size `R, C = len(matrix), len(matrix[0])`, matrix modification, avoiding shallow copies.

### - [ ] 6. List Comprehensions & 2D Lists
- **Target Question:** [LeetCode 118: Pascal's Triangle](https://leetcode.com/problems/pascals-triangle/) *(Easy - Striver Sheet)*
- **Syntax Focus:** Generating sublists using row comprehensions `[1] + [row[j] + row[j + 1] for j in range(len(row) - 1)] + [1]`.

---

## Module 2: Strings & Sequence Manipulation

### - [ ] 7. String Immutability & Modification
- **Target Question:** [LeetCode 151: Reverse Words in a String](https://leetcode.com/problems/reverse-words-in-a-string/) *(Medium - Striver Sheet)*
- **Syntax Focus:** `s.split()`, `reversed()`, `" ".join(...)` in idiomatic Python.

### - [ ] 8. ASCII Character Math & Frequency Arrays
- **Target Question:** [LeetCode 242: Valid Anagram](https://leetcode.com/problems/valid-anagram/) *(Easy - Striver Sheet)*
- **Syntax Focus:** `ord(c) - ord('a')` vs native `Counter(s) == Counter(t)`.

### - [ ] 9. Slicing & Reversals
- **Target Question:** [LeetCode 5: Longest Palindromic Substring](https://leetcode.com/problems/longest-palindromic-substring/) *(Medium - Striver Sheet)*
- **Syntax Focus:** String slicing `s[l:r + 1]` and fast palindrome check `sub == sub[::-1]`.

### - [ ] 10. Stack Operations
- **Target Question:** [LeetCode 20: Valid Parentheses](https://leetcode.com/problems/valid-parentheses/) *(Easy - Striver Sheet)*
- **Syntax Focus:** Native list as stack: `st.append()`, `st.pop()`, peek `st[-1]`, and dictionary matching `mapping = {')': '(', '}': '{', ']': '['}`.

---

## Module 3: Queues, Deque & Hash Containers

### - [ ] 11. Queue & Deque (`collections.deque`)
- **Target Question:** [LeetCode 994: Rotting Oranges](https://leetcode.com/problems/rotting-oranges/) *(Medium - Striver Sheet)*
- **Syntax Focus:** Multi-source BFS using `deque([(r, c, 0) ...])`, `q.popleft()`, and `q.append()`.

### - [ ] 12. Sliding Window with Deque (Monotonic Queue)
- **Target Question:** [LeetCode 239: Sliding Window Maximum](https://leetcode.com/problems/sliding-window-maximum/) *(Hard - Striver Sheet)*
- **Syntax Focus:** `while q and nums[q[-1]] <= nums[i]: q.pop()`, `q.popleft()` from front.

### - [ ] 13. Hash Set (`set` $O(1)$ lookups)
- **Target Question:** [LeetCode 128: Longest Consecutive Sequence](https://leetcode.com/problems/longest-consecutive-sequence/) *(Medium - Striver Sheet)*
- **Syntax Focus:** $O(1)$ lookups with `num_set = set(nums)` and condition `if num - 1 not in num_set:`.

### - [ ] 13b. Set Theory Operations (`&`, `|`, `-`, `^`)
- **Target Question:** [LeetCode 349: Intersection of Two Arrays](https://leetcode.com/problems/intersection-of-two-arrays/) *(Easy - Striver Sheet)*
- **Syntax Focus:** Direct set algebraic operators: `list(set(nums1) & set(nums2))`, union `|`, difference `-`, symmetric difference `^`.

### - [ ] 13c. Sliding Window with Set Mutation
- **Target Question:** [LeetCode 3: Longest Substring Without Repeating Characters](https://leetcode.com/problems/longest-substring-without-repeating-characters/) *(Medium - Striver Sheet)*
- **Syntax Focus:** Dynamic set additions and deletions: `char_set.add(s[r])`, `char_set.remove(s[l])`, `while s[r] in char_set:`.

### - [ ] 14. Frequency Map (`collections.Counter`)
- **Target Question:** [LeetCode 229: Majority Element II](https://leetcode.com/problems/majority-element-ii/) *(Medium - Striver Sheet)*
- **Syntax Focus:** `counts = Counter(nums)` and comprehension `[k for k, v in counts.items() if v > len(nums) // 3]`.

### - [ ] 15. Prefix Sum with Hash Map
- **Target Question:** [Subarray Sum Equals K](https://leetcode.com/problems/subarray-sum-equals-k/) *(Medium - Striver Sheet)*
- **Syntax Focus:** Running sum with `prefix_map = {0: 1}` and `prefix_map.get(curr - k, 0)`.

---

## Module 4: Heaps & Priority Queues

### - [ ] 16. Min-Heap (`heapq`)
- **Target Question:** [LeetCode 215: Kth Largest Element in an Array](https://leetcode.com/problems/kth-largest-element-in-an-array/) *(Medium - Striver Sheet)*
- **Syntax Focus:** `heapq.heappush(min_heap, x)` and keeping size $k$ with `heapq.heappop(min_heap)`.

### - [ ] 17. Max-Heap & Two Heaps
- **Target Question:** [LeetCode 295: Find Median from Data Stream](https://leetcode.com/problems/find-median-from-data-stream/) *(Hard - Striver Sheet)*
- **Syntax Focus:** Max-heap with negated values `small = []` (push `-x`) and min-heap `large = []`.

### - [ ] 18. Priority Queue with Tuples
- **Target Question:** [LeetCode 347: Top K Frequent Elements](https://leetcode.com/problems/top-k-frequent-elements/) *(Medium - Striver Sheet)*
- **Syntax Focus:** `Counter(nums)` pushed into heap as `(freq, num)` tuples.

---

## Module 5: Binary Search & Ordered Containers

### - [ ] 19. Binary Search (`bisect_left` / `bisect_right`)
- **Target Question:** [LeetCode 33: Search in Rotated Sorted Array](https://leetcode.com/problems/search-in-rotated-sorted-array/) *(Medium - Striver Sheet)*
- **Syntax Focus:** Integer binary search logic and `bisect` library usage.

### - [ ] 20. Binary Search with `bisect` on LIS
- **Target Question:** [LeetCode 300: Longest Increasing Subsequence](https://leetcode.com/problems/longest-increasing-subsequence/) *(Medium - Striver Sheet)*
- **Syntax Focus:** Patience sorting via `idx = bisect.bisect_left(tails, x)`: replaces `lower_bound`.

### - [ ] 21. `SortedList` as C++ `multiset`
- **Target Question:** [LeetCode 493: Reverse Pairs](https://leetcode.com/problems/reverse-pairs/) *(Hard - Striver Sheet)*
- **Syntax Focus:** `from sortedcontainers import SortedList`, query elements `sl.bisect_right(2 * x)`, and `sl.add(x)`.

### - [ ] 22. `SortedList` as C++ PBDS (`ordered_set`)
- **Target Question:** Dynamic Rank & $k$-th element queries using `sl[k]` and `sl.bisect_left(x)`.

---

## Module 6: Sorting & Custom Comparators

### - [ ] 23. Lambda Interval Sorting
- **Target Question:** [LeetCode 56: Merge Intervals](https://leetcode.com/problems/merge-intervals/) *(Medium - Striver Sheet)*
- **Syntax Focus:** `intervals.sort(key=lambda x: x[0])` and merging logic.

### - [ ] 24. Custom Comparator (`functools.cmp_to_key`)
- **Target Question:** [LeetCode 179: Largest Number](https://leetcode.com/problems/largest-number/) *(Medium - Striver Sheet)*
- **Syntax Focus:** `def cmp(a, b): return -1 if a + b > b + a else 1` with `key=cmp_to_key(cmp)`.

---

## Module 7: Recursion, DP & Math Idioms

### - [ ] 25. Tree DFS with `nonlocal` & Recursion Limit
- **Target Question:** [LeetCode 124: Binary Tree Maximum Path Sum](https://leetcode.com/problems/binary-tree-maximum-path-sum/) *(Hard - Striver Sheet)*
- **Syntax Focus:** `sys.setrecursionlimit(200000)` and `nonlocal max_sum` inside nested DFS.

### - [ ] 26. Automatic DP Memoization (`@cache`)
- **Target Question:** [LeetCode 72: Edit Distance](https://leetcode.com/problems/edit-distance/) *(Medium - Striver Sheet)*
- **Syntax Focus:** `@cache` decorator on recursive `dp(i, j)` function without manual memo table.

### - [ ] 27. 0/1 Knapsack / Subset Sum
- **Target Question:** [LeetCode 416: Partition Equal Subset Sum](https://leetcode.com/problems/partition-equal-subset-sum/) *(Medium - Striver Sheet)*
- **Syntax Focus:** `@cache` with boolean return.

### - [ ] 28. Math: Pow & GCD
- **Target Question:** [LeetCode 50: Pow(x, n)](https://leetcode.com/problems/powx-n/) *(Medium - Striver Sheet)*
- **Syntax Focus:** Handling negative exponents and Python float math.

---

## Module 8: Trees, Graphs & DSU Boilerplate

### - [ ] 29. Tree Level-Order Traversal
- **Target Question:** [LeetCode 102: Binary Tree Level Order Traversal](https://leetcode.com/problems/binary-tree-level-order-traversal/) *(Medium - Striver Sheet)*
- **Syntax Focus:** `deque([root])` with `for _ in range(len(q)):` level processing.

### - [ ] 30. Graph DFS / BFS / Cycle Detection
- **Target Question:** [LeetCode 200: Number of Islands](https://leetcode.com/problems/number-of-islands/) *(Medium - Striver Sheet)*
- **Syntax Focus:** Grid DFS with `(r + dr, c + dc)` delta loops.

### - [ ] 31. Topological Sort with Kahn's Algorithm
- **Target Question:** [LeetCode 207: Course Schedule](https://leetcode.com/problems/course-schedule/) *(Medium - Striver Sheet)*
- **Syntax Focus:** `defaultdict(list)` for adjacency list, `[0] * numCourses` for indegree, `deque` for queue.

### - [ ] 32. Disjoint Set Union (DSU)
- **Target Question:** [LeetCode 547: Number of Provinces](https://leetcode.com/problems/number-of-provinces/) *(Medium - Striver Sheet)*
- **Syntax Focus:** Clean Python DSU class with path compression and rank union.

---

# PART 2: Python Language Internals & OA Theory Traps

*(High-frequency multiple-choice, code output, and debugging questions asked in technical screens)*

---

## Module 9: Mutability, Tuples, Identity & Memory

### - [ ] 33. Tuples vs. Lists (The Deep Dive)
- **Concept:**
  - **Mutability:** Lists are mutable; tuples are immutable.
  - **Memory & Allocation:** Tuples have smaller memory footprints (`sys.getsizeof(())` < `sys.getsizeof([])`) and are allocated in a single block of memory; lists have dynamic over-allocation to allow $O(1)$ amortized `append()`.
  - **Hashability & Dict Keys:** Tuples can be dictionary keys **if and only if** all their internal elements are also immutable/hashable.
    - `d = {(1, 2): "valid"}` $\rightarrow$ **OK**
    - `d = {(1, [2, 3]): "invalid"}` $\rightarrow$ **TypeError: unhashable type: 'list'**
  - **Tuple with single element trap:** `t = (1)` is an integer! Must write `t = (1,)` to create a 1-tuple.

### - [ ] 34. Mutable vs. Immutable Types & Pass-by-Object-Reference
- **Concept:**
  - Immutable: `int`, `float`, `str`, `tuple`, `frozenset`, `bytes`, `bool`.
  - Mutable: `list`, `dict`, `set`, `bytearray`.
  - Python uses **Call by Object Reference** (or Call by Sharing). If you pass a mutable object and mutate it in-place (`lst.append(x)`), the caller sees the change. If you reassign the variable (`lst = [1, 2]`), the caller's reference is **unchanged**.

### - [ ] 35. Shallow Copy vs. Deep Copy
- **Concept:**
  - `copy.copy(obj)`: Creates a new compound object, but inserts references to the objects found in the original.
  - `copy.deepcopy(obj)`: Recursively copies all nested objects.
  - Slicing `arr[:]` and `.copy()` are **shallow copies**.
  ```python
  import copy
  a = [[1, 2], [3, 4]]
  b = copy.copy(a)
  b[0][0] = 99  # a[0][0] ALSO BECOMES 99!
  c = copy.deepcopy(a)
  c[0][0] = 42  # a[0][0] remains unchanged
  ```

### - [ ] 36. Identity (`is`) vs. Equality (`==`) & Small Integer Caching
- **Concept:**
  - `==` calls `__eq__()` to check value equality.
  - `is` checks object identity (`id(a) == id(b)` in memory).
  - **Integer Interning Trap:** Python pre-allocates integers from **`-5` to `256`**.
    ```python
    a = 256; b = 256; a is b  # True (same cached memory object)
    a = 257; b = 257; a is b  # False! (distinct objects)
    a == b                    # True
    ```

### - [ ] 37. The Default Mutable Argument Trap (Interview Classic)
- **Concept:** Default parameter values are evaluated **once at function definition time**, NOT each time the function is called!
  ```python
  # BUG:
  def add_item(val, target_list=[]):
      target_list.append(val)
      return target_list

  print(add_item(1))  # [1]
  print(add_item(2))  # [1, 2] (NOT [2]! The list is shared across calls)

  # THE IDIOMATIC FIX:
  def add_item_fixed(val, target_list=None):
      if target_list is None:
          target_list = []
      target_list.append(val)
      return target_list
  ```

---

## Module 10: Functions, Scopes, Closures & Decorators

### - [ ] 38. Variable Scope & LEGB Rule
- **Concept:** Scope resolution order: **L**ocal $\rightarrow$ **E**nclosing $\rightarrow$ **G**lobal $\rightarrow$ **B**uilt-in.
- **`global` vs `nonlocal`:**
  - `global x`: Binds to module-level global variable.
  - `nonlocal x`: Binds to the nearest enclosing (outer) function's local variable (used constantly in DFS/tree recursions).

### - [ ] 39. `*args` and `**kwargs` & Extended Unpacking
- **Concept:**
  - `*args`: Collects positional arguments as a `tuple`.
  - `**kwargs`: Collects keyword arguments as a `dict`.
  - Keyword-only arguments: `def func(a, *, b):` (enforces `func(1, b=2)`).
  - Extended unpacking: `first, *middle, last = [1, 2, 3, 4, 5]` (`middle == [2, 3, 4]`).

### - [ ] 40. Iterators vs. Generators & `yield`
- **Concept:**
  - **Iterator:** Object implementing `__iter__()` and `__next__()` that raises `StopIteration`.
  - **Generator:** Function containing `yield`. Pauses execution and remembers state, generating values lazily on-demand.
  - **Generator Expression:** `(x * x for x in range(10**7))` consumes $O(1)$ memory; list comprehension `[x * x for x in range(10**7)]` allocates gigabytes of RAM.

### - [ ] 41. Closures & Decorators
- **Concept:** A closure remembers values in enclosing scopes even after the outer function finishes executing.
- **Decorator boilerplate:**
  ```python
  from functools import wraps

  def my_timer(func):
      @wraps(func)  # Preserves func's docstring and name
      def wrapper(*args, **kwargs):
          # Pre-execution logic
          result = func(*args, **kwargs)
          # Post-execution logic
          return result
      return wrapper
  ```

### - [ ] 42. `try / except / else / finally` Flow
- **Concept:**
  - `try`: Code that might raise an exception.
  - `except`: Handles specified exceptions.
  - `else`: Runs **only if no exception occurred** in `try`.
  - `finally`: **Always runs**, even if a `return` or `break` occurs in `try` or `except`!

---

## Module 11: OOP, Dunder Methods & Python Runtime/GIL

### - [ ] 43. Dunder (Magic) Methods
- **Must-Know Dunders:**
  - `__init__(self)`: Constructor.
  - `__repr__(self)` vs `__str__(self)`: Developer/debugging representation vs user-friendly string.
  - `__eq__(self, other)` & `__hash__(self)`: Required to make custom objects usable as `set` elements or `dict` keys.
  - `__len__(self)` & `__getitem__(self, idx)`: Makes an object indexable and sliceable like a list.
  - `__call__(self)`: Allows instances to be called like functions (`obj()`).
  - `__enter__(self)` & `__exit__(self, ...)`: Context Manager protocol (`with` statement).

### - [ ] 44. `@staticmethod` vs `@classmethod` vs Instance Method
- **Concept:**
  - Instance method: Receives `self` (operates on the specific object).
  - `@classmethod`: Receives `cls` (operates on the class itself; great for factory methods).
  - `@staticmethod`: Receives neither `self` nor `cls` (utility function isolated inside the class namespace).

### - [ ] 45. The Global Interpreter Lock (GIL) & Concurrency
- **Concept:**
  - What is the GIL? A mutex that allows only one native thread to execute Python bytecode at a time in CPython.
  - **CPU-bound tasks:** `threading` does **not** speed up execution due to GIL contention. Use `multiprocessing` to utilize multiple CPU cores.
  - **I/O-bound tasks:** (Network requests, disk I/O): `threading` or `asyncio` releases the GIL during waiting and gives true concurrency.

### - [ ] 46. Garbage Collection: Reference Counting & Cyclic GC
- **Concept:**
  - Primary mechanism: **Reference Counting** (when reference count reaches 0, memory is immediately deallocated).
  - Secondary mechanism: **Cyclic Garbage Collector** (`gc` module) finds and breaks reference cycles (e.g. `a.next = b; b.prev = a`).

---

# PART 3: Machine Learning, Data Science & Feature Engineering

*(Ordered by practical interview priority: Pandas & ML first, NumPy last)*

---

## Module 12: [HIGH PRIORITY] Exhaustive Pandas & Lambda Functions

### - [ ] 47. Series & DataFrame Creation & Inspection
- **Syntax:** `pd.DataFrame()`, `df.info()`, `df.describe()`, `df.shape`.

### - [ ] 48. Indexing & Slicing: `loc` vs `iloc`
- **Concept:** `loc` is label-based (end inclusive); `iloc` is integer-based (end exclusive).
- **Syntax:** `df.loc[df['age'] > 28, ['salary']]`, `df.iloc[0:5, 1:3]`.

### - [ ] 49. Boolean Masking & Compound Filters
- **Syntax:** `df[(df['age'] >= 21) & (df['salary'] < 80000)]`, `df[df['cat'].isin(['A', 'B'])]`.

### - [ ] 50. Lambda Functions with `.apply()`, `.map()`, `.transform()`
- **Syntax:**
  ```python
  df['log_salary'] = df['salary'].apply(lambda x: np.log1p(x))
  df['ratio'] = df.apply(lambda row: row['salary'] / (row['age'] + 1), axis=1)
  df['group_mean_salary'] = df.groupby('dept')['salary'].transform(lambda x: x.mean())
  ```

### - [ ] 51. GroupBy Aggregations (`.groupby()`)
- **Syntax:**
  ```python
  summary = df.groupby('dept').agg(
      mean_salary=('salary', 'mean'),
      max_age=('age', 'max'),
      headcount=('age', 'count')
  ).reset_index()
  ```

### - [ ] 52. Merging, Joining & Concatenation
- **Syntax:** `pd.merge(df1, df2, on='id', how='left')`, `pd.concat([df1, df2], axis=0)`.

### - [ ] 53. Reshaping: `pivot_table`, `melt`, `stack`, `unstack`
- **Syntax:** `pd.melt(df, id_vars=['date'])`, `df.pivot_table(index='date', columns='dept', values='val')`.

### - [ ] 54. Handling Missing Data & Outliers
- **Syntax:** `df['age'].fillna(df['age'].median())`, `df.dropna(subset=['col'])`.

### - [ ] 55. DateTime Operations (`.dt` accessor)
- **Syntax:** `df['date'] = pd.to_datetime(...)`, `df['date'].dt.year`, `df['date'].dt.dayofweek`.

### - [ ] 56. Window Functions: `.rolling()`, `.expanding()`, `.shift()`
- **Syntax:** `df['sales'].shift(1)`, `df['sales'].pct_change()`, `df['sales'].rolling(7).mean()`.

---

## Module 13: [HIGH PRIORITY] Linear Regression From Scratch (Interview Standard)

### - [ ] 57. Closed-Form Normal Equation: $\theta = (X^T X)^{-1} X^T y$
- **Implementation:**
  ```python
  import numpy as np

  class LinearRegressionNormalEq:
      def fit(self, X, y):
          X_b = np.c_[np.ones((X.shape[0], 1)), X]
          self.theta = np.linalg.pinv(X_b.T @ X_b) @ X_b.T @ y

      def predict(self, X):
          X_b = np.c_[np.ones((X.shape[0], 1)), X]
          return X_b @ self.theta
  ```

### - [ ] 58. Vectorized Gradient Descent Implementation
- **Implementation:**
  ```python
  class LinearRegressionGD:
      def __init__(self, lr=0.01, n_iters=1000):
          self.lr, self.n_iters = lr, n_iters
          self.weights, self.bias = None, 0.0

      def fit(self, X, y):
          n_samples, n_features = X.shape
          self.weights = np.zeros(n_features)
          for _ in range(self.n_iters):
              y_pred = X @ self.weights + self.bias
              error = y_pred - y
              dw = (1 / n_samples) * (X.T @ error)
              db = (1 / n_samples) * np.sum(error)
              self.weights -= self.lr * dw
              self.bias -= self.lr * db

      def predict(self, X):
          return X @ self.weights + self.bias
  ```

### - [ ] 59. Regularization: Ridge ($L_2$) & Lasso ($L_1$) Intuition
- **Concept:** Ridge adds $\lambda w_j$ weight decay; Lasso adds $\lambda \text{sign}(w_j)$ subgradient creating sparse weights.

---

## Module 14: [HIGH PRIORITY] Scikit-Learn Complete Pipeline & Modeling

### - [ ] 60. Preprocessing & Scalers (`StandardScaler`, `RobustScaler`, `MinMaxScaler`)
### - [ ] 61. Encoders & Imputers (`OneHotEncoder`, `OrdinalEncoder`, `SimpleImputer`)
### - [ ] 62. `ColumnTransformer` & End-to-End Leakage-Free `Pipeline`
### - [ ] 63. Cross-Validation & Splitting (`train_test_split(stratify=y)`, `StratifiedKFold`, `TimeSeriesSplit`)
### - [ ] 64. Hyperparameter Tuning (`GridSearchCV`)
### - [ ] 65. Core Estimators (`RandomForestClassifier`, `GradientBoostingRegressor`, `LogisticRegression`)
### - [ ] 66. Metrics & Confusion Matrix (`roc_auc_score`, `classification_report`, `mean_squared_error`)

---

## Module 15: [MEDIUM PRIORITY] Matplotlib & Seaborn for EDA

### - [ ] 67. Matplotlib Subplots & Figure Canvas (`plt.subplots()`)
### - [ ] 68. Distribution & Outlier Plots (`sns.histplot`, `sns.boxplot`)
### - [ ] 69. Correlation Heatmaps (`sns.heatmap(df.corr())`)

---

## Module 16: [MEDIUM PRIORITY] SciPy for Statistical Testing & Optimization

### - [ ] 70. Hypothesis Testing: Two-Sample t-test & ANOVA (`stats.ttest_ind`, `stats.f_oneway`)
### - [ ] 71. Chi-Square Test of Independence (`stats.chi2_contingency`)
### - [ ] 72. SciPy Optimization & Distance (`scipy.optimize.minimize`, `cdist`)

---

## Module 17: [LOW PRIORITY] NumPy Vectorization & Array Operations

### - [ ] 73. Array Shapes, Dtypes & Reshaping (`reshape`, `ravel`, `flatten`)
### - [ ] 74. Broadcasting Rules across Dimensions
### - [ ] 75. Boolean Masking & Conditional Replacement
### - [ ] 76. Linear Algebra: Matrix Multiplication (`@`), Dot Product, Norms

---

# PART 4: 4 End-to-End Timed Projects (OA & Interview Simulator)

---

### Project 1: Tabular Classification & Imbalanced Data (Credit Default / Customer Churn)
- **Time Limit:** 60 minutes
- **Focus:** Missing value imputation, high-cardinality encoding, `ColumnTransformer`, LightGBM/XGBoost, PR-AUC and ROC-AUC optimization.

### Project 2: Regression with Advanced Feature Engineering & LR from Scratch (House Prices)
- **Time Limit:** 75 minutes
- **Focus:** Normal Equation & Gradient Descent implementation from scratch, target skewness log-transform, interaction features, `.groupby().transform()`, Ridge/Lasso + GBDT.

### Project 3: Time Series Financial / Sales Forecasting
- **Time Limit:** 75 minutes
- **Focus:** Zero-leakage feature engineering, lag features, rolling windows, `TimeSeriesSplit` walk-forward validation.

### Project 4: A/B Testing, Statistical Significance & Customer Segmentation
- **Time Limit:** 60 minutes
- **Focus:** RFM aggregation in Pandas, SciPy two-sample t-tests and Chi-square testing, KMeans clustering with PCA 2D projections.
