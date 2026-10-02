// ==========================================================================
// Track 4: 4 Timed End-to-End Machine Learning & Analytics Projects
// Clean starter code signatures (NO pre-filled solutions)
// ==========================================================================

window.TRACK_4_PROJECTS = [
  {
    id: "proj-1",
    title: "Project 1: Imbalanced Tabular Classification (Customer Churn)",
    durationMinutes: 60,
    difficulty: "medium",
    targetMetric: "ROC-AUC >= 0.85 & F1 >= 0.70",
    description: `A subscription SaaS company is experiencing high churn. You are provided with customer usage metrics, account age, support tickets, and monthly spend.
Your mission is to perform end-to-end data cleaning, impute missing values without data leakage, encode categorical tiers, scale numerical values using ColumnTransformer & Pipeline, and train a high-performing classifier.`,
    rubric: [
      { step: 1, title: "Data Audit & Imputation", desc: "Identify missing numerical values in 'tenure' and impute with median computed strictly on training set." },
      { step: 2, title: "Feature Pipeline", desc: "Build a ColumnTransformer applying StandardScaler to numerical features and OneHotEncoder to 'tier'." },
      { step: 3, title: "Model & Evaluation", desc: "Fit a regularized LogisticRegression or GradientBoostingClassifier and evaluate using roc_auc_score." }
    ],
    starterCode: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score

# 1. Dataset Loader
def load_churn_data():
    np.random.seed(42)
    n = 1000
    tenure = np.random.exponential(scale=12, size=n)
    tenure[np.random.choice(n, size=50, replace=False)] = np.nan # 5% missing
    monthly_charges = np.random.normal(loc=70, scale=20, size=n)
    tier = np.random.choice(['Bronze', 'Silver', 'Gold'], size=n, p=[0.5, 0.3, 0.2])
    prob = 1 / (1 + np.exp(-(0.05 * monthly_charges - 0.1 * np.nan_to_num(tenure, nan=12) - 0.5)))
    churn = (np.random.rand(n) < prob).astype(int)
    return pd.DataFrame({'tenure': tenure, 'monthly_charges': monthly_charges, 'tier': tier, 'churn': churn})

df = load_churn_data()
X = df[['tenure', 'monthly_charges', 'tier']]
y = df['churn']

# TODO: Build an end-to-end ColumnTransformer + Pipeline and return ROC-AUC on test set
def build_and_evaluate(X, y):
    # 1. train_test_split with stratify=y
    # 2. Build ColumnTransformer with SimpleImputer + StandardScaler for num_cols, OneHotEncoder for cat_cols
    # 3. Fit Pipeline with Classifier
    # 4. Return roc_auc_score(y_test, y_probs)
    pass

score = build_and_evaluate(X, y)
print("ROC-AUC:", score)
`,
    solutionCode: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import roc_auc_score

def build_and_evaluate(X, y):
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)
    num_cols = ['tenure', 'monthly_charges']
    cat_cols = ['tier']
    
    num_transformer = Pipeline([('imputer', SimpleImputer(strategy='median')), ('scaler', StandardScaler())])
    cat_transformer = Pipeline([('ohe', OneHotEncoder(handle_unknown='ignore'))])
    
    preprocessor = ColumnTransformer(transformers=[
        ('num', num_transformer, num_cols),
        ('cat', cat_transformer, cat_cols)
    ])
    
    pipe = Pipeline([('prep', preprocessor), ('clf', LogisticRegression(random_state=42))])
    pipe.fit(X_train, y_train)
    y_probs = pipe.predict_proba(X_test)[:, 1]
    return roc_auc_score(y_test, y_probs)`,
    testCases: [
      {
        input: "Run Churn Pipeline Evaluation",
        expected: "True",
        call: "df=load_churn_data(); s=build_and_evaluate(df[['tenure', 'monthly_charges', 'tier']], df['churn']); s >= 0.75"
      }
    ]
  },
  {
    id: "proj-2",
    title: "Project 2: Regression with LR from Scratch & Feature Engineering",
    durationMinutes: 75,
    difficulty: "hard",
    targetMetric: "R2 Score >= 0.80 & Custom LR implementation passes",
    description: `Given a real estate dataset with square footage, number of rooms, neighborhood, and property age, predict house prices.
You will first implement and verify your custom LinearRegressionNormalEq class against Scikit-Learn's baseline, perform feature engineering (.groupby().transform() for neighborhood pricing), and optimize R2 using Ridge regression.`,
    rubric: [
      { step: 1, title: "Custom Normal Equation", desc: "Implement theta = (X_b^T @ X_b)^(-1) @ X_b^T @ y and verify predictions on synthetic linear data." },
      { step: 2, title: "Feature Engineering", desc: "Engineer interaction term: sqft_per_room = sqft / rooms. Engineer neighborhood_avg_price via .groupby('neighborhood')['price'].transform('mean')." },
      { step: 3, title: "Model Comparison", desc: "Evaluate R2 score comparing baseline Linear Regression vs. Ridge regularized model." }
    ],
    starterCode: `import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score

# TODO 1: Implement Normal Equation from scratch: theta = (X^T * X)^(-1) * X^T * y
class CustomLinearRegression:
    def __init__(self):
        self.theta = None
        
    def fit(self, X: np.ndarray, y: np.ndarray):
        # Prepend bias column and compute theta
        pass
        
    def predict(self, X: np.ndarray) -> np.ndarray:
        # Return X_b @ theta
        pass

# 2. Simulated Real Estate Data
def generate_housing_data():
    np.random.seed(42)
    n = 500
    sqft = np.random.uniform(800, 4000, n)
    rooms = np.random.choice([1, 2, 3, 4, 5], size=n)
    neighborhood = np.random.choice(['Downtown', 'Suburbs', 'Uptown'], size=n)
    base_price = 100 * sqft + 15000 * rooms + np.random.normal(0, 10000, n)
    return pd.DataFrame({'sqft': sqft, 'rooms': rooms, 'neighborhood': neighborhood, 'price': base_price})

df = generate_housing_data()
X_simple = df[['sqft']].values
y_simple = df['price'].values

# Test your implementation
model = CustomLinearRegression()
model.fit(X_simple, y_simple)
# print("R2 Score:", r2_score(y_simple, model.predict(X_simple)))
`,
    solutionCode: `import pandas as pd
import numpy as np
from sklearn.metrics import r2_score

class CustomLinearRegression:
    def fit(self, X, y):
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        self.theta = np.linalg.pinv(X_b.T @ X_b) @ X_b.T @ y
    def predict(self, X):
        X_b = np.c_[np.ones((X.shape[0], 1)), X]
        return X_b @ self.theta`,
    testCases: [
      {
        input: "Verify Custom LR matches OLS",
        expected: "True",
        call: "df=generate_housing_data(); m=CustomLinearRegression(); m.fit(df[['sqft']].values, df['price'].values); r2_score(df['price'].values, m.predict(df[['sqft']].values)) > 0.90"
      }
    ]
  },
  {
    id: "proj-3",
    title: "Project 3: Time Series Financial / Sales Forecasting",
    durationMinutes: 75,
    difficulty: "hard",
    targetMetric: "WAPE < 0.15 & Zero Data Leakage",
    description: `Given daily sales data across multiple product stores, forecast demand for the upcoming week.
You must strictly enforce zero data leakage: use positive lags (.shift(1), .shift(7)), rolling statistics, and TimeSeriesSplit (walk-forward validation; never use random shuffle!).`,
    rubric: [
      { step: 1, title: "Date Feature Extraction", desc: "Extract dayofweek, month, and is_weekend using .dt accessor." },
      { step: 2, title: "Leakage-Free Features", desc: "Construct lag_1 = sales.shift(1), lag_7 = sales.shift(7), and rolling_7_mean = sales.shift(1).rolling(7).mean()." },
      { step: 3, title: "Walk-Forward Validation", desc: "Evaluate using TimeSeriesSplit(n_splits=5) and compute Mean Absolute Error (MAE)." }
    ],
    starterCode: `import pandas as pd
import numpy as np
from sklearn.model_selection import TimeSeriesSplit
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error

def generate_sales_series():
    dates = pd.date_range(start="2025-01-01", periods=180, freq="D")
    trend = np.linspace(50, 150, 180)
    seasonality = 20 * np.sin(2 * np.pi * np.arange(180) / 7)
    noise = np.random.normal(0, 5, 180)
    sales = trend + seasonality + noise
    return pd.DataFrame({'date': dates, 'sales': sales})

df = generate_sales_series()

# TODO: Build leakage-free features using .shift() and .rolling()
def engineer_time_features(df):
    df = df.copy()
    # 1. Extract dayofweek and is_weekend
    # 2. Extract lag_1 and lag_7 (using past values only!)
    # 3. Extract rolling_7_mean (using past values only!)
    # 4. Return df.dropna()
    pass
`,
    solutionCode: `import pandas as pd
import numpy as np
from sklearn.model_selection import TimeSeriesSplit
from sklearn.linear_model import Ridge
from sklearn.metrics import mean_absolute_error

def engineer_time_features(df):
    df = df.copy()
    df['dayofweek'] = df['date'].dt.dayofweek
    df['is_weekend'] = (df['dayofweek'] >= 5).astype(int)
    df['lag_1'] = df['sales'].shift(1)
    df['lag_7'] = df['sales'].shift(7)
    df['rolling_7_mean'] = df['sales'].shift(1).rolling(7).mean()
    return df.dropna()

def evaluate_ts():
    df = generate_sales_series()
    df_feat = engineer_time_features(df)
    X = df_feat[['dayofweek', 'is_weekend', 'lag_1', 'lag_7', 'rolling_7_mean']]
    y = df_feat['sales']
    tscv = TimeSeriesSplit(n_splits=3)
    maes = []
    for train_idx, test_idx in tscv.split(X):
        model = Ridge(alpha=1.0)
        model.fit(X.iloc[train_idx], y.iloc[train_idx])
        maes.append(mean_absolute_error(y.iloc[test_idx], model.predict(X.iloc[test_idx])))
    return np.mean(maes)`,
    testCases: [
      {
        input: "Verify TimeSeriesSplit Validation",
        expected: "True",
        call: "evaluate_ts() < 15.0"
      }
    ]
  },
  {
    id: "proj-4",
    title: "Project 4: A/B Testing & Statistical Customer Segmentation",
    durationMinutes: 60,
    difficulty: "medium",
    targetMetric: "Valid P-values & KMeans Silhouette > 0.50",
    description: `An e-commerce business conducted an A/B test on checkout design while capturing customer purchase transactions.
Your tasks:
1. Conduct hypothesis testing (Welch's t-test) on average revenue per user between Control and Treatment.
2. Run a Chi-Square test of independence to determine if conversion rates vary by device category.
3. Compute RFM (Recency, Frequency, Monetary) metrics and perform KMeans clustering to segment customers.`,
    rubric: [
      { step: 1, title: "A/B Hypothesis Testing", desc: "Calculate two-sample t-test on revenue using scipy.stats.ttest_ind(equal_var=False)." },
      { step: 2, title: "Chi-Square Independence", desc: "Construct contingency table with pd.crosstab() and compute p-value via scipy.stats.chi2_contingency()." },
      { step: 3, title: "Customer Segmentation", desc: "Standardize RFM features using StandardScaler and fit KMeans(n_clusters=3)." }
    ],
    starterCode: `import pandas as pd
import numpy as np
from scipy import stats
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans

# TODO: Conduct Welch's t-test on Control vs Treatment revenue
def run_ab_test():
    np.random.seed(42)
    control_rev = np.random.exponential(scale=30, size=500)
    treatment_rev = np.random.exponential(scale=35, size=500)
    # Run stats.ttest_ind with equal_var=False
    # return p_val, is_significant (p < 0.05)
    pass

# TODO: Conduct Chi-Square test of independence on device conversion
def run_device_chi2():
    devices = np.random.choice(['Mobile', 'Desktop'], size=1000, p=[0.7, 0.3])
    converted = np.random.choice([0, 1], size=1000, p=[0.85, 0.15])
    # Build pd.crosstab and compute chi2_contingency
    # return p_val
    pass
`,
    solutionCode: `import pandas as pd
import numpy as np
from scipy import stats

def run_ab_test():
    np.random.seed(42)
    control_rev = np.random.exponential(scale=30, size=500)
    treatment_rev = np.random.exponential(scale=35, size=500)
    t_stat, p_val = stats.ttest_ind(control_rev, treatment_rev, equal_var=False)
    return p_val, p_val < 0.05

def run_device_chi2():
    devices = np.random.choice(['Mobile', 'Desktop'], size=1000, p=[0.7, 0.3])
    converted = np.random.choice([0, 1], size=1000, p=[0.85, 0.15])
    ct = pd.crosstab(devices, converted)
    chi2, p_val, dof, _ = stats.chi2_contingency(ct)
    return p_val

def verify_proj4():
    p_ab, sig = run_ab_test()
    p_chi = run_device_chi2()
    return p_ab is not None and p_chi is not None`,
    testCases: [
      {
        input: "Verify Statistical Tests Execution",
        expected: "True",
        call: "verify_proj4()"
      }
    ]
  }
];
