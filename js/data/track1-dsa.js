// ==========================================================================
// Track 1: Core DSA in Python (Striver's SDE Sheet Mapped)
// Clean starter code signatures (NO pre-filled solutions in editor)
// ==========================================================================

window.TRACK_1_DSA = [
  // ------------------------------------------------------------------------
  // Module 1: Loops, Iteration & 2D Grids
  // ------------------------------------------------------------------------
  {
    id: "dsa-1",
    module: "Module 1: Loops & Grids",
    topic: "1. range() Fundamentals",
    title: "Best Time to Buy and Sell Stock",
    lcNum: 121,
    lcSlug: "best-time-to-buy-and-sell-stock",
    difficulty: "easy",
    cppBridge: "In C++: for (int i = 1; i < n; i++). In Python: for i in range(1, len(prices)):. range(start, stop) excludes the stop index.",
    theory: "Python range() generates an immutable arithmetic sequence in O(1) memory. Avoid len() indexing if you only need elements; here we need adjacent element comparison.",
    pitfalls: "Never do for i in range(len(arr) - 1) if you want to reach the last element—stop is non-inclusive!",
    desc: "You are given an array prices where prices[i] is the price of a given stock on the ith day. Return the maximum profit you can achieve from this transaction.",
    starterCode: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        min_price = float('inf')
        max_profit = 0
        for p in prices:
            min_price = min(min_price, p)
            max_profit = max(max_profit, p - min_price)
        return max_profit`,
    testCases: [
      { input: "[7,1,5,3,6,4]", expected: "5", call: "Solution().maxProfit([7,1,5,3,6,4])" },
      { input: "[7,6,4,3,1]", expected: "0", call: "Solution().maxProfit([7,6,4,3,1])" }
    ]
  },
  {
    id: "dsa-2",
    module: "Module 1: Loops & Grids",
    topic: "2. Reverse Iteration",
    title: "Next Permutation",
    lcNum: 31,
    lcSlug: "next-permutation",
    difficulty: "medium",
    cppBridge: "In C++: std::next_permutation(v.begin(), v.end()) or for(int i=n-2; i>=0; i--). In Python: range(n - 2, -1, -1) with step -1.",
    theory: "To loop backwards in Python, use range(start, -1, -1). To reverse a sublist in-place: nums[i+1:] = reversed(nums[i+1:]).",
    pitfalls: "Forgetting the middle argument -1 causes the loop to stop prematurely at index 0 without processing index 0!",
    desc: "A permutation of an array of integers is an arrangement of its members into a sequence or linear order. Rearrange numbers into the lexicographically next greater permutation in-place.",
    starterCode: `class Solution:
    def nextPermutation(self, nums: list[int]) -> None:
        """
        Do not return anything, modify nums in-place instead.
        """
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def nextPermutation(self, nums: list[int]) -> None:
        n = len(nums)
        i = n - 2
        while i >= 0 and nums[i] >= nums[i + 1]:
            i -= 1
        if i >= 0:
            j = n - 1
            while nums[j] <= nums[i]:
                j -= 1
            nums[i], nums[j] = nums[j], nums[i]
        nums[i + 1:] = reversed(nums[i + 1:])`,
    testCases: [
      { input: "[1,2,3]", expected: "[1, 3, 2]", call: "arr=[1,2,3]; Solution().nextPermutation(arr); arr" },
      { input: "[3,2,1]", expected: "[1, 2, 3]", call: "arr=[3,2,1]; Solution().nextPermutation(arr); arr" }
    ]
  },
  {
    id: "dsa-3",
    module: "Module 1: Loops & Grids",
    topic: "3. enumerate()",
    title: "Two Sum",
    lcNum: 1,
    lcSlug: "two-sum",
    difficulty: "easy",
    cppBridge: "In C++: for(int i=0; i<n; i++) with manual index tracking. In Python: for i, num in enumerate(nums): yields (index, value) tuples.",
    theory: "enumerate(iterable, start=0) is the idiomatic Python way to get both index and element simultaneously.",
    pitfalls: "Don't do for i in range(len(nums)): x = nums[i] when enumerate(nums) is cleaner and faster.",
    desc: "Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.",
    starterCode: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        seen = {}
        for i, num in enumerate(nums):
            diff = target - num
            if diff in seen:
                return [seen[diff], i]
            seen[num] = i
        return []`,
    testCases: [
      { input: "nums = [2,7,11,15], target = 9", expected: "[0, 1]", call: "Solution().twoSum([2,7,11,15], 9)" },
      { input: "nums = [3,2,4], target = 6", expected: "[1, 2]", call: "Solution().twoSum([3,2,4], 6)" }
    ]
  },
  {
    id: "dsa-4",
    module: "Module 1: Loops & Grids",
    topic: "4. zip() Parallel Iteration",
    title: "Longest Common Prefix",
    lcNum: 14,
    lcSlug: "longest-common-prefix",
    difficulty: "easy",
    cppBridge: "In C++: for loop over indices checking strs[j][i]. In Python: zip(*strs) unpacks and traverses character-by-character across all strings concurrently.",
    theory: "zip(*iterables) takes column-wise slices across rows. If len(set(chars)) == 1, all strings share that character.",
    pitfalls: "zip stops at the shortest string; make sure your logic handles empty string inputs safely.",
    desc: "Write a function to find the longest common prefix string amongst an array of strings. If there is no common prefix, return an empty string \"\".",
    starterCode: `class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def longestCommonPrefix(self, strs: list[str]) -> str:
        prefix = []
        for chars in zip(*strs):
            if len(set(chars)) == 1:
                prefix.append(chars[0])
            else:
                break
        return "".join(prefix)`,
    testCases: [
      { input: '["flower","flow","flight"]', expected: '"fl"', call: 'Solution().longestCommonPrefix(["flower","flow","flight"])' },
      { input: '["dog","racecar","car"]', expected: '""', call: 'Solution().longestCommonPrefix(["dog","racecar","car"])' }
    ]
  },
  {
    id: "dsa-5",
    module: "Module 1: Loops & Grids",
    topic: "5. 2D Matrix Creation & Traversal",
    title: "Set Matrix Zeroes",
    lcNum: 73,
    lcSlug: "set-matrix-zeroes",
    difficulty: "medium",
    cppBridge: "In C++: vector<vector<int>> m(R, vector<int>(C, 0)). In Python: [[0]*C for _ in range(R)]. NEVER [[0]*C]*R.",
    theory: "Multiplying a list containing lists duplicates the outer references. Modifying row 0 would modify all rows! Always use list comprehensions for 2D grids.",
    pitfalls: "grid = [[0] * C] * R means all R rows reference the exact same memory array.",
    desc: "Given an m x n integer matrix matrix, if an element is 0, set its entire row and column to 0's. You must do it in place.",
    starterCode: `class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> None:
        """
        Do not return anything, modify matrix in-place instead.
        """
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def setZeroes(self, matrix: list[list[int]]) -> None:
        R, C = len(matrix), len(matrix[0])
        first_row_zero = any(matrix[0][c] == 0 for c in range(C))
        first_col_zero = any(matrix[r][0] == 0 for r in range(R))
        for r in range(1, R):
            for c in range(1, C):
                if matrix[r][c] == 0:
                    matrix[r][0] = matrix[0][c] = 0
        for r in range(1, R):
            for c in range(1, C):
                if matrix[r][0] == 0 or matrix[0][c] == 0:
                    matrix[r][c] = 0
        if first_row_zero:
            for c in range(C): matrix[0][c] = 0
        if first_col_zero:
            for r in range(R): matrix[r][0] = 0`,
    testCases: [
      { input: "[[1,1,1],[1,0,1],[1,1,1]]", expected: "[[1, 0, 1], [0, 0, 0], [1, 0, 1]]", call: "m=[[1,1,1],[1,0,1],[1,1,1]]; Solution().setZeroes(m); m" }
    ]
  },
  {
    id: "dsa-6",
    module: "Module 1: Loops & Grids",
    topic: "6. List Comprehensions",
    title: "Pascal's Triangle",
    lcNum: 118,
    lcSlug: "pascals-triangle",
    difficulty: "easy",
    cppBridge: "In C++: building vector<vector<int>> with nested push_backs. In Python: row = [1] + [prev[j] + prev[j+1] for j in range(len(prev)-1)] + [1].",
    theory: "List comprehensions offer concise syntax: [expr for item in iterable if condition]. They run at C-speed internally.",
    pitfalls: "Avoid overly complex nested comprehensions that sacrifice readability.",
    desc: "Given an integer numRows, return the first numRows of Pascal's triangle.",
    starterCode: `class Solution:
    def generate(self, numRows: int) -> list[list[int]]:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def generate(self, numRows: int) -> list[list[int]]:
        res = [[1]]
        for _ in range(1, numRows):
            prev = res[-1]
            res.append([1] + [prev[i] + prev[i + 1] for i in range(len(prev) - 1)] + [1])
        return res`,
    testCases: [
      { input: "numRows = 5", expected: "[[1], [1, 1], [1, 2, 1], [1, 3, 3, 1], [1, 4, 6, 4, 1]]", call: "Solution().generate(5)" },
      { input: "numRows = 1", expected: "[[1]]", call: "Solution().generate(1)" }
    ]
  },

  // ------------------------------------------------------------------------
  // Module 2: Strings & Sequence Manipulation
  // ------------------------------------------------------------------------
  {
    id: "dsa-7",
    module: "Module 2: Strings & Stack",
    topic: "7. String Methods & Slicing",
    title: "Reverse Words in a String",
    lcNum: 151,
    lcSlug: "reverse-words-in-a-string",
    difficulty: "medium",
    cppBridge: "In C++: reverse(s.begin(), s.end()) and manual stringstream parsing. In Python: ' '.join(s.split()[::-1]).",
    theory: "s.split() with no arguments automatically splits by arbitrary whitespace runs and strips leading/trailing spaces.",
    pitfalls: "s.split(' ') preserves empty string tokens! Always use s.split() without arguments for whitespace collapsing.",
    desc: "Given an input string s, reverse the order of the words. Return a string of the words in reverse order concatenated by a single space.",
    starterCode: `class Solution:
    def reverseWords(self, s: str) -> str:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def reverseWords(self, s: str) -> str:
        return " ".join(reversed(s.split()))`,
    testCases: [
      { input: '"the sky is blue"', expected: '"blue is sky the"', call: 'Solution().reverseWords("the sky is blue")' },
      { input: '"  hello world  "', expected: '"world hello"', call: 'Solution().reverseWords("  hello world  ")' }
    ]
  },
  {
    id: "dsa-8",
    module: "Module 2: Strings & Stack",
    topic: "8. ASCII Math & Counter",
    title: "Valid Anagram",
    lcNum: 242,
    lcSlug: "valid-anagram",
    difficulty: "easy",
    cppBridge: "In C++: int count[26] = {0} with count[c - 'a']++. In Python: Counter(s) == Counter(t) or ord(c) - ord('a').",
    theory: "ord('a') returns 97. chr(97) returns 'a'. collections.Counter creates an O(N) frequency dictionary with direct equality checks.",
    pitfalls: "Python has no char type; a single character is simply a str of length 1.",
    desc: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
    starterCode: `class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # Write your code here
        pass
`,
    solutionCode: `from collections import Counter

class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        return Counter(s) == Counter(t)`,
    testCases: [
      { input: 's = "anagram", t = "nagaram"', expected: "True", call: 'Solution().isAnagram("anagram", "nagaram")' },
      { input: 's = "rat", t = "car"', expected: "False", call: 'Solution().isAnagram("rat", "car")' }
    ]
  },
  {
    id: "dsa-9",
    module: "Module 2: Strings & Stack",
    topic: "9. Slicing & Substrings",
    title: "Longest Palindromic Substring",
    lcNum: 5,
    lcSlug: "longest-palindromic-substring",
    difficulty: "medium",
    cppBridge: "In C++: s.substr(start, len). In Python: s[start:end] (end exclusive). Reverse check is s == s[::-1].",
    theory: "Slice syntax is s[start:stop:step]. Step -1 reverses. Expand around center avoids O(N^3) slice copies.",
    pitfalls: "s[i:j] creates an O(length) copy in memory; don't slice repeatedly in tight inner loops if two pointers suffice.",
    desc: "Given a string s, return the longest palindromic substring in s.",
    starterCode: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def longestPalindrome(self, s: str) -> str:
        res = ""
        def expand(l, r):
            while l >= 0 and r < len(s) and s[l] == s[r]:
                l -= 1; r += 1
            return s[l + 1:r]
        for i in range(len(s)):
            p1 = expand(i, i)
            p2 = expand(i, i + 1)
            if len(p1) > len(res): res = p1
            if len(p2) > len(res): res = p2
        return res`,
    testCases: [
      { input: '"babad"', expected: '"bab"', call: 'Solution().longestPalindrome("babad")' },
      { input: '"cbbd"', expected: '"bb"', call: 'Solution().longestPalindrome("cbbd")' }
    ]
  },
  {
    id: "dsa-10",
    module: "Module 2: Strings & Stack",
    topic: "10. Stack using list",
    title: "Valid Parentheses",
    lcNum: 20,
    lcSlug: "valid-parentheses",
    difficulty: "easy",
    cppBridge: "In C++: std::stack<char> s; s.push(c); s.top(); s.pop(). In Python: standard list st = []; st.append(c); st[-1]; st.pop().",
    theory: "list in Python has O(1) amortized append() and pop() at the tail. Check emptiness with if not st:.",
    pitfalls: "st[-1] on an empty list raises IndexError. Always check if st: before peeking.",
    desc: "Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid.",
    starterCode: `class Solution:
    def isValid(self, s: str) -> bool:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def isValid(self, s: str) -> bool:
        st = []
        mapping = {')': '(', '}': '{', ']': '['}
        for c in s:
            if c in mapping:
                if not st or st.pop() != mapping[c]:
                    return False
            else:
                st.append(c)
        return not st`,
    testCases: [
      { input: '"()"', expected: "True", call: 'Solution().isValid("()")' },
      { input: '"()[]{}"', expected: "True", call: 'Solution().isValid("()[]{}")' },
      { input: '"(]"', expected: "False", call: 'Solution().isValid("(]")' }
    ]
  },

  // ------------------------------------------------------------------------
  // Module 3: Queues, Deque & Hash Containers
  // ------------------------------------------------------------------------
  {
    id: "dsa-11",
    module: "Module 3: Queues & Hash",
    topic: "11. Queue & Deque (collections.deque)",
    title: "Rotting Oranges",
    lcNum: 994,
    lcSlug: "rotting-oranges",
    difficulty: "medium",
    cppBridge: "In C++: std::queue<pair<int,int>> q. In Python: from collections import deque; q = deque(); q.popleft().",
    theory: "Never use list.pop(0) because it is O(N). deque is implemented as a doubly linked list of blocks with true O(1) appends and pops on both ends.",
    pitfalls: "list.pop(0) on large inputs leads to TLE. Always import deque for BFS.",
    desc: "You are given an m x n grid where each cell can have one of three values: 0 (empty), 1 (fresh), 2 (rotten). Return the minimum minutes until no fresh orange remains.",
    starterCode: `from collections import deque

class Solution:
    def orangesRotting(self, grid: list[list[int]]) -> int:
        # Write your code here
        pass
`,
    solutionCode: `from collections import deque

class Solution:
    def orangesRotting(self, grid: list[list[int]]) -> int:
        R, C = len(grid), len(grid[0])
        q = deque()
        fresh = 0
        for r in range(R):
            for c in range(C):
                if grid[r][c] == 2: q.append((r, c, 0))
                elif grid[r][c] == 1: fresh += 1
        minutes = 0
        while q:
            r, c, d = q.popleft()
            minutes = max(minutes, d)
            for dr, dc in [(-1,0), (1,0), (0,-1), (0,1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == 1:
                    grid[nr][nc] = 2
                    fresh -= 1
                    q.append((nr, nc, d + 1))
        return minutes if fresh == 0 else -1`,
    testCases: [
      { input: "[[2,1,1],[1,1,0],[0,1,1]]", expected: "4", call: "Solution().orangesRotting([[2,1,1],[1,1,0],[0,1,1]])" },
      { input: "[[2,1,1],[0,1,1],[1,0,1]]", expected: "-1", call: "Solution().orangesRotting([[2,1,1],[0,1,1],[1,0,1]])" }
    ]
  },
  {
    id: "dsa-12",
    module: "Module 3: Queues & Hash",
    topic: "12. Monotonic Deque",
    title: "Sliding Window Maximum",
    lcNum: 239,
    lcSlug: "sliding-window-maximum",
    difficulty: "hard",
    cppBridge: "In C++: std::deque<int> dq; dq.back(); dq.pop_back(). In Python: q[-1] and q.pop().",
    theory: "Maintain indices in a deque such that corresponding values are monotonically decreasing. Front of deque is always the window max.",
    pitfalls: "Store indices, not values, in the deque so you can evict elements out of window range (q[0] < i - k + 1).",
    desc: "You are given an array of integers nums and a sliding window of size k moving from left to right. Return the max sliding window.",
    starterCode: `from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        # Write your code here
        pass
`,
    solutionCode: `from collections import deque

class Solution:
    def maxSlidingWindow(self, nums: list[int], k: int) -> list[int]:
        q = deque()
        res = []
        for i, x in enumerate(nums):
            while q and nums[q[-1]] <= x:
                q.pop()
            q.append(i)
            if q[0] <= i - k:
                q.popleft()
            if i >= k - 1:
                res.append(nums[q[0]])
        return res`,
    testCases: [
      { input: "nums = [1,3,-1,-3,5,3,6,7], k = 3", expected: "[3, 3, 5, 5, 6, 7]", call: "Solution().maxSlidingWindow([1,3,-1,-3,5,3,6,7], 3)" }
    ]
  },
  {
    id: "dsa-13",
    module: "Module 3: Queues & Hash",
    topic: "13. Hash Set (O(1) lookups)",
    title: "Longest Consecutive Sequence",
    lcNum: 128,
    lcSlug: "longest-consecutive-sequence",
    difficulty: "medium",
    cppBridge: "In C++: unordered_set<int> s(nums.begin(), nums.end()). In Python: num_set = set(nums). Lookup is if x in num_set:.",
    theory: "Convert to set for O(1) average lookups. Only start counting sequence lengths from streak starters (if num - 1 not in num_set).",
    pitfalls: "Iterating over nums instead of num_set can lead to redundant work on duplicate inputs.",
    desc: "Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence in O(n) time.",
    starterCode: `class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        num_set = set(nums)
        longest = 0
        for num in num_set:
            if num - 1 not in num_set:
                curr = num
                streak = 1
                while curr + 1 in num_set:
                    curr += 1
                    streak += 1
                longest = max(longest, streak)
        return longest`,
    testCases: [
      { input: "[100,4,200,1,3,2]", expected: "4", call: "Solution().longestConsecutive([100,4,200,1,3,2])" },
      { input: "[0,3,7,2,5,8,4,6,0,1]", expected: "9", call: "Solution().longestConsecutive([0,3,7,2,5,8,4,6,0,1])" }
    ]
  },
  {
    id: "dsa-13b",
    module: "Module 3: Queues & Hash",
    topic: "13b. Set Theory Operations (&, |, -, ^)",
    title: "Intersection of Two Arrays",
    lcNum: 349,
    lcSlug: "intersection-of-two-arrays",
    difficulty: "easy",
    dsKey: "hash_set",
    cppBridge: "In C++: unordered_set<int> s(nums1.begin(), nums1.end()); vector<int> res; for(int x : nums2) if (s.erase(x)) res.push_back(x);. In Python: list(set(nums1) & set(nums2)).",
    theory: "Python sets support mathematical operators directly: & (intersection), | (union), - (difference), ^ (symmetric difference).",
    pitfalls: "set conversion takes O(N) time and discards order. Convert back to list if required by the signature.",
    desc: "Given two integer arrays nums1 and nums2, return an array of their intersection. Each element in the result must be unique and you may return the result in any order.",
    starterCode: `class Solution:
    def intersection(self, nums1: list[int], nums2: list[int]) -> list[int]:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def intersection(self, nums1: list[int], nums2: list[int]) -> list[int]:
        return list(set(nums1) & set(nums2))`,
    testCases: [
      { input: "nums1 = [1,2,2,1], nums2 = [2,2]", expected: "[2]", call: "Solution().intersection([1,2,2,1], [2,2])" },
      { input: "nums1 = [4,9,5], nums2 = [9,4,9,8,4]", expected: "[4, 9]", call: "sorted(Solution().intersection([4,9,5], [9,4,9,8,4]))" }
    ]
  },
  {
    id: "dsa-13c",
    module: "Module 3: Queues & Hash",
    topic: "13c. Sliding Window with Set",
    title: "Longest Substring Without Repeating Characters",
    lcNum: 3,
    lcSlug: "longest-substring-without-repeating-characters",
    difficulty: "medium",
    dsKey: "hash_set",
    cppBridge: "In C++: unordered_set<char> window; window.erase(s[l]); window.insert(s[r]);. In Python: char_set = set(); char_set.remove(s[l]); char_set.add(s[r]).",
    theory: "Maintain a dynamic set of characters in the current sliding window. While s[r] is already in the set, contract from the left with char_set.remove(s[l]).",
    pitfalls: "set.remove(x) raises KeyError if x is not in the set. Alternatively, set.discard(x) deletes without throwing an error.",
    desc: "Given a string s, find the length of the longest substring without repeating characters.",
    starterCode: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_set = set()
        l = 0
        res = 0
        for r in range(len(s)):
            while s[r] in char_set:
                char_set.remove(s[l])
                l += 1
            char_set.add(s[r])
            res = max(res, r - l + 1)
        return res`,
    testCases: [
      { input: '"abcabcbb"', expected: "3", call: 'Solution().lengthOfLongestSubstring("abcabcbb")' },
      { input: '"bbbbb"', expected: "1", call: 'Solution().lengthOfLongestSubstring("bbbbb")' },
      { input: '"pwwkew"', expected: "3", call: 'Solution().lengthOfLongestSubstring("pwwkew")' }
    ]
  },
  {
    id: "dsa-14",
    module: "Module 3: Queues & Hash",
    topic: "14. collections.Counter",
    title: "Majority Element II",
    lcNum: 229,
    lcSlug: "majority-element-ii",
    difficulty: "medium",
    cppBridge: "In C++: unordered_map<int, int> count. In Python: counts = Counter(nums). Iteration: for k, v in counts.items():.",
    theory: "Counter simplifies frequency tracking. Combine with a list comprehension: [k for k, v in counts.items() if v > threshold].",
    pitfalls: "Integer division in Python is // (floored). Ensure len(nums) // 3.",
    desc: "Given an integer array of size n, find all elements that appear more than ⌊ n/3 ⌋ times.",
    starterCode: `from collections import Counter

class Solution:
    def majorityElement(self, nums: list[int]) -> list[int]:
        # Write your code here
        pass
`,
    solutionCode: `from collections import Counter

class Solution:
    def majorityElement(self, nums: list[int]) -> list[int]:
        threshold = len(nums) // 3
        return [k for k, v in Counter(nums).items() if v > threshold]`,
    testCases: [
      { input: "[3,2,3]", expected: "[3]", call: "Solution().majorityElement([3,2,3])" },
      { input: "[1]", expected: "[1]", call: "Solution().majorityElement([1])" }
    ]
  },
  {
    id: "dsa-15",
    module: "Module 3: Queues & Hash",
    topic: "15. Prefix Sum with Hash Map",
    title: "Subarray Sum Equals K",
    lcNum: 560,
    lcSlug: "subarray-sum-equals-k",
    difficulty: "medium",
    cppBridge: "In C++: unordered_map<int, int> mp; mp[0] = 1. In Python: prefix = {0: 1}; prefix.get(s - k, 0).",
    theory: "Use dict.get(key, 0) to look up frequency with a fallback default to avoid KeyError.",
    pitfalls: "Accessing d[k] raises KeyError if key is missing. Either use d.get(k, 0) or defaultdict(int).",
    desc: "Given an array of integers nums and an integer k, return the total number of subarrays whose sum equals to k.",
    starterCode: `class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def subarraySum(self, nums: list[int], k: int) -> int:
        prefix_counts = {0: 1}
        curr_sum = 0
        ans = 0
        for x in nums:
            curr_sum += x
            ans += prefix_counts.get(curr_sum - k, 0)
            prefix_counts[curr_sum] = prefix_counts.get(curr_sum, 0) + 1
        return ans`,
    testCases: [
      { input: "nums = [1,1,1], k = 2", expected: "2", call: "Solution().subarraySum([1,1,1], 2)" },
      { input: "nums = [1,2,3], k = 3", expected: "2", call: "Solution().subarraySum([1,2,3], 3)" }
    ]
  },

  // ------------------------------------------------------------------------
  // Module 4: Heaps & Priority Queues
  // ------------------------------------------------------------------------
  {
    id: "dsa-16",
    module: "Module 4: Heaps & PQ",
    topic: "16. Min-Heap (heapq)",
    title: "Kth Largest Element in an Array",
    lcNum: 215,
    lcSlug: "kth-largest-element-in-an-array",
    difficulty: "medium",
    cppBridge: "C++ priority_queue is a MAX-heap by default. Python heapq is a MIN-heap by default! heapq.heappush(h, x) & heapq.heappop(h).",
    theory: "To find the Kth largest element using min-heap: push elements; whenever size > k, pop the smallest. Top is the answer.",
    pitfalls: "Remember: heapq operates in-place on a standard Python list, not a separate class.",
    desc: "Given an integer array nums and an integer k, return the kth largest element in the array.",
    starterCode: `import heapq

class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        # Write your code here
        pass
`,
    solutionCode: `import heapq

class Solution:
    def findKthLargest(self, nums: list[int], k: int) -> int:
        pq = []
        for x in nums:
            heapq.heappush(pq, x)
            if len(pq) > k:
                heapq.heappop(pq)
        return pq[0]`,
    testCases: [
      { input: "nums = [3,2,1,5,6,4], k = 2", expected: "5", call: "Solution().findKthLargest([3,2,1,5,6,4], 2)" },
      { input: "nums = [3,2,3,1,2,4,5,5,6], k = 4", expected: "4", call: "Solution().findKthLargest([3,2,3,1,2,4,5,5,6], 4)" }
    ]
  },
  {
    id: "dsa-17",
    module: "Module 4: Heaps & PQ",
    topic: "17. Max-Heap with Negation",
    title: "Find Median from Data Stream",
    lcNum: 295,
    lcSlug: "find-median-from-data-stream",
    difficulty: "hard",
    cppBridge: "In C++: priority_queue<int> max_h and priority_queue<int, vector<int>, greater<int>> min_h. In Python: negate values for max_h (-x).",
    theory: "Since Python lacks a built-in max-heap class, push -x and retrieve -max_h[0].",
    pitfalls: "Always negate when pushing AND pop/peek to get back the true positive value.",
    desc: "The median is the middle value in an ordered integer list. Design a data structure that supports addNum and findMedian.",
    starterCode: `import heapq

class MedianFinder:
    def __init__(self):
        # Initialize your data structure here
        pass

    def addNum(self, num: int) -> None:
        # Write your code here
        pass

    def findMedian(self) -> float:
        # Write your code here
        pass
`,
    solutionCode: `import heapq

class MedianFinder:
    def __init__(self):
        self.small = []
        self.large = []

    def addNum(self, num: int) -> None:
        heapq.heappush(self.small, -num)
        if self.small and self.large and (-self.small[0]) > self.large[0]:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.small) > len(self.large) + 1:
            heapq.heappush(self.large, -heapq.heappop(self.small))
        if len(self.large) > len(self.small):
            heapq.heappush(self.small, -heapq.heappop(self.large))

    def findMedian(self) -> float:
        if len(self.small) > len(self.large):
            return float(-self.small[0])
        return (-self.small[0] + self.large[0]) / 2.0`,
    testCases: [
      { input: "add 1, add 2, findMedian, add 3, findMedian", expected: "2.0", call: "mf=MedianFinder(); mf.addNum(1); mf.addNum(2); m1=mf.findMedian(); mf.addNum(3); mf.findMedian()" }
    ]
  },
  {
    id: "dsa-18",
    module: "Module 4: Heaps & PQ",
    topic: "18. Priority Queue with Tuples",
    title: "Top K Frequent Elements",
    lcNum: 347,
    lcSlug: "top-k-frequent-elements",
    difficulty: "medium",
    cppBridge: "In C++: priority_queue<pair<int, int>>. In Python: heapq with (frequency, num) tuples sorts automatically by tuple elements in order.",
    theory: "Tuples (a, b) in Python compare a first, then b. Push (freq, num) to sort by frequency.",
    pitfalls: "If frequencies match, Python compares the second tuple element. If non-comparable, pass an index or id.",
    desc: "Given an integer array nums and an integer k, return the k most frequent elements.",
    starterCode: `import heapq
from collections import Counter

class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        # Write your code here
        pass
`,
    solutionCode: `import heapq
from collections import Counter

class Solution:
    def topKFrequent(self, nums: list[int], k: int) -> list[int]:
        counts = Counter(nums)
        pq = []
        for num, freq in counts.items():
            heapq.heappush(pq, (freq, num))
            if len(pq) > k:
                heapq.heappop(pq)
        return [num for _, num in pq]`,
    testCases: [
      { input: "nums = [1,1,1,2,2,3], k = 2", expected: "[2, 1]", call: "sorted(Solution().topKFrequent([1,1,1,2,2,3], 2))" }
    ]
  },

  // ------------------------------------------------------------------------
  // Module 5: Binary Search & Ordered Containers
  // ------------------------------------------------------------------------
  {
    id: "dsa-19",
    module: "Module 5: Binary Search",
    topic: "19. Binary Search (bisect_left)",
    title: "Search in Rotated Sorted Array",
    lcNum: 33,
    lcSlug: "search-in-rotated-sorted-array",
    difficulty: "medium",
    cppBridge: "In C++: std::lower_bound or custom while(l <= r). In Python: bisect.bisect_left(arr, x) or two-pointer binary search.",
    theory: "Python integer division is l + (r - l) // 2. Since Python integers have arbitrary precision, (l + r) // 2 never overflows!",
    pitfalls: "Never worry about 32-bit integer overflow in Python (l + r) // 2 is completely safe.",
    desc: "Given the rotated sorted array nums and an integer target, return the index of target, or -1 if not found.",
    starterCode: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def search(self, nums: list[int], target: int) -> int:
        l, r = 0, len(nums) - 1
        while l <= r:
            mid = (l + r) // 2
            if nums[mid] == target:
                return mid
            if nums[l] <= nums[mid]:
                if nums[l] <= target < nums[mid]: r = mid - 1
                else: l = mid + 1
            else:
                if nums[mid] < target <= nums[r]: l = mid + 1
                else: r = mid - 1
        return -1`,
    testCases: [
      { input: "nums = [4,5,6,7,0,1,2], target = 0", expected: "4", call: "Solution().search([4,5,6,7,0,1,2], 0)" },
      { input: "nums = [4,5,6,7,0,1,2], target = 3", expected: "-1", call: "Solution().search([4,5,6,7,0,1,2], 3)" }
    ]
  },
  {
    id: "dsa-20",
    module: "Module 5: Binary Search",
    topic: "20. bisect on LIS",
    title: "Longest Increasing Subsequence",
    lcNum: 300,
    lcSlug: "longest-increasing-subsequence",
    difficulty: "medium",
    cppBridge: "In C++: auto it = lower_bound(tails.begin(), tails.end(), x). In Python: idx = bisect.bisect_left(tails, x).",
    theory: "bisect_left returns first position where val >= x. If idx == len(tails), append; else replace tails[idx] = x.",
    pitfalls: "bisect_left is >= x (lower_bound); bisect_right is > x (upper_bound).",
    desc: "Given an integer array nums, return the length of the longest strictly increasing subsequence.",
    starterCode: `import bisect

class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        # Write your code here
        pass
`,
    solutionCode: `import bisect

class Solution:
    def lengthOfLIS(self, nums: list[int]) -> int:
        tails = []
        for x in nums:
            idx = bisect.bisect_left(tails, x)
            if idx == len(tails):
                tails.append(x)
            else:
                tails[idx] = x
        return len(tails)`,
    testCases: [
      { input: "[10,9,2,5,3,7,101,18]", expected: "4", call: "Solution().lengthOfLIS([10,9,2,5,3,7,101,18])" },
      { input: "[0,1,0,3,2,3]", expected: "4", call: "Solution().lengthOfLIS([0,1,0,3,2,3])" }
    ]
  },
  {
    id: "dsa-21",
    module: "Module 5: Binary Search",
    topic: "21. SortedList (C++ multiset equivalent)",
    title: "Reverse Pairs",
    lcNum: 493,
    lcSlug: "reverse-pairs",
    difficulty: "hard",
    cppBridge: "In C++: std::multiset with distance() or PBDS. In Python: sortedcontainers.SortedList with sl.bisect_right() and sl.add().",
    theory: "SortedList maintains sorted elements in O(log N) operations with duplicates permitted (exact multiset drop-in).",
    pitfalls: "sortedcontainers is available by default on LeetCode! Direct import: from sortedcontainers import SortedList.",
    desc: "Given an integer array nums, return the number of reverse pairs where i < j and nums[i] > 2 * nums[j].",
    starterCode: `from sortedcontainers import SortedList

class Solution:
    def reversePairs(self, nums: list[int]) -> int:
        # Write your code here
        pass
`,
    solutionCode: `from sortedcontainers import SortedList

class Solution:
    def reversePairs(self, nums: list[int]) -> int:
        sl = SortedList()
        count = 0
        for x in nums:
            idx = sl.bisect_right(2 * x)
            count += len(sl) - idx
            sl.add(x)
        return count`,
    testCases: [
      { input: "[1,3,2,3,1]", expected: "2", call: "Solution().reversePairs([1,3,2,3,1])" },
      { input: "[2,4,3,5,1]", expected: "3", call: "Solution().reversePairs([2,4,3,5,1])" }
    ]
  },

  // ------------------------------------------------------------------------
  // Module 6: Sorting & Custom Comparators
  // ------------------------------------------------------------------------
  {
    id: "dsa-22",
    module: "Module 6: Sorting & Comparators",
    topic: "22. Lambda Sorting (key=lambda)",
    title: "Merge Intervals",
    lcNum: 56,
    lcSlug: "merge-intervals",
    difficulty: "medium",
    cppBridge: "In C++: sort(v.begin(), v.end(), [](const auto& a, const auto& b){ return a[0] < b[0]; }). In Python: intervals.sort(key=lambda x: x[0]).",
    theory: "Python's Timsort is stable and fast. Multi-key sorting uses tuples: key=lambda x: (x[0], -x[1]).",
    pitfalls: "arr.sort() mutates in-place and returns None! Don't do arr = arr.sort() (sets arr to None).",
    desc: "Given an array of intervals where intervals[i] = [starti, endi], merge all overlapping intervals.",
    starterCode: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def merge(self, intervals: list[list[int]]) -> list[list[int]]:
        intervals.sort(key=lambda x: x[0])
        merged = []
        for interval in intervals:
            if not merged or merged[-1][1] < interval[0]:
                merged.append(interval)
            else:
                merged[-1][1] = max(merged[-1][1], interval[1])
        return merged`,
    testCases: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", expected: "[[1, 6], [8, 10], [15, 18]]", call: "Solution().merge([[1,3],[2,6],[8,10],[15,18]])" }
    ]
  },
  {
    id: "dsa-23",
    module: "Module 6: Sorting & Comparators",
    topic: "23. Custom Comparator (cmp_to_key)",
    title: "Largest Number",
    lcNum: 179,
    lcSlug: "largest-number",
    difficulty: "medium",
    cppBridge: "In C++: bool cmp(string a, string b){ return a + b > b + a; }. In Python: from functools import cmp_to_key; key=cmp_to_key(cmp).",
    theory: "cmp_to_key converts a standard two-argument comparator into a key function. Return -1 for smaller/earlier, 1 for larger.",
    pitfalls: "Joining all zeros results in '00...'; handle the edge case with str(int(res)) or checking if res[0] == '0'.",
    desc: "Given a list of non-negative integers nums, arrange them such that they form the largest number and return it.",
    starterCode: `from functools import cmp_to_key

class Solution:
    def largestNumber(self, nums: list[int]) -> str:
        # Write your code here
        pass
`,
    solutionCode: `from functools import cmp_to_key

class Solution:
    def largestNumber(self, nums: list[int]) -> str:
        def cmp(a: str, b: str) -> int:
            return -1 if a + b > b + a else 1 if a + b < b + a else 0
        str_nums = sorted([str(x) for x in nums], key=cmp_to_key(cmp))
        return "0" if str_nums[0] == "0" else "".join(str_nums)`,
    testCases: [
      { input: "[10,2]", expected: '"210"', call: 'Solution().largestNumber([10,2])' },
      { input: "[3,30,34,5,9]", expected: '"9534330"', call: 'Solution().largestNumber([3,30,34,5,9])' }
    ]
  },

  // ------------------------------------------------------------------------
  // Module 7: Recursion, DP & Math Idioms
  // ------------------------------------------------------------------------
  {
    id: "dsa-24",
    module: "Module 7: Recursion & DP",
    topic: "24. nonlocal & Recursion Limit",
    title: "Binary Tree Maximum Path Sum",
    lcNum: 124,
    lcSlug: "binary-tree-maximum-path-sum",
    difficulty: "hard",
    cppBridge: "In C++: passing int& max_sum by reference. In Python: declare nonlocal max_sum inside the nested DFS function.",
    theory: "nonlocal allows inner functions to reassign variables in the enclosing outer scope without making them global.",
    pitfalls: "Forgetting nonlocal causes Python to treat max_sum as a new uninitialized local variable, raising UnboundLocalError.",
    desc: "A path in a binary tree is a sequence of nodes. Return the maximum path sum of any non-empty path.",
    starterCode: `# Definition for a binary tree node.
class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def maxPathSum(self, root: TreeNode) -> int:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def maxPathSum(self, root: TreeNode) -> int:
        max_sum = float('-inf')
        def dfs(node):
            nonlocal max_sum
            if not node: return 0
            l = max(dfs(node.left), 0)
            r = max(dfs(node.right), 0)
            max_sum = max(max_sum, node.val + l + r)
            return node.val + max(l, r)
        dfs(root)
        return max_sum`,
    testCases: [
      { input: "root = [1,2,3]", expected: "6", call: "root=TreeNode(1, TreeNode(2), TreeNode(3)); Solution().maxPathSum(root)" }
    ]
  },
  {
    id: "dsa-25",
    module: "Module 7: Recursion & DP",
    topic: "25. Automatic DP Memoization (@cache)",
    title: "Edit Distance",
    lcNum: 72,
    lcSlug: "edit-distance",
    difficulty: "medium",
    cppBridge: "In C++: vector<vector<int>> dp(m, vector<int>(n, -1)). In Python: @cache decorator from functools automatically memoizes recursive calls.",
    theory: "@cache (Python 3.9+) or @lru_cache(None) caches function arguments in a hash table. Zero manual table boilerplate required.",
    pitfalls: "Arguments to @cache must be hashable (tuples, ints, strings). Never pass unhashable lists to a cached function.",
    desc: "Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.",
    starterCode: `from functools import cache

class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        # Write your code here
        pass
`,
    solutionCode: `from functools import cache

class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        @cache
        def dp(i: int, j: int) -> int:
            if i == len(word1): return len(word2) - j
            if j == len(word2): return len(word1) - i
            if word1[i] == word2[j]: return dp(i + 1, j + 1)
            return 1 + min(dp(i, j + 1), dp(i + 1, j), dp(i + 1, j + 1))
        return dp(0, 0)`,
    testCases: [
      { input: 'word1 = "horse", word2 = "ros"', expected: "3", call: 'Solution().minDistance("horse", "ros")' },
      { input: 'word1 = "intention", word2 = "execution"', expected: "5", call: 'Solution().minDistance("intention", "execution")' }
    ]
  },
  {
    id: "dsa-26",
    module: "Module 7: Recursion & DP",
    topic: "26. 0/1 Knapsack Pattern",
    title: "Partition Equal Subset Sum",
    lcNum: 416,
    lcSlug: "partition-equal-subset-sum",
    difficulty: "medium",
    cppBridge: "In C++: bitset or boolean DP table. In Python: @cache with boolean recursion or set of reachable sums.",
    theory: "Iterating through numbers and building a set of reachable sums: dp |= {s + x for s in dp}. Extremely concise and fast in Python.",
    pitfalls: "Sum check: if total_sum % 2 != 0, it's impossible to partition into two equal integers.",
    desc: "Given an integer array nums, return true if you can partition the array into two subsets such that the sum of elements in both subsets is equal.",
    starterCode: `class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def canPartition(self, nums: list[int]) -> bool:
        total = sum(nums)
        if total % 2: return False
        target = total // 2
        dp = {0}
        for x in nums:
            dp |= {s + x for s in dp if s + x <= target}
            if target in dp: return True
        return False`,
    testCases: [
      { input: "[1,5,11,5]", expected: "True", call: "Solution().canPartition([1,5,11,5])" },
      { input: "[1,2,3,5]", expected: "False", call: "Solution().canPartition([1,2,3,5])" }
    ]
  },

  // ------------------------------------------------------------------------
  // Module 8: Trees, Graphs & DSU Boilerplate
  // ------------------------------------------------------------------------
  {
    id: "dsa-27",
    module: "Module 8: Trees & Graphs",
    topic: "27. Tree Level-Order Traversal",
    title: "Binary Tree Level Order Traversal",
    lcNum: 102,
    lcSlug: "binary-tree-level-order-traversal",
    difficulty: "medium",
    cppBridge: "In C++: queue<TreeNode*> q; int sz = q.size(). In Python: q = deque([root]) and for _ in range(len(q)): snapshot level size.",
    theory: "range(len(q)) captures the queue size at the start of the level loop, preventing inner appends from expanding the current level.",
    pitfalls: "Don't use while q.popleft() without capturing level length first, or levels get merged.",
    desc: "Given the root of a binary tree, return the level order traversal of its nodes' values (i.e., from left to right, level by level).",
    starterCode: `from collections import deque

class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

class Solution:
    def levelOrder(self, root: TreeNode) -> list[list[int]]:
        # Write your code here
        pass
`,
    solutionCode: `from collections import deque

class Solution:
    def levelOrder(self, root: TreeNode) -> list[list[int]]:
        if not root: return []
        res, q = [], deque([root])
        while q:
            level = []
            for _ in range(len(q)):
                node = q.popleft()
                level.append(node.val)
                if node.left: q.append(node.left)
                if node.right: q.append(node.right)
            res.append(level)
        return res`,
    testCases: [
      { input: "root = [3,9,20,null,null,15,7]", expected: "[[3], [9, 20], [15, 7]]", call: "root=TreeNode(3, TreeNode(9), TreeNode(20, TreeNode(15), TreeNode(7))); Solution().levelOrder(root)" }
    ]
  },
  {
    id: "dsa-28",
    module: "Module 8: Trees & Graphs",
    topic: "28. Graph DFS & Grid Deltas",
    title: "Number of Islands",
    lcNum: 200,
    lcSlug: "number-of-islands",
    difficulty: "medium",
    cppBridge: "In C++: dx[] and dy[] loops. In Python: for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]: unpacking directly in loop.",
    theory: "In-place grid marking (grid[r][c] = '0') saves auxiliary visited set space.",
    pitfalls: "Strings in Python grids ('1' vs '0') are character strings, not integers 1 and 0!",
    desc: "Given an m x n 2D binary grid grid which represents a map of '1's (land) and '0's (water), return the number of islands.",
    starterCode: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def numIslands(self, grid: list[list[str]]) -> int:
        R, C = len(grid), len(grid[0])
        count = 0
        def dfs(r, c):
            grid[r][c] = '0'
            for dr, dc in [(-1, 0), (1, 0), (0, -1), (0, 1)]:
                nr, nc = r + dr, c + dc
                if 0 <= nr < R and 0 <= nc < C and grid[nr][nc] == '1':
                    dfs(nr, nc)
        for r in range(R):
            for c in range(C):
                if grid[r][c] == '1':
                    count += 1
                    dfs(r, c)
        return count`,
    testCases: [
      { input: 'grid = [["1","1","0"],["1","1","0"],["0","0","1"]]', expected: "2", call: 'Solution().numIslands([["1","1","0"],["1","1","0"],["0","0","1"]])' }
    ]
  },
  {
    id: "dsa-29",
    module: "Module 8: Trees & Graphs",
    topic: "29. Topological Sort (Kahn's Algorithm)",
    title: "Course Schedule",
    lcNum: 207,
    lcSlug: "course-schedule",
    difficulty: "medium",
    cppBridge: "In C++: vector<int> indegree, queue<int> q. In Python: indegree = [0] * n, adj = defaultdict(list), q = deque().",
    theory: "defaultdict(list) eliminates key checks. When all elements with indegree 0 are processed, compare count with numCourses.",
    pitfalls: "Course prerequisites [a, b] means b -> a (take b before a).",
    desc: "There are a total of numCourses courses you have to take, labeled from 0 to numCourses - 1. Return true if you can finish all courses.",
    starterCode: `from collections import defaultdict, deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        # Write your code here
        pass
`,
    solutionCode: `from collections import defaultdict, deque

class Solution:
    def canFinish(self, numCourses: int, prerequisites: list[list[int]]) -> bool:
        adj = defaultdict(list)
        indegree = [0] * numCourses
        for course, pre in prerequisites:
            adj[pre].append(course)
            indegree[course] += 1
        q = deque([i for i in range(numCourses) if indegree[i] == 0])
        taken = 0
        while q:
            u = q.popleft()
            taken += 1
            for v in adj[u]:
                indegree[v] -= 1
                if indegree[v] == 0:
                    q.append(v)
        return taken == numCourses`,
    testCases: [
      { input: "numCourses = 2, prerequisites = [[1,0]]", expected: "True", call: "Solution().canFinish(2, [[1,0]])" },
      { input: "numCourses = 2, prerequisites = [[1,0],[0,1]]", expected: "False", call: "Solution().canFinish(2, [[1,0],[0,1]])" }
    ]
  },
  {
    id: "dsa-30",
    module: "Module 8: Trees & Graphs",
    topic: "30. Disjoint Set Union (DSU Class)",
    title: "Number of Provinces",
    lcNum: 547,
    lcSlug: "number-of-provinces",
    difficulty: "medium",
    cppBridge: "In C++: DSU struct with path compression & union by rank. In Python: clean class DSU with self.parent and self.rank lists.",
    theory: "self.parent = list(range(n)) initializes each node to its own representative. Path compression flattens the tree in find().",
    pitfalls: "When uniting components, decrement component count to track provinces efficiently.",
    desc: "There are n cities. Return the total number of provinces (connected components).",
    starterCode: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n

    def find(self, x):
        # Implement find with path compression
        pass

    def union(self, x, y):
        # Implement union by rank
        pass

class Solution:
    def findCircleNum(self, isConnected: list[list[int]]) -> int:
        # Write your code here using DSU
        pass
`,
    solutionCode: `class DSU:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n
        self.count = n
    def find(self, x):
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    def union(self, x, y):
        px, py = self.find(x), self.find(y)
        if px == py: return False
        if self.rank[px] < self.rank[py]: px, py = py, px
        self.parent[py] = px
        if self.rank[px] == self.rank[py]: self.rank[px] += 1
        self.count -= 1
        return True

class Solution:
    def findCircleNum(self, isConnected: list[list[int]]) -> int:
        n = len(isConnected)
        dsu = DSU(n)
        for i in range(n):
            for j in range(i + 1, n):
                if isConnected[i][j]: dsu.union(i, j)
        return dsu.count`,
    testCases: [
      { input: "[[1,1,0],[1,1,0],[0,0,1]]", expected: "2", call: "Solution().findCircleNum([[1,1,0],[1,1,0],[0,0,1]])" },
      { input: "[[1,0,0],[0,1,0],[0,0,1]]", expected: "3", call: "Solution().findCircleNum([[1,0,0],[0,1,0],[0,0,1]])" }
    ]
  },

  // ------------------------------------------------------------------------
  // Module 9: Linked Lists (ListNode Boilerplate)
  // ------------------------------------------------------------------------
  {
    id: "dsa-31",
    module: "Module 9: Linked Lists",
    topic: "31. Reverse Linked List",
    title: "Reverse Linked List",
    lcNum: 206,
    lcSlug: "reverse-linked-list",
    difficulty: "easy",
    cppBridge: "In C++: ListNode* next = curr->next; curr->next = prev; prev = curr; curr = next;. In Python: curr.next, prev, curr = prev, curr, curr.next (simultaneous assignment!).",
    theory: "Python allows simultaneous tuple unpacking assignment: curr.next, prev, curr = prev, curr, curr.next reverses a pointer in one line without temporary variables.",
    pitfalls: "Evaluating order in simultaneous assignment matters: Python evaluates all RHS values first before binding to LHS from left to right.",
    desc: "Given the head of a singly linked list, reverse the list, and return the reversed list.",
    starterCode: `# Definition for singly-linked list.
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        # Write your code here
        pass
`,
    solutionCode: `class Solution:
    def reverseList(self, head: ListNode) -> ListNode:
        prev = None
        curr = head
        while curr:
            curr.next, prev, curr = prev, curr, curr.next
        return prev`,
    testCases: [
      { input: "head = [1,2,3]", expected: "3", call: "h=ListNode(1, ListNode(2, ListNode(3))); Solution().reverseList(h).val" }
    ]
  },
  {
    id: "dsa-32",
    module: "Module 9: Linked Lists",
    topic: "32. Merge Two Sorted Lists",
    title: "Merge Two Sorted Lists",
    lcNum: 21,
    lcSlug: "merge-two-sorted-lists",
    difficulty: "easy",
    cppBridge: "In C++: ListNode dummy(0); ListNode* tail = &dummy;. In Python: dummy = ListNode(0); tail = dummy.",
    theory: "Dummy head nodes simplify edge cases when the new head is not yet determined. Append remaining with tail.next = l1 or l2.",
    pitfalls: "In Python, tail.next = l1 or l2 cleanly links whichever list is non-empty without an if/else block.",
    desc: "Merge two sorted linked lists and return it as a sorted list.",
    starterCode: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

class Solution:
    def mergeTwoLists(self, list1: ListNode, list2: ListNode) -> ListNode:
        # Write your code here using a dummy node
        pass
`,
    solutionCode: `class Solution:
    def mergeTwoLists(self, list1: ListNode, list2: ListNode) -> ListNode:
        dummy = ListNode(0)
        tail = dummy
        while list1 and list2:
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        tail.next = list1 or list2
        return dummy.next`,
    testCases: [
      { input: "[1,3] and [2,4]", expected: "1", call: "l1=ListNode(1, ListNode(3)); l2=ListNode(2, ListNode(4)); Solution().mergeTwoLists(l1, l2).val" }
    ]
  },
  {
    id: "dsa-33",
    module: "Module 9: Linked Lists",
    topic: "33. Linked List Cycle",
    title: "Linked List Cycle (Floyd's Algorithm)",
    lcNum: 141,
    lcSlug: "linked-list-cycle",
    difficulty: "easy",
    cppBridge: "In C++: while(fast && fast->next). In Python: while fast and fast.next: with slow = slow.next and fast = fast.next.next.",
    theory: "Floyd's Tortoise and Hare algorithm detects cycles in O(N) time and O(1) space by comparing object identity (slow is fast).",
    pitfalls: "Compare slow is fast (identity), not slow == fast (value equality).",
    desc: "Given head, the head of a linked list, determine if the linked list has a cycle in it.",
    starterCode: `class ListNode:
    def __init__(self, x):
        self.val = x
        self.next = None

class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        # Write your code here using slow and fast pointers
        pass
`,
    solutionCode: `class Solution:
    def hasCycle(self, head: ListNode) -> bool:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                return True
        return False`,
    testCases: [
      { input: "3 -> 2 -> 0 -> -4 (cycle to pos 1)", expected: "True", call: "n1=ListNode(3); n2=ListNode(2); n3=ListNode(0); n4=ListNode(-4); n1.next=n2; n2.next=n3; n3.next=n4; n4.next=n2; Solution().hasCycle(n1)" },
      { input: "1 -> 2 (no cycle)", expected: "False", call: "n1=ListNode(1); n2=ListNode(2); n1.next=n2; Solution().hasCycle(n1)" }
    ]
  },

  // ------------------------------------------------------------------------
  // Module 10: Bit Manipulation & Fast Math
  // ------------------------------------------------------------------------
  {
    id: "dsa-34",
    module: "Module 10: Bits & Math",
    topic: "34. Single Number (XOR Reduction)",
    title: "Single Number",
    lcNum: 136,
    lcSlug: "single-number",
    difficulty: "easy",
    cppBridge: "In C++: int x = 0; for(int n : nums) x ^= n;. In Python: functools.reduce(lambda x, y: x ^ y, nums) or manual for-loop with ^.",
    theory: "x ^ x = 0 and x ^ 0 = x. XORing all elements eliminates pairs, leaving only the unique element.",
    pitfalls: "Bitwise XOR operator in Python is ^ (not ** which is exponentiation).",
    desc: "Given a non-empty array of integers nums, every element appears twice except for one. Find that single one.",
    starterCode: `class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        # Write your code here using XOR (^)
        pass
`,
    solutionCode: `from functools import reduce

class Solution:
    def singleNumber(self, nums: list[int]) -> int:
        return reduce(lambda x, y: x ^ y, nums)`,
    testCases: [
      { input: "[2,2,1]", expected: "1", call: "Solution().singleNumber([2,2,1])" },
      { input: "[4,1,2,1,2]", expected: "4", call: "Solution().singleNumber([4,1,2,1,2])" }
    ]
  },
  {
    id: "dsa-35",
    module: "Module 10: Bits & Math",
    topic: "35. Bit Counting (.bit_count)",
    title: "Number of 1 Bits",
    lcNum: 191,
    lcSlug: "number-of-1-bits",
    difficulty: "easy",
    cppBridge: "In C++: __builtin_popcount(n). In Python: n.bit_count() (Python 3.10+) or while n: n &= n - 1; count += 1.",
    theory: "int.bit_count() returns number of set bits in constant time. Brian Kernighan's n &= n - 1 clears the lowest set bit.",
    pitfalls: "bin(n).count('1') is also common in Python, but n.bit_count() is faster and native.",
    desc: "Write a function that takes the binary representation of a positive integer and returns the number of set bits ('1's).",
    starterCode: `class Solution:
    def hammingWeight(self, n: int) -> int:
        # Write your code here (e.g. n.bit_count())
        pass
`,
    solutionCode: `class Solution:
    def hammingWeight(self, n: int) -> int:
        return n.bit_count()`,
    testCases: [
      { input: "n = 11 (binary 1011)", expected: "3", call: "Solution().hammingWeight(11)" },
      { input: "n = 128 (binary 10000000)", expected: "1", call: "Solution().hammingWeight(128)" }
    ]
  },
  {
    id: "dsa-36",
    module: "Module 10: Bits & Math",
    topic: "36. Binary Exponentiation (Pow)",
    title: "Pow(x, n)",
    lcNum: 50,
    lcSlug: "powx-n",
    difficulty: "medium",
    cppBridge: "In C++: handling INT_MIN overflow when negating n. In Python: Python handles arbitrary precision integers automatically!",
    theory: "Binary exponentiation computes x^n in O(log n) time. If n < 0, compute (1/x)^(-n).",
    pitfalls: "Never worry about integer overflow when negating negative n in Python.",
    desc: "Implement pow(x, n), which calculates x raised to the power n (i.e., x^n).",
    starterCode: `class Solution:
    def myPow(self, x: float, n: int) -> float:
        # Write your code here using binary exponentiation
        pass
`,
    solutionCode: `class Solution:
    def myPow(self, x: float, n: int) -> float:
        if n == 0: return 1.0
        if n < 0:
            x = 1 / x
            n = -n
        res = 1.0
        while n > 0:
            if n % 2 == 1:
                res *= x
            x *= x
            n //= 2
        return res`,
    testCases: [
      { input: "x = 2.0, n = 10", expected: "1024.0", call: "Solution().myPow(2.0, 10)" },
      { input: "x = 2.0, n = -2", expected: "0.25", call: "Solution().myPow(2.0, -2)" }
    ]
  },

  // ------------------------------------------------------------------------
  // Module 11: Policy-Based Data Structure (PBDS) / Order Statistics
  // ------------------------------------------------------------------------
  {
    id: "dsa-37",
    module: "Module 11: PBDS / Order Statistics",
    topic: "37. PBDS with SortedList",
    title: "Order Statistics & Rank Queries (PBDS)",
    difficulty: "medium",
    cppBridge: "In C++: find_by_order(k) and order_of_key(x) from __gnu_pbds. In Python: sl[k] (direct indexing!) and sl.bisect_left(x).",
    theory: "SortedList from sortedcontainers gives true O(log N) order statistics: sl[k] returns the k-th smallest element, and sl.bisect_left(x) returns how many elements are strictly smaller than x.",
    pitfalls: "Direct indexing sl[k] is supported natively by SortedList via its internal B-tree block list.",
    desc: "Implement a DynamicRankTracker that supports add(x), find_kth(k) (0-indexed k-th smallest), and count_smaller(x).",
    starterCode: `from sortedcontainers import SortedList

class DynamicRankTracker:
    def __init__(self):
        # Initialize self.sl = SortedList()
        pass

    def add(self, x: int) -> None:
        # sl.add(x)
        pass

    def find_kth(self, k: int) -> int:
        # Return k-th smallest element (sl[k])
        pass

    def count_smaller(self, x: int) -> int:
        # Return count of elements strictly smaller than x (sl.bisect_left(x))
        pass
`,
    solutionCode: `from sortedcontainers import SortedList

class DynamicRankTracker:
    def __init__(self):
        self.sl = SortedList()

    def add(self, x: int) -> None:
        self.sl.add(x)

    def find_kth(self, k: int) -> int:
        return self.sl[k]

    def count_smaller(self, x: int) -> int:
        return self.sl.bisect_left(x)`,
    testCases: [
      { input: "add [10, 20, 30, 40], find_kth(2), count_smaller(25)", expected: "[30, 2]", call: "t=DynamicRankTracker(); [t.add(x) for x in [10,20,30,40]]; [t.find_kth(2), t.count_smaller(25)]" }
    ]
  }
];

