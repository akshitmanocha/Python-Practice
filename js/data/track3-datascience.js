// ==========================================================================
// Track 3: Machine Learning, Data Science & Feature Engineering
// Pure syntax drills (No complex logic - pure API muscle memory)
// Covering: Pandas (Exhaustive), Scikit-Learn, SciPy, NumPy
// ==========================================================================

window.TRACK_3_DATASCIENCE = [
  // ========================================================================
  // Section 1: Pandas Fundamentals & Indexing
  // ========================================================================
  {
    id: "ds-1",
    module: "1. Pandas Selection & Indexing",
    topic: "1. DataFrame Creation",
    title: "Create DataFrame from Dict",
    difficulty: "easy",
    cppBridge: "std::map<string, vector<T>> -> pd.DataFrame(data).",
    theory: "pd.DataFrame(data) creates a 2D tabular structure with labeled axes (rows and columns).",
    desc: "Given a dictionary with keys 'city' and 'pop', return a pandas DataFrame.",
    starterCode: `import pandas as pd

def create_df(data: dict) -> pd.DataFrame:
    # Use pd.DataFrame(data)
    pass
`,
    solutionCode: `import pandas as pd

def create_df(data: dict) -> pd.DataFrame:
    return pd.DataFrame(data)`,
    testCases: [
      { input: "{'city': ['NY', 'SF'], 'pop': [8, 1]}", expected: "['city', 'pop']", call: "list(create_df({'city': ['NY', 'SF'], 'pop': [8, 1]}).columns)" }
    ]
  },
  {
    id: "ds-2",
    module: "1. Pandas Selection & Indexing",
    topic: "2. Column Selection",
    title: "Select Specific Columns",
    difficulty: "easy",
    cppBridge: "Select specific fields from struct vector. In Pandas: df[['col1', 'col2']].",
    theory: "Single brackets df['col'] returns a Series; double brackets df[['col1', 'col2']] returns a DataFrame.",
    desc: "Select and return only the 'name' and 'score' columns from the input DataFrame.",
    starterCode: `import pandas as pd

def select_columns(df: pd.DataFrame) -> pd.DataFrame:
    # Return df[['name', 'score']]
    pass
`,
    solutionCode: `import pandas as pd

def select_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df[['name', 'score']]`,
    testCases: [
      { input: "df with columns ['id', 'name', 'score']", expected: "['name', 'score']", call: "list(select_columns(pd.DataFrame({'id':[1], 'name':['Alice'], 'score':[95]})).columns)" }
    ]
  },
  {
    id: "ds-3",
    module: "1. Pandas Selection & Indexing",
    topic: "3. loc Indexing (Label-based)",
    title: "Filter Rows & Select Columns with .loc",
    difficulty: "easy",
    cppBridge: "In C++: iterators or loop if. In Pandas: df.loc[condition, ['col1', 'col2']].",
    theory: "df.loc[row_condition, col_selection] provides label-based indexing. End labels are INCLUSIVE.",
    desc: "Using .loc, filter rows where age >= 30 and return only the 'salary' column.",
    starterCode: `import pandas as pd

def filter_with_loc(df: pd.DataFrame) -> pd.Series:
    # Use df.loc[df['age'] >= 30, 'salary']
    pass
`,
    solutionCode: `import pandas as pd

def filter_with_loc(df: pd.DataFrame) -> pd.Series:
    return df.loc[df['age'] >= 30, 'salary']`,
    testCases: [
      { input: "df = pd.DataFrame({'age': [25, 30, 35], 'salary': [50, 70, 90]})", expected: "[70, 90]", call: "list(filter_with_loc(pd.DataFrame({'age': [25, 30, 35], 'salary': [50, 70, 90]})))" }
    ]
  },
  {
    id: "ds-4",
    module: "1. Pandas Selection & Indexing",
    topic: "4. iloc Indexing (Position-based)",
    title: "Positional Slicing with .iloc",
    difficulty: "easy",
    cppBridge: "Standard 0-based vector slicing. In Pandas: df.iloc[row_start:row_end, col_start:col_end].",
    theory: "df.iloc is purely integer position-based (0 to length - 1). Slices follow standard Python exclusive end rules.",
    desc: "Using .iloc, return the first 3 rows and the first 2 columns of the DataFrame.",
    starterCode: `import pandas as pd

def slice_with_iloc(df: pd.DataFrame) -> pd.DataFrame:
    # Return df.iloc[0:3, 0:2]
    pass
`,
    solutionCode: `import pandas as pd

def slice_with_iloc(df: pd.DataFrame) -> pd.DataFrame:
    return df.iloc[0:3, 0:2]`,
    testCases: [
      { input: "5x4 matrix", expected: "(3, 2)", call: "str(slice_with_iloc(pd.DataFrame([[1,2,3,4]]*5)).shape)" }
    ]
  },
  {
    id: "ds-5",
    module: "1. Pandas Selection & Indexing",
    topic: "5. Compound Boolean Filter",
    title: "Bitwise Masking (& | ~)",
    difficulty: "easy",
    cppBridge: "if (a > 10 && b < 20). In Pandas: df[(df['a'] > 10) & (df['b'] < 20)].",
    theory: "Bitwise & and | must be used instead of 'and' / 'or'. Each sub-expression MUST be wrapped in parentheses.",
    desc: "Return rows where status == 'active' AND score >= 80.",
    starterCode: `import pandas as pd

def compound_filter(df: pd.DataFrame) -> pd.DataFrame:
    # Use (df['status'] == 'active') & (df['score'] >= 80)
    pass
`,
    solutionCode: `import pandas as pd

def compound_filter(df: pd.DataFrame) -> pd.DataFrame:
    return df[(df['status'] == 'active') & (df['score'] >= 80)]`,
    testCases: [
      { input: "DataFrame with active/inactive & scores", expected: "['Alice']", call: "list(compound_filter(pd.DataFrame({'name':['Alice','Bob','Charlie'], 'status':['active','active','inactive'], 'score':[90, 70, 95]}))['name'])" }
    ]
  },
  {
    id: "ds-6",
    module: "1. Pandas Selection & Indexing",
    topic: "6. Renaming Columns",
    title: "Rename Columns with Dictionary",
    difficulty: "easy",
    cppBridge: "Field renaming. In Pandas: df.rename(columns={'old': 'new'}).",
    theory: "df.rename(columns={'old_name': 'new_name'}) returns a new DataFrame with updated column titles.",
    desc: "Rename column 'yr' to 'year' and 'val' to 'value'.",
    starterCode: `import pandas as pd

def rename_cols(df: pd.DataFrame) -> pd.DataFrame:
    # Use df.rename(columns={...})
    pass
`,
    solutionCode: `import pandas as pd

def rename_cols(df: pd.DataFrame) -> pd.DataFrame:
    return df.rename(columns={'yr': 'year', 'val': 'value'})`,
    testCases: [
      { input: "columns ['yr', 'val']", expected: "['year', 'value']", call: "list(rename_cols(pd.DataFrame({'yr':[2020], 'val':[100]})).columns)" }
    ]
  },
  {
    id: "ds-7",
    module: "1. Pandas Selection & Indexing",
    topic: "7. Dropping Columns & Rows",
    title: "Drop Unwanted Columns with .drop()",
    difficulty: "easy",
    cppBridge: "Erasing vector keys. In Pandas: df.drop(columns=['col1', 'col2']).",
    theory: "df.drop(columns=['col_name']) drops specified columns. Use axis=1 or columns=.",
    desc: "Drop the columns 'temp' and 'flag' from the DataFrame.",
    starterCode: `import pandas as pd

def drop_columns(df: pd.DataFrame) -> pd.DataFrame:
    # Use df.drop(columns=['temp', 'flag'])
    pass
`,
    solutionCode: `import pandas as pd

def drop_columns(df: pd.DataFrame) -> pd.DataFrame:
    return df.drop(columns=['temp', 'flag'])`,
    testCases: [
      { input: "cols ['id', 'temp', 'flag']", expected: "['id']", call: "list(drop_columns(pd.DataFrame({'id':[1], 'temp':[20], 'flag':[True]})).columns)" }
    ]
  },
  {
    id: "ds-8",
    module: "1. Pandas Selection & Indexing",
    topic: "8. Sorting Values",
    title: "Sort DataFrame by Multiple Columns",
    difficulty: "easy",
    cppBridge: "std::sort with lambda. In Pandas: df.sort_values(by=['col1', 'col2'], ascending=[True, False]).",
    theory: "df.sort_values(by=..., ascending=...) sorts tabular data stably.",
    desc: "Sort the DataFrame by 'dept' ascending, and then by 'salary' descending.",
    starterCode: `import pandas as pd

def sort_by_dept_salary(df: pd.DataFrame) -> pd.DataFrame:
    # Use df.sort_values(by=['dept', 'salary'], ascending=[True, False])
    pass
`,
    solutionCode: `import pandas as pd

def sort_by_dept_salary(df: pd.DataFrame) -> pd.DataFrame:
    return df.sort_values(by=['dept', 'salary'], ascending=[True, False])`,
    testCases: [
      { input: "depts and salaries", expected: "[90, 70]", call: "list(sort_by_dept_salary(pd.DataFrame({'dept':['IT','IT'], 'salary':[70, 90]}))['salary'])" }
    ]
  },
  {
    id: "ds-9",
    module: "1. Pandas Selection & Indexing",
    topic: "9. Value Counts & Distincts",
    title: "Count Frequencies with .value_counts()",
    difficulty: "easy",
    cppBridge: "unordered_map<T, int> count. In Pandas: df['col'].value_counts().",
    theory: ".value_counts() returns a Series containing counts of unique values in descending order.",
    desc: "Return the frequency counts of the 'category' column.",
    starterCode: `import pandas as pd

def get_freqs(df: pd.DataFrame) -> pd.Series:
    # Return df['category'].value_counts()
    pass
`,
    solutionCode: `import pandas as pd

def get_freqs(df: pd.DataFrame) -> pd.Series:
    return df['category'].value_counts()`,
    testCases: [
      { input: "['A', 'B', 'A', 'A']", expected: "3", call: "int(get_freqs(pd.DataFrame({'category':['A', 'B', 'A', 'A']}))['A'])" }
    ]
  },
  {
    id: "ds-10",
    module: "1. Pandas Selection & Indexing",
    topic: "10. Type Casting (.astype)",
    title: "Cast Column Data Types",
    difficulty: "easy",
    cppBridge: "static_cast<T>. In Pandas: df['col'].astype('int32') or 'float64'.",
    theory: ".astype('int64') converts column types across numerical, string, or category datatypes.",
    desc: "Cast the 'price' column from string to float64.",
    starterCode: `import pandas as pd

def cast_to_float(df: pd.DataFrame) -> pd.DataFrame:
    # Set df['price'] = df['price'].astype('float64')
    pass
`,
    solutionCode: `import pandas as pd

def cast_to_float(df: pd.DataFrame) -> pd.DataFrame:
    df['price'] = df['price'].astype('float64')
    return df`,
    testCases: [
      { input: "['10.5', '20.0']", expected: "float64", call: "str(cast_to_float(pd.DataFrame({'price':['10.5', '20.0']}))['price'].dtype)" }
    ]
  },

  // ========================================================================
  // Section 2: Missing Data & String/Date Operations
  // ========================================================================
  {
    id: "ds-11",
    module: "2. Missing Data & Cleanups",
    topic: "11. Audit Missing Data (.isna)",
    title: "Count Null Values per Column",
    difficulty: "easy",
    cppBridge: "Count nullptrs. In Pandas: df.isna().sum().",
    theory: "df.isna() returns boolean DataFrame; chained with .sum() it gives count of missing entries per column.",
    desc: "Return a Series indicating the number of missing (NaN) values in each column.",
    starterCode: `import pandas as pd

def count_missing(df: pd.DataFrame) -> pd.Series:
    # Use df.isna().sum()
    pass
`,
    solutionCode: `import pandas as pd

def count_missing(df: pd.DataFrame) -> pd.Series:
    return df.isna().sum()`,
    testCases: [
      { input: "DataFrame with NaNs", expected: "2", call: "int(count_missing(pd.DataFrame({'a':[1, None, None], 'b':[1,2,3]}))['a'])" }
    ]
  },
  {
    id: "ds-12",
    module: "2. Missing Data & Cleanups",
    topic: "12. Fill Missing Values (.fillna)",
    title: "Impute Missing Values with Constant / Median",
    difficulty: "easy",
    cppBridge: "Fallback defaults. In Pandas: df['col'].fillna(val).",
    theory: ".fillna(value) replaces all NaN values in a column or DataFrame with the given value.",
    desc: "Fill all missing values in the 'age' column with its median.",
    starterCode: `import pandas as pd

def fill_age_median(df: pd.DataFrame) -> pd.DataFrame:
    # Fill df['age'] with df['age'].median()
    pass
`,
    solutionCode: `import pandas as pd

def fill_age_median(df: pd.DataFrame) -> pd.DataFrame:
    df['age'] = df['age'].fillna(df['age'].median())
    return df`,
    testCases: [
      { input: "[20, 30, NaN] (median 25)", expected: "0", call: "int(fill_age_median(pd.DataFrame({'age':[20, 30, None]}))['age'].isna().sum())" }
    ]
  },
  {
    id: "ds-13",
    module: "2. Missing Data & Cleanups",
    topic: "13. Drop Missing Rows (.dropna)",
    title: "Drop Rows with Missing Values in Subset",
    difficulty: "easy",
    cppBridge: "Filter out empty rows. In Pandas: df.dropna(subset=['critical_col']).",
    theory: "df.dropna(subset=['col']) drops any row where the specified column is NaN.",
    desc: "Drop all rows where the 'email' column is NaN.",
    starterCode: `import pandas as pd

def drop_missing_emails(df: pd.DataFrame) -> pd.DataFrame:
    # Use df.dropna(subset=['email'])
    pass
`,
    solutionCode: `import pandas as pd

def drop_missing_emails(df: pd.DataFrame) -> pd.DataFrame:
    return df.dropna(subset=['email'])`,
    testCases: [
      { input: "['a@b.com', None]", expected: "1", call: "len(drop_missing_emails(pd.DataFrame({'email':['a@b.com', None]})))" }
    ]
  },
  {
    id: "ds-14",
    module: "2. Missing Data & Cleanups",
    topic: "14. String Methods (.str.lower & strip)",
    title: "Normalize Text Columns with .str",
    difficulty: "easy",
    cppBridge: "transform(s.begin(), s.end(), ::tolower). In Pandas: df['col'].str.lower().str.strip().",
    theory: "The .str accessor unlocks vectorized string methods without manual loops.",
    desc: "Strip leading/trailing whitespace and convert the 'city' column to lowercase.",
    starterCode: `import pandas as pd

def clean_city_names(df: pd.DataFrame) -> pd.DataFrame:
    # Set df['city'] = df['city'].str.strip().str.lower()
    pass
`,
    solutionCode: `import pandas as pd

def clean_city_names(df: pd.DataFrame) -> pd.DataFrame:
    df['city'] = df['city'].str.strip().str.lower()
    return df`,
    testCases: [
      { input: "['  New York  ']", expected: "['new york']", call: "list(clean_city_names(pd.DataFrame({'city':['  New York  ']}))['city'])" }
    ]
  },
  {
    id: "ds-15",
    module: "2. Missing Data & Cleanups",
    topic: "15. String Filtering (.str.contains)",
    title: "Sub-String Pattern Matching",
    difficulty: "easy",
    cppBridge: "s.find(sub) != string::npos. In Pandas: df['col'].str.contains('keyword', case=False).",
    theory: "df[df['col'].str.contains('pattern')] filters rows where the column contains the substring.",
    desc: "Return rows where the 'job_title' column contains the word 'Engineer' (case-insensitive).",
    starterCode: `import pandas as pd

def filter_engineers(df: pd.DataFrame) -> pd.DataFrame:
    # Use df['job_title'].str.contains('Engineer', case=False)
    pass
`,
    solutionCode: `import pandas as pd

def filter_engineers(df: pd.DataFrame) -> pd.DataFrame:
    return df[df['job_title'].str.contains('Engineer', case=False)]`,
    testCases: [
      { input: "['Software Engineer', 'Product Manager']", expected: "1", call: "len(filter_engineers(pd.DataFrame({'job_title':['Software Engineer', 'Product Manager']})))" }
    ]
  },
  {
    id: "ds-16",
    module: "2. Missing Data & Cleanups",
    topic: "16. DateTime Operations (.dt accessor)",
    title: "Extract Date Parts with .dt",
    difficulty: "easy",
    cppBridge: "std::chrono / tm struct. In Pandas: pd.to_datetime(df['date']).dt.year / month / dayofweek.",
    theory: "Convert to datetime with pd.to_datetime(), then use .dt to extract year, month, day, and dayofweek.",
    desc: "Convert 'date_str' to datetime and create a column 'year' containing the 4-digit year.",
    starterCode: `import pandas as pd

def extract_year(df: pd.DataFrame) -> pd.DataFrame:
    # Convert df['date_str'] with pd.to_datetime and set df['year'] = df['date_str'].dt.year
    pass
`,
    solutionCode: `import pandas as pd

def extract_year(df: pd.DataFrame) -> pd.DataFrame:
    df['date_str'] = pd.to_datetime(df['date_str'])
    df['year'] = df['date_str'].dt.year
    return df`,
    testCases: [
      { input: "['2025-06-15']", expected: "[2025]", call: "list(extract_year(pd.DataFrame({'date_str':['2025-06-15']}))['year'])" }
    ]
  },

  // ========================================================================
  // Section 3: Lambdas, GroupBy & Window Functions
  // ========================================================================
  {
    id: "ds-17",
    module: "3. Lambdas & GroupBy",
    topic: "17. Series.apply with Lambda",
    title: "Apply Custom Lambda to Single Column",
    difficulty: "easy",
    cppBridge: "std::transform with lambda. In Pandas: df['col'].apply(lambda x: ...).",
    theory: "Series.apply(lambda x: ...) executes the lambda element-by-element over a single column.",
    desc: "Use a lambda function with .apply() to square every number in the 'val' column.",
    starterCode: `import pandas as pd

def square_values(df: pd.DataFrame) -> pd.DataFrame:
    # Set df['val'] = df['val'].apply(lambda x: x ** 2)
    pass
`,
    solutionCode: `import pandas as pd

def square_values(df: pd.DataFrame) -> pd.DataFrame:
    df['val'] = df['val'].apply(lambda x: x ** 2)
    return df`,
    testCases: [
      { input: "[3, 4]", expected: "[9, 16]", call: "list(square_values(pd.DataFrame({'val':[3, 4]}))['val'])" }
    ]
  },
  {
    id: "ds-18",
    module: "3. Lambdas & GroupBy",
    topic: "18. DataFrame.apply(axis=1) Row-wise",
    title: "Multi-Column Row Lambda with axis=1",
    difficulty: "medium",
    cppBridge: "Iterating through structs computing composite metric. In Pandas: df.apply(lambda row: ..., axis=1).",
    theory: "axis=1 passes each entire row as a Series to the lambda. Essential when combining multiple columns.",
    desc: "Create a new column 'full_name' by concatenating row['first'] + ' ' + row['last'] using .apply(axis=1).",
    starterCode: `import pandas as pd

def combine_names(df: pd.DataFrame) -> pd.DataFrame:
    # Set df['full_name'] using df.apply with axis=1
    pass
`,
    solutionCode: `import pandas as pd

def combine_names(df: pd.DataFrame) -> pd.DataFrame:
    df['full_name'] = df.apply(lambda row: f"{row['first']} {row['last']}", axis=1)
    return df`,
    testCases: [
      { input: "first=['John'], last=['Doe']", expected: "['John Doe']", call: "list(combine_names(pd.DataFrame({'first':['John'], 'last':['Doe']}))['full_name'])" }
    ]
  },
  {
    id: "ds-19",
    module: "3. Lambdas & GroupBy",
    topic: "19. Series.map with Dictionary",
    title: "Value Mapping with .map()",
    difficulty: "easy",
    cppBridge: "unordered_map lookup replacement. In Pandas: df['col'].map(mapping_dict).",
    theory: "Series.map(dict) maps values according to an input dictionary. Unmatched values become NaN.",
    desc: "Map column 'grade' from ('A', 'B') to ('Excellent', 'Good') using a dictionary and .map().",
    starterCode: `import pandas as pd

def map_grades(df: pd.DataFrame) -> pd.DataFrame:
    mapping = {'A': 'Excellent', 'B': 'Good'}
    # Set df['grade_desc'] = df['grade'].map(mapping)
    pass
`,
    solutionCode: `import pandas as pd

def map_grades(df: pd.DataFrame) -> pd.DataFrame:
    mapping = {'A': 'Excellent', 'B': 'Good'}
    df['grade_desc'] = df['grade'].map(mapping)
    return df`,
    testCases: [
      { input: "['A', 'B']", expected: "['Excellent', 'Good']", call: "list(map_grades(pd.DataFrame({'grade':['A', 'B']}))['grade_desc'])" }
    ]
  },
  {
    id: "ds-20",
    module: "3. Lambdas & GroupBy",
    topic: "20. GroupBy Aggregation (.agg)",
    title: "Multiple Aggregations per Group",
    difficulty: "medium",
    cppBridge: "SQL GROUP BY. In Pandas: df.groupby('dept').agg(avg_sal=('salary', 'mean')).reset_index().",
    theory: "df.groupby('col').agg(name=('col', 'func')) creates clean single-level aggregated columns.",
    desc: "Group by 'dept' and calculate the mean 'salary' and max 'age', returning a reset-index DataFrame.",
    starterCode: `import pandas as pd

def dept_summary(df: pd.DataFrame) -> pd.DataFrame:
    # Use df.groupby('dept').agg(mean_sal=('salary', 'mean'), max_age=('age', 'max')).reset_index()
    pass
`,
    solutionCode: `import pandas as pd

def dept_summary(df: pd.DataFrame) -> pd.DataFrame:
    return df.groupby('dept').agg(mean_sal=('salary', 'mean'), max_age=('age', 'max')).reset_index()`,
    testCases: [
      { input: "dept Eng [100, 120]", expected: "[110.0]", call: "list(dept_summary(pd.DataFrame({'dept':['Eng','Eng'], 'salary':[100, 120], 'age':[25, 35]}))['mean_sal'])" }
    ]
  },
  {
    id: "ds-21",
    module: "3. Lambdas & GroupBy",
    topic: "21. GroupBy .transform()",
    title: "Broadcast Group Statistics to Rows",
    difficulty: "medium",
    cppBridge: "SQL OVER (PARTITION BY). In Pandas: df.groupby('group')['val'].transform('mean').",
    theory: ".transform() returns an object with the same size as the input, broadcasting group metrics without merging.",
    desc: "Add a column 'dept_mean_salary' using df.groupby('dept')['salary'].transform('mean').",
    starterCode: `import pandas as pd

def add_group_mean(df: pd.DataFrame) -> pd.DataFrame:
    # Set df['dept_mean_salary'] using .transform('mean')
    pass
`,
    solutionCode: `import pandas as pd

def add_group_mean(df: pd.DataFrame) -> pd.DataFrame:
    df['dept_mean_salary'] = df.groupby('dept')['salary'].transform('mean')
    return df`,
    testCases: [
      { input: "salaries [40, 60]", expected: "[50.0, 50.0]", call: "list(add_group_mean(pd.DataFrame({'dept':['HR', 'HR'], 'salary':[40, 60]}))['dept_mean_salary'])" }
    ]
  },
  {
    id: "ds-22",
    module: "3. Lambdas & GroupBy",
    topic: "22. Lag Features with .shift()",
    title: "Create Previous-Day Lag Features",
    difficulty: "easy",
    cppBridge: "Accessing previous element in vector. In Pandas: df['col'].shift(1).",
    theory: ".shift(1) shifts data down by 1 row, populating the first row with NaN. Essential for time series.",
    desc: "Create a feature 'prev_val' representing yesterday's value using .shift(1).",
    starterCode: `import pandas as pd

def add_lag(df: pd.DataFrame) -> pd.DataFrame:
    # Set df['prev_val'] = df['val'].shift(1)
    pass
`,
    solutionCode: `import pandas as pd

def add_lag(df: pd.DataFrame) -> pd.DataFrame:
    df['prev_val'] = df['val'].shift(1)
    return df`,
    testCases: [
      { input: "[10, 20, 30]", expected: "[20.0]", call: "list(add_lag(pd.DataFrame({'val':[10, 20, 30]}))['prev_val'].dropna())[1:]" }
    ]
  },
  {
    id: "ds-23",
    module: "3. Lambdas & GroupBy",
    topic: "23. Rolling Windows (.rolling)",
    title: "Moving Averages with .rolling()",
    difficulty: "easy",
    cppBridge: "Sliding window sum. In Pandas: df['val'].rolling(window=3).mean().",
    theory: ".rolling(window=k, min_periods=1).mean() calculates moving statistics over the window.",
    desc: "Calculate a 3-period moving average of 'sales' with min_periods=1.",
    starterCode: `import pandas as pd

def rolling_avg(df: pd.DataFrame) -> pd.DataFrame:
    # Set df['rolling_3'] = df['sales'].rolling(window=3, min_periods=1).mean()
    pass
`,
    solutionCode: `import pandas as pd

def rolling_avg(df: pd.DataFrame) -> pd.DataFrame:
    df['rolling_3'] = df['sales'].rolling(window=3, min_periods=1).mean()
    return df`,
    testCases: [
      { input: "[10, 20, 30]", expected: "[10.0, 15.0, 20.0]", call: "list(rolling_avg(pd.DataFrame({'sales':[10, 20, 30]}))['rolling_3'])" }
    ]
  },

  // ========================================================================
  // Section 4: Merges, Joins & Reshaping
  // ========================================================================
  {
    id: "ds-24",
    module: "4. Merges & Reshaping",
    topic: "24. Merge DataFrames (pd.merge)",
    title: "Left Join on Key Column",
    difficulty: "easy",
    cppBridge: "Hash join between tables. In Pandas: pd.merge(df1, df2, on='key', how='left').",
    theory: "pd.merge() combines DataFrames based on common keys (inner, left, right, outer).",
    desc: "Perform a left join between df1 and df2 on the 'user_id' column.",
    starterCode: `import pandas as pd

def join_users(df1: pd.DataFrame, df2: pd.DataFrame) -> pd.DataFrame:
    # Return pd.merge(df1, df2, on='user_id', how='left')
    pass
`,
    solutionCode: `import pandas as pd

def join_users(df1: pd.DataFrame, df2: pd.DataFrame) -> pd.DataFrame:
    return pd.merge(df1, df2, on='user_id', how='left')`,
    testCases: [
      { input: "df1 (users) + df2 (orders)", expected: "['user_id', 'name', 'order_val']", call: "list(join_users(pd.DataFrame({'user_id':[1], 'name':['A']}), pd.DataFrame({'user_id':[1], 'order_val':[99]})).columns)" }
    ]
  },
  {
    id: "ds-25",
    module: "4. Merges & Reshaping",
    topic: "25. Concatenation (pd.concat)",
    title: "Vertical Stacking of DataFrames",
    difficulty: "easy",
    cppBridge: "Appending vectors. In Pandas: pd.concat([df1, df2], axis=0, ignore_index=True).",
    theory: "pd.concat([df1, df2], axis=0) stacks rows vertically; ignore_index=True resets the index to 0..N-1.",
    desc: "Stack df1 and df2 vertically, resetting the index.",
    starterCode: `import pandas as pd

def stack_vertical(df1: pd.DataFrame, df2: pd.DataFrame) -> pd.DataFrame:
    # Return pd.concat([df1, df2], axis=0, ignore_index=True)
    pass
`,
    solutionCode: `import pandas as pd

def stack_vertical(df1: pd.DataFrame, df2: pd.DataFrame) -> pd.DataFrame:
    return pd.concat([df1, df2], axis=0, ignore_index=True)`,
    testCases: [
      { input: "df1 of size 2, df2 of size 3", expected: "5", call: "len(stack_vertical(pd.DataFrame({'a':[1, 2]}), pd.DataFrame({'a':[3, 4, 5]})))" }
    ]
  },
  {
    id: "ds-26",
    module: "4. Merges & Reshaping",
    topic: "26. Pivot Tables (pivot_table)",
    title: "Reshape Long to Wide with pivot_table",
    difficulty: "medium",
    cppBridge: "2D matrix aggregation. In Pandas: df.pivot_table(index='date', columns='dept', values='sales', aggfunc='sum').",
    theory: "pivot_table aggregates data across row and column dimensions, producing a wide cross-tabulation.",
    desc: "Create a pivot table with index='date', columns='dept', values='sales', and aggfunc='sum'.",
    starterCode: `import pandas as pd

def pivot_sales(df: pd.DataFrame) -> pd.DataFrame:
    # Use df.pivot_table(index='date', columns='dept', values='sales', aggfunc='sum')
    pass
`,
    solutionCode: `import pandas as pd

def pivot_sales(df: pd.DataFrame) -> pd.DataFrame:
    return df.pivot_table(index='date', columns='dept', values='sales', aggfunc='sum')`,
    testCases: [
      { input: "sales data with dates & depts", expected: "(2, 2)", call: "str(pivot_sales(pd.DataFrame({'date':['D1','D1','D2','D2'], 'dept':['A','B','A','B'], 'sales':[10,20,30,40]})).shape)" }
    ]
  },
  {
    id: "ds-27",
    module: "4. Merges & Reshaping",
    topic: "27. Unpivoting (pd.melt)",
    title: "Reshape Wide to Long with pd.melt",
    difficulty: "medium",
    cppBridge: "Flattening multiple metric columns into a single key-value column.",
    theory: "pd.melt(df, id_vars=['id'], value_vars=['metric1', 'metric2']) unpivots wide columns into rows.",
    desc: "Melt the DataFrame with id_vars=['date'] and value_vars=['sales', 'returns'].",
    starterCode: `import pandas as pd

def melt_metrics(df: pd.DataFrame) -> pd.DataFrame:
    # Return pd.melt(df, id_vars=['date'], value_vars=['sales', 'returns'])
    pass
`,
    solutionCode: `import pandas as pd

def melt_metrics(df: pd.DataFrame) -> pd.DataFrame:
    return pd.melt(df, id_vars=['date'], value_vars=['sales', 'returns'])`,
    testCases: [
      { input: "Wide df with 2 rows", expected: "4", call: "len(melt_metrics(pd.DataFrame({'date':['D1','D2'], 'sales':[10, 20], 'returns':[1, 2]})))" }
    ]
  },

  // ========================================================================
  // Section 5: Scikit-Learn Pipelines & Transformers
  // ========================================================================
  {
    id: "ds-28",
    module: "5. Scikit-Learn Pipelines",
    topic: "28. StandardScaler",
    title: "Standardize Features (Z-Score)",
    difficulty: "easy",
    cppBridge: "(x - mean) / std. In Sklearn: StandardScaler().fit_transform(X).",
    theory: "StandardScaler transforms features to have zero mean and unit variance. Fit on train, transform test.",
    desc: "Fit a StandardScaler on X and return the transformed numpy array.",
    starterCode: `from sklearn.preprocessing import StandardScaler
import numpy as np

def scale_features(X: np.ndarray) -> np.ndarray:
    # Use StandardScaler().fit_transform(X)
    pass
`,
    solutionCode: `from sklearn.preprocessing import StandardScaler
import numpy as np

def scale_features(X: np.ndarray) -> np.ndarray:
    return StandardScaler().fit_transform(X)`,
    testCases: [
      { input: "[[1], [2], [3]]", expected: "[0.0]", call: "[round(float(scale_features(np.array([[1],[2],[3]]))[1][0]), 1)]" }
    ]
  },
  {
    id: "ds-29",
    module: "5. Scikit-Learn Pipelines",
    topic: "29. OneHotEncoder",
    title: "Encode Categorical Features",
    difficulty: "easy",
    cppBridge: "Converting categorical strings to binary dummy vectors.",
    theory: "OneHotEncoder(handle_unknown='ignore', sparse_output=False) creates dense one-hot dummy matrices.",
    desc: "Fit OneHotEncoder(sparse_output=False) on categorical array X and return the transformed array.",
    starterCode: `from sklearn.preprocessing import OneHotEncoder
import numpy as np

def one_hot_encode(X: np.ndarray) -> np.ndarray:
    # Return OneHotEncoder(sparse_output=False).fit_transform(X)
    pass
`,
    solutionCode: `from sklearn.preprocessing import OneHotEncoder
import numpy as np

def one_hot_encode(X: np.ndarray) -> np.ndarray:
    return OneHotEncoder(sparse_output=False).fit_transform(X)`,
    testCases: [
      { input: "[['red'], ['blue']]", expected: "(2, 2)", call: "str(one_hot_encode(np.array([['red'], ['blue']])).shape)" }
    ]
  },
  {
    id: "ds-30",
    module: "5. Scikit-Learn Pipelines",
    topic: "30. SimpleImputer",
    title: "Impute Missing Values with Sklearn",
    difficulty: "easy",
    cppBridge: "Median replacement. In Sklearn: SimpleImputer(strategy='median').",
    theory: "SimpleImputer replaces missing values (np.nan) with the median, mean, or most_frequent value.",
    desc: "Fit SimpleImputer with strategy='median' on X and return the imputed array.",
    starterCode: `from sklearn.impute import SimpleImputer
import numpy as np

def impute_median(X: np.ndarray) -> np.ndarray:
    # Return SimpleImputer(strategy='median').fit_transform(X)
    pass
`,
    solutionCode: `from sklearn.impute import SimpleImputer
import numpy as np

def impute_median(X: np.ndarray) -> np.ndarray:
    return SimpleImputer(strategy='median').fit_transform(X)`,
    testCases: [
      { input: "[[1], [np.nan], [3]]", expected: "[2.0]", call: "[float(impute_median(np.array([[1],[np.nan],[3]]))[1][0])]" }
    ]
  },
  {
    id: "ds-31",
    module: "5. Scikit-Learn Pipelines",
    topic: "31. ColumnTransformer",
    title: "Combine Scalers & Encoders",
    difficulty: "medium",
    cppBridge: "Applying different transforms to heterogeneous struct members.",
    theory: "ColumnTransformer([('num', StandardScaler(), num_cols), ('cat', OneHotEncoder(), cat_cols)]) cleanly processes mixed data.",
    desc: "Create a ColumnTransformer applying StandardScaler to num_cols and OneHotEncoder to cat_cols.",
    starterCode: `from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

def make_preprocessor(num_cols: list, cat_cols: list) -> ColumnTransformer:
    # Use ColumnTransformer([('num', StandardScaler(), num_cols), ('cat', OneHotEncoder(), cat_cols)])
    pass
`,
    solutionCode: `from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder

def make_preprocessor(num_cols: list, cat_cols: list) -> ColumnTransformer:
    return ColumnTransformer([
        ('num', StandardScaler(), num_cols),
        ('cat', OneHotEncoder(), cat_cols)
    ])`,
    testCases: [
      { input: "num=['age'], cat=['dept']", expected: "['num', 'cat']", call: "[t[0] for t in make_preprocessor(['age'], ['dept']).transformers]" }
    ]
  },
  {
    id: "ds-32",
    module: "5. Scikit-Learn Pipelines",
    topic: "32. Sklearn Pipeline",
    title: "Chain Preprocessor and Model",
    difficulty: "medium",
    cppBridge: "Chained callable stages.",
    theory: "Pipeline([('prep', preprocessor), ('model', model)]) encapsulates fitting and inference without leakage.",
    desc: "Build a Pipeline with a preprocessor step 'prep' and a LogisticRegression step 'clf'.",
    starterCode: `from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

def create_model_pipe(preprocessor) -> Pipeline:
    # Return Pipeline([('prep', preprocessor), ('clf', LogisticRegression())])
    pass
`,
    solutionCode: `from sklearn.pipeline import Pipeline
from sklearn.linear_model import LogisticRegression

def create_model_pipe(preprocessor) -> Pipeline:
    return Pipeline([
        ('prep', preprocessor),
        ('clf', LogisticRegression())
    ])`,
    testCases: [
      { input: "preprocessor object", expected: "['prep', 'clf']", call: "[name for name, _ in create_model_pipe('dummy').steps]" }
    ]
  },
  {
    id: "ds-33",
    module: "5. Scikit-Learn Pipelines",
    topic: "33. train_test_split",
    title: "Stratified Train/Test Split",
    difficulty: "easy",
    cppBridge: "Partitioning dataset into disjoint sets.",
    theory: "train_test_split(X, y, test_size=0.2, stratify=y, random_state=42) preserves class proportions in splits.",
    desc: "Split X and y with test_size=0.2, random_state=42, and stratify=y.",
    starterCode: `from sklearn.model_selection import train_test_split

def split_data(X, y):
    # Return train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    pass
`,
    solutionCode: `from sklearn.model_selection import train_test_split

def split_data(X, y):
    return train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)`,
    testCases: [
      { input: "X of 100 samples", expected: "20", call: "len(split_data(list(range(100)), [0]*50 + [1]*50)[1])" }
    ]
  },

  // ========================================================================
  // Section 6: SciPy Statistical Tests & Optimization
  // ========================================================================
  {
    id: "ds-34",
    module: "6. SciPy Statistical Tests",
    topic: "34. Two-Sample t-test",
    title: "Welch's Two-Sample t-test",
    difficulty: "easy",
    cppBridge: "Student t-statistic calculation. In SciPy: stats.ttest_ind(a, b, equal_var=False).",
    theory: "stats.ttest_ind(a, b, equal_var=False) returns (t_stat, p_value) for comparing two population means.",
    desc: "Perform Welch's t-test on group_a and group_b and return the p-value.",
    starterCode: `from scipy import stats

def get_ttest_pvalue(group_a: list, group_b: list) -> float:
    # Use stats.ttest_ind(group_a, group_b, equal_var=False).pvalue
    pass
`,
    solutionCode: `from scipy import stats

def get_ttest_pvalue(group_a: list, group_b: list) -> float:
    res = stats.ttest_ind(group_a, group_b, equal_var=False)
    return float(res.pvalue)`,
    testCases: [
      { input: "[10, 11, 10], [50, 52, 51]", expected: "True", call: "get_ttest_pvalue([10, 11, 10], [50, 52, 51]) < 0.01" }
    ]
  },
  {
    id: "ds-35",
    module: "6. SciPy Statistical Tests",
    topic: "35. Chi-Square Test",
    title: "Chi-Square Test of Independence",
    difficulty: "easy",
    cppBridge: "Contingency table independence test. In SciPy: stats.chi2_contingency(table).",
    theory: "stats.chi2_contingency(observed) returns (chi2, p_val, dof, expected) to test categorical dependence.",
    desc: "Given a 2x2 contingency table, return the p-value using stats.chi2_contingency.",
    starterCode: `from scipy import stats

def get_chi2_pvalue(contingency_table) -> float:
    # Use stats.chi2_contingency(contingency_table)
    pass
`,
    solutionCode: `from scipy import stats

def get_chi2_pvalue(contingency_table) -> float:
    chi2, p_val, dof, exp = stats.chi2_contingency(contingency_table)
    return float(p_val)`,
    testCases: [
      { input: "[[10, 50], [50, 10]]", expected: "True", call: "get_chi2_pvalue([[10, 50], [50, 10]]) < 0.01" }
    ]
  },
  {
    id: "ds-36",
    module: "6. SciPy Statistical Tests",
    topic: "36. Spatial Distance (cdist)",
    title: "Pairwise Euclidean Distance",
    difficulty: "easy",
    cppBridge: "Nested loop computing sqrt((x1-x2)^2 + ...). In SciPy: cdist(XA, XB, metric='euclidean').",
    theory: "scipy.spatial.distance.cdist computes the distance matrix between each pair of observation vectors.",
    desc: "Compute the pairwise Euclidean distance matrix between coordinate arrays XA and XB.",
    starterCode: `from scipy.spatial.distance import cdist
import numpy as np

def compute_distances(XA: np.ndarray, XB: np.ndarray) -> np.ndarray:
    # Return cdist(XA, XB, metric='euclidean')
    pass
`,
    solutionCode: `from scipy.spatial.distance import cdist
import numpy as np

def compute_distances(XA: np.ndarray, XB: np.ndarray) -> np.ndarray:
    return cdist(XA, XB, metric='euclidean')`,
    testCases: [
      { input: "[[0, 0]], [[3, 4]]", expected: "[5.0]", call: "[float(compute_distances(np.array([[0, 0]]), np.array([[3, 4]]))[0][0])]" }
    ]
  },

  // ========================================================================
  // Section 7: NumPy Vectorization & Array Operations
  // ========================================================================
  {
    id: "ds-37",
    module: "7. NumPy Vectorization",
    topic: "37. Reshaping Arrays (.reshape)",
    title: "Reshape 1D to 2D Column Vector",
    difficulty: "easy",
    cppBridge: "Pointer stride cast. In NumPy: arr.reshape(-1, 1).",
    theory: ".reshape(-1, 1) converts a 1D array of shape (N,) into a 2D column vector of shape (N, 1).",
    desc: "Reshape a 1D numpy array of shape (N,) into a 2D column vector of shape (N, 1).",
    starterCode: `import numpy as np

def make_column_vector(arr: np.ndarray) -> np.ndarray:
    # Return arr.reshape(-1, 1)
    pass
`,
    solutionCode: `import numpy as np

def make_column_vector(arr: np.ndarray) -> np.ndarray:
    return arr.reshape(-1, 1)`,
    testCases: [
      { input: "[1, 2, 3]", expected: "(3, 1)", call: "str(make_column_vector(np.array([1, 2, 3])).shape)" }
    ]
  },
  {
    id: "ds-38",
    module: "7. NumPy Vectorization",
    topic: "38. Broadcasting Addition",
    title: "Add Row Vector to 2D Matrix",
    difficulty: "easy",
    cppBridge: "Nested for-loop adding vector to each row. In NumPy: matrix + row_vec.",
    theory: "NumPy broadcasts dimensions of size 1 across larger dimensions automatically.",
    desc: "Add a 1D row vector (shape: (cols,)) to every row of a 2D matrix (shape: (rows, cols)).",
    starterCode: `import numpy as np

def broadcast_add(matrix: np.ndarray, row_vec: np.ndarray) -> np.ndarray:
    # Return matrix + row_vec
    pass
`,
    solutionCode: `import numpy as np

def broadcast_add(matrix: np.ndarray, row_vec: np.ndarray) -> np.ndarray:
    return matrix + row_vec`,
    testCases: [
      { input: "[[1, 2], [3, 4]] + [10, 20]", expected: "[[11, 22], [13, 24]]", call: "str(broadcast_add(np.array([[1, 2], [3, 4]]), np.array([10, 20])).tolist())" }
    ]
  },
  {
    id: "ds-39",
    module: "7. NumPy Vectorization",
    topic: "39. Boolean Masking (NumPy ReLU)",
    title: "Clamp Negative Values to Zero",
    difficulty: "easy",
    cppBridge: "max(0, x). In NumPy: arr[arr < 0] = 0.",
    theory: "Boolean masks can be used on the left-hand side of assignments to modify matching elements in-place.",
    desc: "Given array arr, replace all negative values with 0 and return the array.",
    starterCode: `import numpy as np

def relu_clamp(arr: np.ndarray) -> np.ndarray:
    # Set arr[arr < 0] = 0
    pass
`,
    solutionCode: `import numpy as np

def relu_clamp(arr: np.ndarray) -> np.ndarray:
    arr = arr.copy()
    arr[arr < 0] = 0
    return arr`,
    testCases: [
      { input: "[-5, 3, -1, 10]", expected: "[0, 3, 0, 10]", call: "str(relu_clamp(np.array([-5, 3, -1, 10])).tolist())" }
    ]
  },
  {
    id: "ds-40",
    module: "7. NumPy Vectorization",
    topic: "40. Matrix Multiplication (@)",
    title: "Compute Matrix Product using @",
    difficulty: "easy",
    cppBridge: "O(N^3) triple nested loops. In NumPy: A @ B.",
    theory: "The @ operator calls optimized BLAS routines to compute the dot product of two 2D matrices.",
    desc: "Compute and return the matrix product of matrix A and matrix B using @.",
    starterCode: `import numpy as np

def matmul(A: np.ndarray, B: np.ndarray) -> np.ndarray:
    # Return A @ B
    pass
`,
    solutionCode: `import numpy as np

def matmul(A: np.ndarray, B: np.ndarray) -> np.ndarray:
    return A @ B`,
    testCases: [
      { input: "[[1, 2], [3, 4]] @ [[2, 0], [1, 2]]", expected: "[[4, 4], [10, 8]]", call: "str(matmul(np.array([[1, 2], [3, 4]]), np.array([[2, 0], [1, 2]])).tolist())" }
    ]
  },
  {
    id: "ds-41",
    module: "7. NumPy Vectorization",
    topic: "41. Argmax & Reductions",
    title: "Find Index of Maximum Element (.argmax)",
    difficulty: "easy",
    cppBridge: "max_element iterator distance. In NumPy: np.argmax(arr, axis=1).",
    theory: "np.argmax(arr, axis=1) returns the index of the highest value along the specified axis.",
    desc: "Return the column index of the maximum value in each row of 2D array arr.",
    starterCode: `import numpy as np

def row_argmax(arr: np.ndarray) -> np.ndarray:
    # Return np.argmax(arr, axis=1)
    pass
`,
    solutionCode: `import numpy as np

def row_argmax(arr: np.ndarray) -> np.ndarray:
    return np.argmax(arr, axis=1)`,
    testCases: [
      { input: "[[1, 9, 2], [8, 3, 4]]", expected: "[1, 0]", call: "str(row_argmax(np.array([[1, 9, 2], [8, 3, 4]])).tolist())" }
    ]
  }
];
