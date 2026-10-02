// ==========================================================================
// Track 2: Python Language Internals & OA Theory Traps
// High-frequency multiple-choice, code output, and debugging questions
// ==========================================================================

window.TRACK_2_THEORY = [
  // ------------------------------------------------------------------------
  // Module 9: Mutability, Tuples, Identity & Memory
  // ------------------------------------------------------------------------
  {
    id: "theory-1",
    module: "Module 9: Memory & Mutability",
    topic: "33. Tuples vs. Lists (The Deep Dive)",
    title: "Tuple Hashability & Dict Keys Trap",
    difficulty: "medium",
    concept: `Tuples are immutable; lists are mutable. 
Key OA Rule: A tuple is hashable and can be used as a dictionary key IF AND ONLY IF all elements inside it are also hashable.
Also watch out for single-element tuples: (1) is an int! You must write (1,) with a trailing comma.`,
    codeSnippet: `d = {}
t1 = (1, 2)
d[t1] = "valid"

# Can we do this?
t2 = (1, [2, 3])
try:
    d[t2] = "invalid"
except TypeError as e:
    print("Caught:", type(e).__name__)

x = (42)
y = (42,)
print(type(x).__name__, type(y).__name__)`,
    quiz: {
      question: "What will happen if we try to use `t = (1, 2, [3, 4])` as a key in a Python dictionary?",
      options: [
        "It works normally because tuples are immutable",
        "Raises a TypeError: unhashable type: 'list'",
        "The list inside is automatically converted to a tuple",
        "It compiles but causes a KeyError on lookup"
      ],
      correctIndex: 1,
      explanation: "A tuple is only hashable if all of its members are hashable. Since a list is mutable (and unhashable), a tuple containing a list cannot produce a persistent hash value and raises a TypeError."
    },
    starterCode: `# Run this to explore tuple memory footprint and hashability
import sys

t = (1, 2, 3)
lst = [1, 2, 3]

print(f"Tuple size: {sys.getsizeof(t)} bytes")
print(f"List size:  {sys.getsizeof(lst)} bytes")

# Test dictionary key
d = {}
d[(1, 2)] = "Works!"
print("Dict with tuple key:", d)
`
  },
  {
    id: "theory-2",
    module: "Module 9: Memory & Mutability",
    topic: "34. Pass-by-Object-Reference",
    title: "In-Place Mutation vs Variable Reassignment",
    difficulty: "easy",
    concept: `Python evaluates arguments by 'call-by-object-reference'. 
If you modify a mutable object in-place (e.g. lst.append(x) or lst[0] = 5), the caller's object is changed.
If you reassign the reference (e.g. lst = [10, 20]), the local variable points to a new object, leaving the caller untouched.`,
    codeSnippet: `def modify(a, b):
    a.append(4)   # Mutates original list in-place
    b = b + [4]   # Creates a brand new list and reassigns local 'b'

nums1 = [1, 2, 3]
nums2 = [1, 2, 3]
modify(nums1, nums2)
print("nums1:", nums1)
print("nums2:", nums2)`,
    quiz: {
      question: "After executing `modify(nums1, nums2)` above, what are the contents of nums1 and nums2?",
      options: [
        "nums1: [1, 2, 3, 4] and nums2: [1, 2, 3, 4]",
        "nums1: [1, 2, 3, 4] and nums2: [1, 2, 3]",
        "nums1: [1, 2, 3] and nums2: [1, 2, 3, 4]",
        "nums1: [1, 2, 3] and nums2: [1, 2, 3]"
      ],
      correctIndex: 1,
      explanation: "`a.append(4)` mutates the underlying list object in memory, so nums1 reflects the change. `b = b + [4]` creates a new list and reassigns the local identifier 'b', leaving the caller's nums2 reference untouched."
    },
    starterCode: `def modify(a, b):
    a.append(4)
    b = b + [4]

x = [1, 2, 3]
y = [1, 2, 3]
modify(x, y)
print("x:", x)
print("y:", y)
`
  },
  {
    id: "theory-3",
    module: "Module 9: Memory & Mutability",
    topic: "35. Shallow Copy vs. Deep Copy",
    title: "Nested Lists and Copy Semantics",
    difficulty: "medium",
    concept: `copy.copy() creates a new top-level container, but copies references to the nested objects.
copy.deepcopy() recursively copies all nested containers. Slicing arr[:] is always a SHALLOW copy!`,
    codeSnippet: `import copy

original = [[1, 2], [3, 4]]
shallow = copy.copy(original)
deep = copy.deepcopy(original)

shallow[0][0] = 99
deep[1][1] = 88

print("original[0][0]:", original[0][0])
print("original[1][1]:", original[1][1])`,
    quiz: {
      question: "In the snippet above, what does `original[0][0]` evaluate to?",
      options: [
        "1 (unmodified)",
        "99 (modified via shallow copy)",
        "88",
        "Raises an AttributeError"
      ],
      correctIndex: 1,
      explanation: "Because `shallow` is a shallow copy, `shallow[0]` points to the exact same list in memory as `original[0]`. Modifying `shallow[0][0]` directly alters `original[0][0]`."
    },
    starterCode: `import copy

a = [[1, 2], [3, 4]]
b = copy.copy(a)
b[0][0] = 999
print("Did original change?", a[0][0] == 999)
`
  },
  {
    id: "theory-4",
    module: "Module 9: Memory & Mutability",
    topic: "36. Identity (is) vs Equality (==)",
    title: "Small Integer Interning & Object Identity",
    difficulty: "medium",
    concept: `== checks value equality (calls __eq__).
'is' checks object identity (checks if id(a) == id(b)).
CPython pre-allocates and caches (interns) small integers from -5 to 256. Beyond 256, integers are created as distinct heap objects.`,
    codeSnippet: `x = 256
y = 256
print("256 is 256:", x is y)

a = 257
b = 257
print("257 is 257:", a is b)
print("257 == 257:", a == b)`,
    quiz: {
      question: "In standard CPython interactive shell, why does `256 is 256` evaluate to True while `257 is 257` may evaluate to False?",
      options: [
        "256 is a power of 2, so it has special bitwise storage",
        "CPython interns integers in the range [-5, 256] as singleton memory objects",
        "'is' only works for single-byte numbers",
        "It is undefined behavior in Python"
      ],
      correctIndex: 1,
      explanation: "CPython maintains an array of integer objects for all integers between -5 and 256. Whenever you reference an int in that range, you get back a reference to the existing singleton."
    },
    starterCode: `x = 256
y = 256
print(f"id(x)={id(x)}, id(y)={id(y)}, is={x is y}")

p = 1000
q = 1000
print(f"id(p)={id(p)}, id(q)={id(q)}, is={p is q}")
`
  },
  {
    id: "theory-5",
    module: "Module 9: Memory & Mutability",
    topic: "37. Default Mutable Argument Trap",
    title: "Why def f(val, L=[]) Persists Across Calls",
    difficulty: "hard",
    concept: `In Python, default argument values are evaluated ONCE at function definition time, NOT each time the function is called!
If the default argument is mutable (like a list or dict), every subsequent call that uses the default shares that same single object.
Fix: def f(val, L=None): if L is None: L = []`,
    codeSnippet: `def append_item(val, L=[]):
    L.append(val)
    return L

print(append_item(1))
print(append_item(2))
print(append_item(3))`,
    quiz: {
      question: "What will `print(append_item(2))` output when called for the second time in the snippet above?",
      options: [
        "[2]",
        "[1, 2]",
        "[[1], [2]]",
        "Raises an UnboundLocalError"
      ],
      correctIndex: 1,
      explanation: "Since the default list `L` was created at definition time, the first call mutated it to `[1]`. The second call appends to that same persistent list, resulting in `[1, 2]`."
    },
    starterCode: `# The buggy version
def buggy(val, L=[]):
    L.append(val)
    return L

print("Buggy call 1:", buggy(1))
print("Buggy call 2:", buggy(2))

# The Pythonic fix
def correct(val, L=None):
    if L is None:
        L = []
    L.append(val)
    return L

print("Correct call 1:", correct(1))
print("Correct call 2:", correct(2))
`
  },

  // ------------------------------------------------------------------------
  // Module 10: Functions, Scopes, Closures & Decorators
  // ------------------------------------------------------------------------
  {
    id: "theory-6",
    module: "Module 10: Scopes & Functions",
    topic: "38. LEGB Scope & nonlocal vs global",
    title: "Variable Scoping and State in Nested Functions",
    difficulty: "medium",
    concept: `Python resolves variable names using the LEGB rule: Local -> Enclosing -> Global -> Built-in.
If you assign to a variable inside a function without declaring 'global' or 'nonlocal', Python marks it as Local to that function.
'nonlocal' allows mutating an enclosing (outer function's) variable without making it global.`,
    codeSnippet: `x = 10
def outer():
    x = 20
    def inner():
        nonlocal x
        x += 5
    inner()
    print("outer x:", x)

outer()
print("global x:", x)`,
    quiz: {
      question: "What does the code above output for `outer x` and `global x`?",
      options: [
        "outer x: 25, global x: 10",
        "outer x: 20, global x: 15",
        "outer x: 25, global x: 15",
        "Raises an UnboundLocalError"
      ],
      correctIndex: 0,
      explanation: "`nonlocal x` modifies the `x` in `outer()`'s enclosing scope from 20 to 25. It does not affect the module-level `global x` (which remains 10)."
    },
    starterCode: `count = 0
def counter():
    val = 0
    def inc():
        nonlocal val
        val += 1
        return val
    return inc

c = counter()
print(c(), c(), c())
`
  },
  {
    id: "theory-7",
    module: "Module 10: Scopes & Functions",
    topic: "39. *args, **kwargs & Unpacking",
    title: "Extended Unpacking & Keyword-Only Arguments",
    difficulty: "easy",
    concept: `*args collects positional arguments into a tuple.
**kwargs collects keyword arguments into a dictionary.
Keyword-only arguments: def func(a, *, b): enforces that 'b' must be passed as a named keyword argument.
Extended iterable unpacking: first, *middle, last = [1, 2, 3, 4, 5].`,
    codeSnippet: `def configure(mode, *, timeout=30, debug=False):
    return f"{mode}: timeout={timeout}, debug={debug}"

first, *rest, last = [1, 2, 3, 4, 5]
print("first:", first)
print("rest:", rest)
print("last:", last)`,
    quiz: {
      question: "Given `def f(a, *, b): return a + b`, which call is valid?",
      options: [
        "f(1, 2)",
        "f(1, b=2)",
        "f(a=1, 2)",
        "f(1, *[2])"
      ],
      correctIndex: 1,
      explanation: "The bare `*` syntax enforces that all parameters following it are 'keyword-only', meaning they cannot be supplied as positional arguments."
    },
    starterCode: `a, *mid, b = [10, 20, 30, 40, 50]
print("a:", a)
print("mid:", mid)
print("b:", b)
`
  },
  {
    id: "theory-8",
    module: "Module 10: Scopes & Functions",
    topic: "40. Iterators vs. Generators & yield",
    title: "Lazy Evaluation & Memory Optimization",
    difficulty: "medium",
    concept: `Generators produce items one at a time using 'yield' instead of holding the entire dataset in RAM.
A generator expression (x for x in range(10**7)) consumes ~100 bytes of memory; a list comprehension [x for x in range(10**7)] consumes hundreds of megabytes.`,
    codeSnippet: `import sys

gen = (x * x for x in range(1000000))
lst = [x * x for x in range(1000000)]

print("Generator memory:", sys.getsizeof(gen), "bytes")
print("List memory:     ", sys.getsizeof(lst), "bytes")`,
    quiz: {
      question: "What happens when a generator function hits a `yield` statement?",
      options: [
        "The function terminates permanently and returns the value",
        "It pauses its state, yields the value, and can be resumed on the next `__next__()` call",
        "It spawns a background thread to calculate the next value",
        "It raises a StopIteration exception"
      ],
      correctIndex: 1,
      explanation: "A generator function maintains its entire local execution frame across yields. Calling next() resumes execution directly after the yield."
    },
    starterCode: `def fib_stream():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

gen = fib_stream()
first_10 = [next(gen) for _ in range(10)]
print("First 10 Fib numbers:", first_10)
`
  },
  {
    id: "theory-9",
    module: "Module 10: Scopes & Functions",
    topic: "41. Closures & Custom Decorators",
    title: "Writing Production-Grade Decorators with @wraps",
    difficulty: "hard",
    concept: `A decorator is a callable that takes a function and returns a wrapped function.
Always use @functools.wraps(func) inside your decorator; otherwise, the original function's name (__name__) and docstring (__doc__) are overwritten by the wrapper.`,
    codeSnippet: `from functools import wraps

def audit_log(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        print(f"Calling: {func.__name__}")
        return func(*args, **kwargs)
    return wrapper

@audit_log
def calculate_tax(amount):
    """Calculates state tax."""
    return amount * 0.08

print("Function name:", calculate_tax.__name__)
print("Tax on 100:", calculate_tax(100))`,
    quiz: {
      question: "What is the primary purpose of applying `@wraps(func)` to the inner wrapper function of a decorator?",
      options: [
        "It makes the function run concurrently in a separate thread",
        "It preserves the original function's metadata (__name__, __doc__, annotations)",
        "It automatically memoizes return values",
        "It prevents syntax errors when passing *args and **kwargs"
      ],
      correctIndex: 1,
      explanation: "Without `@wraps`, the decorated function would have its `__name__` set to 'wrapper' and its docstrings wiped out, breaking introspection and documentation tools."
    },
    starterCode: `from functools import wraps

def repeat_twice(func):
    @wraps(func)
    def wrapper(*args, **kwargs):
        func(*args, **kwargs)
        return func(*args, **kwargs)
    return wrapper

@repeat_twice
def greet(name):
    print(f"Hello, {name}!")

greet("Antigravity")
`
  },
  {
    id: "theory-10",
    module: "Module 10: Scopes & Functions",
    topic: "42. try / except / else / finally Flow",
    title: "The Guaranteed Execution of 'finally'",
    difficulty: "medium",
    concept: `Flow order:
try -> (if error) except -> (if no error) else -> finally (ALWAYS runs).
Even if you execute an explicit 'return' statement inside try or except, the 'finally' block STILL executes before the function actually exits!`,
    codeSnippet: `def test_flow():
    try:
        print("1. Inside try")
        return "TRY_RETURN"
    finally:
        print("2. Inside finally")

res = test_flow()
print("3. Return value received:", res)`,
    quiz: {
      question: "In what exact order do the print statements execute in the snippet above?",
      options: [
        "1, 3, 2",
        "1, 2, 3",
        "2, 1, 3",
        "3, 1, 2"
      ],
      correctIndex: 1,
      explanation: "Even though `return` is reached inside `try`, Python defers the return, executes the `finally` block first (printing 2), and only then hands the return value back to the caller (printing 3)."
    },
    starterCode: `def demo(should_raise):
    try:
        if should_raise:
            raise ValueError("Something broke")
        return "SUCCESS"
    except ValueError as e:
        return f"HANDLED: {e}"
    finally:
        print("Cleanup in finally")

print("Result 1:", demo(False))
print("Result 2:", demo(True))
`
  },

  // ------------------------------------------------------------------------
  // Module 11: OOP, Dunder Methods & Runtime/GIL
  // ------------------------------------------------------------------------
  {
    id: "theory-11",
    module: "Module 11: OOP & Runtime",
    topic: "43. Dunder Methods (__repr__, __eq__, __hash__)",
    title: "Making Custom Classes Usable in Sets & Dicts",
    difficulty: "hard",
    concept: `To store instances of custom classes in a set or use them as dict keys:
1. Implement __eq__(self, other): determines when two objects have equal values.
2. Implement __hash__(self): must return an integer; if a == b, then hash(a) MUST equal hash(b).
If you implement __eq__ without __hash__, Python sets __hash__ = None (making the class unhashable!).`,
    codeSnippet: `class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return isinstance(other, Point) and self.x == other.x and self.y == other.y

    def __hash__(self):
        return hash((self.x, self.y))

    def __repr__(self):
        return f"Point({self.x}, {self.y})"

p1 = Point(1, 2)
p2 = Point(1, 2)
point_set = {p1, p2}
print("Set length:", len(point_set))  # 1 because they are equal and share hash!`,
    quiz: {
      question: "What happens if a custom class implements `__eq__` but does NOT implement `__hash__`?",
      options: [
        "Python falls back to object memory address id() for the hash",
        "Python automatically sets `__hash__ = None`, making instances unhashable (TypeError on set.add)",
        "The object becomes mutable",
        "It compiles and works identically to implementing both"
      ],
      correctIndex: 1,
      explanation: "Python prevents subtle bugs: if two objects are equal according to `__eq__`, their hashes must match. If you override `__eq__`, Python explicitly marks `__hash__ = None` until you provide a matching `__hash__` implementation."
    },
    starterCode: `class Node:
    def __init__(self, val):
        self.val = val
    def __eq__(self, other):
        return self.val == other.val
    def __hash__(self):
        return hash(self.val)

s = {Node(5), Node(5)}
print("Number of unique nodes in set:", len(s))
`
  },
  {
    id: "theory-12",
    module: "Module 11: OOP & Runtime",
    topic: "44. @classmethod vs @staticmethod",
    title: "Factory Methods and Static Namespaces",
    difficulty: "easy",
    concept: `Instance Method: Receives 'self' (the specific instance).
@classmethod: Receives 'cls' (the class itself). Commonly used for alternative constructors / factory methods.
@staticmethod: Receives neither 'self' nor 'cls'. Plain functions housed inside the class namespace.`,
    codeSnippet: `class Date:
    def __init__(self, year, month, day):
        self.year = year
        self.month = month
        self.day = day

    @classmethod
    def from_string(cls, date_str):  # Factory method
        y, m, d = map(int, date_str.split('-'))
        return cls(y, m, d)

    @staticmethod
    def is_valid_year(year):
        return 1900 <= year <= 2100

d = Date.from_string("2026-10-01")
print(d.year, d.month, d.day)`,
    quiz: {
      question: "What is the primary architectural advantage of a `@classmethod` over a `@staticmethod` for factory methods?",
      options: [
        "Class methods run twice as fast",
        "Class methods receive `cls`, allowing correct instantiation in subclasses (polymorphic instantiation)",
        "Class methods do not require importing functools",
        "Static methods cannot return objects"
      ],
      correctIndex: 1,
      explanation: "When a subclass inherits a `@classmethod` factory method, `cls` references the subclass itself rather than the parent, correctly creating subclass instances."
    },
    starterCode: `class MathUtil:
    @staticmethod
    def add(a, b):
        return a + b

print(MathUtil.add(3, 7))
`
  },
  {
    id: "theory-13",
    module: "Module 11: OOP & Runtime",
    topic: "45. The GIL (Global Interpreter Lock)",
    title: "CPU-Bound vs. I/O-Bound Concurrency",
    difficulty: "hard",
    concept: `The GIL is a mutex in CPython that allows only ONE native thread to execute Python bytecode at any given moment.
- CPU-bound tasks: Using 'threading' will NOT utilize multiple CPU cores and may even run slower due to thread context-switching overhead. Use 'multiprocessing' instead!
- I/O-bound tasks: (network requests, database calls) release the GIL while waiting; 'threading' and 'asyncio' give real concurrent speedups.`,
    codeSnippet: `# Concurrency guidelines in Python:
# CPU-bound (number crunching, matrix mult): multiprocessing
# I/O-bound (web scraping, API calls): threading or asyncio
import multiprocessing
print("CPU count available for multiprocessing:", multiprocessing.cpu_count())`,
    quiz: {
      question: "Why does multi-threaded CPU-heavy code in standard CPython fail to utilize 100% of multiple CPU cores?",
      options: [
        "Python threads are green threads and not OS threads",
        "The Global Interpreter Lock (GIL) serializes bytecode execution across threads",
        "CPython disables hyperthreading at compile time",
        "Operating system thread schedulers prioritize C programs"
      ],
      correctIndex: 1,
      explanation: "CPython's memory management is not thread-safe. To prevent race conditions on reference counts, the GIL enforces that only one thread executes Python bytecode at a time."
    },
    starterCode: `import sys
print("Python Version:", sys.version)
print("CPython platform:", sys.platform)
`
  },
  {
    id: "theory-14",
    module: "Module 11: OOP & Runtime",
    topic: "46. Garbage Collection (Ref Counting + Cyclic GC)",
    title: "How CPython Frees Memory",
    difficulty: "medium",
    concept: `CPython uses two complementary GC mechanisms:
1. Reference Counting (Primary): Each object has an ob_refcnt. When refcount hits 0, it is deallocated immediately.
2. Generational Cyclic GC (Secondary, via 'gc' module): Detects and collects circular reference islands (e.g. node.next = other; other.prev = node) that reference counting alone cannot reclaim.`,
    codeSnippet: `import sys

a = []
print("Initial refcount:", sys.getrefcount(a))  # Note: getrefcount adds 1 temporary ref
b = a
print("After assignment:", sys.getrefcount(a))`,
    quiz: {
      question: "What handles the collection of self-referencing circular data structures in CPython when their external references drop to zero?",
      options: [
        "The standard reference counter",
        "The generational cyclic garbage collector (`gc` module)",
        "The operating system virtual memory pager",
        "They leak indefinitely until program termination"
      ],
      correctIndex: 1,
      explanation: "Circular references maintain non-zero reference counts even after all external variables are gone. CPython's generational cyclic GC runs periodically to identify and destroy isolated cyclic clusters."
    },
    starterCode: `import gc
print("Is garbage collection enabled?", gc.isenabled())
print("GC thresholds (generations 0, 1, 2):", gc.get_threshold())
`
  }
];
