---
title: "Basics of Unsupervised Learning"
description: "Published from /C:/Users/korde/Home/Github/notes/pages/14_unsupervised.md"
---
<div class="note-properties">
  <div class="note-property-row"><span class="note-property-key">marp</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">theme</span><span class="note-property-value">default</span></div>
  <div class="note-property-row"><span class="note-property-key">paginate</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">backgroundImage</span><span class="note-property-value">url('https://marp.app/assets/hero-background.svg')</span></div>
</div>

## Different Models of Unsupervised Learning

**An Introduction to Machine Learning without Labels**

---

## What is Unsupervised Learning?

- **Learning from unlabeled data** - no target variable or ground truth
- **Discovering hidden patterns** in data structure
- **Exploratory data analysis** approach
- **No "correct" answers** - focus on meaningful patterns

### Key Characteristics:

- Input: Features only (X)
- Output: Patterns, clusters, associations
- Goal: Understand data structure

---

## Supervised vs Unsupervised Learning

| **Supervised Learning**      | **Unsupervised Learning**           |
| ---------------------------- | ----------------------------------- |
| Labeled data (X, y)          | Unlabeled data (X only)             |
| Prediction focus             | Pattern discovery focus             |
| Classification/Regression    | Clustering/Dimensionality reduction |
| Performance evaluation clear | Evaluation subjective               |

---

## Types of Unsupervised Learning

### 1. **Clustering**

- Group similar data points together
- Examples: Customer segmentation, gene analysis

### 2. **Dimensionality Reduction**

- Reduce number of features while preserving information
- Examples: Data visualization, noise reduction

### 3. **Association Rule Mining**

- Find relationships between variables
- Examples: Market basket analysis, recommendation systems

---

## Clustering Models

### K-Means Clustering

- **Partitions data into k clusters**
- Minimizes within-cluster sum of squares
- **Algorithm:**
  1. Choose number of clusters (k)
  2. Initialize cluster centroids
  3. Assign points to nearest centroid
  4. Update centroids
  5. Repeat until convergence

**Pros:** Simple, efficient, works well with spherical clusters
**Cons:** Need to specify k, sensitive to initialization

---

## Clustering Models (continued)

### Hierarchical Clustering

- **Creates tree-like cluster structure**
- Two approaches:
  - **Agglomerative:** Bottom-up merging
  - **Divisive:** Top-down splitting

**Pros:** No need to specify k, creates hierarchy
**Cons:** Computationally expensive O(n³)

### DBSCAN

- **Density-based clustering**
- Finds clusters of varying shapes and sizes
- Identifies outliers as noise points

---

## Dimensionality Reduction Models

### Principal Component Analysis (PCA)

- **Linear dimensionality reduction**
- Finds principal components with maximum variance
- **Applications:**
  - Data visualization (2D/3D plots)
  - Noise reduction
  - Feature extraction

**Mathematical concept:** Eigenvalue decomposition of covariance matrix

---

## Dimensionality Reduction (continued)

### t-SNE (t-Distributed Stochastic Neighbor Embedding)

- **Non-linear dimensionality reduction**
- Excellent for data visualization
- Preserves local neighborhood structure
- **Best for:** Visualizing high-dimensional data in 2D/3D

### Independent Component Analysis (ICA)

- **Separates mixed signals**
- Finds statistically independent components
- **Applications:** Signal processing, feature extraction

---

## Association Rule Mining

### Market Basket Analysis

- **Finds relationships between items**
- Key metrics:
  - **Support:** Frequency of itemset
  - **Confidence:** Conditional probability
  - **Lift:** Strength of association

### Apriori Algorithm

- **Finds frequent itemsets**
- Generates association rules
- **Example:** "If bread and butter, then milk" (70% confidence)

---

## Comparison of Unsupervised Models

| **Model**    | **Type**       | **Best For**          | **Limitations**           |
| ------------ | -------------- | --------------------- | ------------------------- |
| K-Means      | Clustering     | Spherical clusters    | Need to choose k          |
| Hierarchical | Clustering     | Unknown cluster count | Computationally expensive |
| DBSCAN       | Clustering     | Arbitrary shapes      | Parameter tuning          |
| PCA          | Dim. Reduction | Linear relationships  | Linear assumption         |
| t-SNE        | Dim. Reduction | Visualization         | Computationally intensive |

---

## Evaluation of Unsupervised Learning

### Clustering Evaluation:

- **Silhouette Score:** Measures cluster cohesion and separation
- **Inertia:** Within-cluster sum of squares
- **Calinski-Harabasz Index:** Ratio of between to within cluster variance

### Dimensionality Reduction Evaluation:

- **Explained Variance Ratio:** Amount of variance preserved
- **Reconstruction Error:** Difference from original data
- **Visualization Quality:** Subjective assessment

---

## Real-World Applications

### **Customer Segmentation**

- Cluster customers by behavior
- Targeted marketing strategies
- **Model:** K-Means, Hierarchical clustering

### **Anomaly Detection**

- Identify unusual patterns
- Fraud detection, network security
- **Model:** Isolation Forest, One-class SVM

### **Data Preprocessing**

- Feature selection and extraction
- Noise reduction
- **Model:** PCA, ICA

---

## Choosing the Right Model

### Consider:

1. **Data characteristics** (size, dimensionality, noise)
2. **Problem objective** (clustering, visualization, preprocessing)
3. **Computational resources** available
4. **Interpretability** requirements

### Guidelines:

- **Small datasets:** Hierarchical clustering
- **Large datasets:** K-Means, Mini-batch K-Means
- **Visualization:** t-SNE, PCA
- **Mixed data types:** DBSCAN

---

## Best Practices

### Data Preprocessing:

- **Standardization/Normalization** for distance-based methods
- **Handle missing values** appropriately
- **Feature selection** to remove irrelevant variables

### Model Selection:

- **Try multiple algorithms** on your dataset
- **Cross-validate** results where possible
- **Domain knowledge** should guide interpretation

### Evaluation:

- **Multiple metrics** for comprehensive assessment
- **Visual inspection** of results
- **Business relevance** of discovered patterns

---

## Challenges in Unsupervised Learning

### **Curse of Dimensionality**

- Distance metrics become less meaningful in high dimensions
- **Solution:** Dimensionality reduction preprocessing

### **Parameter Selection**

- Many algorithms require hyperparameter tuning
- **Solution:** Grid search, domain expertise

### **Result Interpretation**

- No ground truth for validation
- **Solution:** Domain knowledge, multiple perspectives

### **Scalability**

- Some algorithms don't scale well
- **Solution:** Sampling, distributed computing

---

## Future Directions

### **Deep Unsupervised Learning**

- Autoencoders for dimensionality reduction
- Generative Adversarial Networks (GANs)
- Self-supervised learning

### **Advanced Clustering**

- Spectral clustering
- Gaussian mixture models
- Consensus clustering

### **Automated Machine Learning**

- Automatic algorithm selection
- Hyperparameter optimization
- Feature engineering automation

---

## Summary

### Key Takeaways:

1. **Unsupervised learning** discovers patterns in unlabeled data
2. **Three main types:** Clustering, dimensionality reduction, association rules
3. **Algorithm choice** depends on data and objectives
4. **Evaluation** is challenging but crucial
5. **Domain knowledge** essential for interpretation

### Remember:

- No single best algorithm for all problems
- Combine multiple approaches for robust results
- Visualization is powerful for understanding results

---

**Key Resources:**

- Scikit-learn documentation
- "Pattern Recognition and Machine Learning" - Bishop
- "The Elements of Statistical Learning" - Hastie et al.

---

🧠 What Is PCA?
PCA is a dimensionality reduction method. It transforms a dataset with many variables into a smaller set of new variables called principal components, which still capture most of the original information.

---

🔍 Why Use PCA?

- To reduce complexity in high-dimensional data
- To remove redundancy from correlated features
- To improve visualization and computational efficiency
- To prepare data for machine learning models

---

⚙️ How PCA Works (Step-by-Step)

1. Standardize the Data  
   Normalize features so they have a mean of 0 and standard deviation of 1.

2. Compute the Covariance Matrix  
   Measures how features vary together.

3. Calculate Eigenvectors and Eigenvalues
   - Eigenvectors define directions of maximum variance.
   - Eigenvalues tell how much variance is captured in each direction.

4. Select Principal Components  
   Choose the top components (e.g., PC1, PC2) that capture the most variance.

5. Project Data  
   Transform the original data onto the new axes defined by the principal components.

---

📊 Example
Imagine a dataset with 100 features. PCA might reduce it to just 5 principal components that still explain 90% of the variance. This makes analysis faster and models more efficient.

---

🧩 Key Concepts
| Term | Meaning |
|------|--------|
| Principal Component | A new variable formed by combining original features |
| Variance | How spread out the data is |
| Eigenvector | Direction of maximum variance |
| Eigenvalue | Magnitude of variance in that direction |

---

⚠️ Trade-Off
While PCA simplifies data, it can reduce interpretability—principal components are combinations of original features, not easily understood on their own.

---

import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler

# Step 1: Load sample data (Iris dataset)

data = load_iris()
X = data.data
y = data.target
feature_names = data.feature_names

# Step 2: Standardize the data

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Step 3: Apply PCA

pca = PCA(n_components=2) # Reduce to 2 dimensions for visualization
X_pca = pca.fit_transform(X_scaled)

# Step 4: Visualize the results

plt.figure(figsize=(8, 6))
for target in np.unique(y):
plt.scatter(X_pca[y == target, 0], X_pca[y == target, 1], label=data.target_names[target])
plt.xlabel('Principal Component 1')
plt.ylabel('Principal Component 2')
plt.title('PCA of Iris Dataset')
plt.legend()
plt.grid(True)
plt.show()

# Step 5: Explained variance

print("Explained variance ratio:", pca.explained*variance_ratio*)

---

import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_iris

# Step 1: Load and prepare data

data = load_iris()
X = data.data
y = data.target

# Step 2: Standardize the data

X_meaned = X - np.mean(X, axis=0)

# Step 3: Compute the covariance matrix

cov_matrix = np.cov(X_meaned, rowvar=False)

# Step 4: Compute eigenvalues and eigenvectors

eigenvalues, eigenvectors = np.linalg.eigh(cov_matrix)

# Step 5: Sort eigenvectors by descending eigenvalues

sorted_indices = np.argsort(eigenvalues)[::-1]
eigenvalues = eigenvalues[sorted_indices]
eigenvectors = eigenvectors[:, sorted_indices]

# Step 6: Select top k eigenvectors (e.g., k=2)

k = 2
eigenvectors_subset = eigenvectors[:, :k]

# Step 7: Project the data onto the new feature space

X_reduced = np.dot(X_meaned, eigenvectors_subset)

# Step 8: Visualize the result

plt.figure(figsize=(8, 6))
for target in np.unique(y):
plt.scatter(X_reduced[y == target, 0], X_reduced[y == target, 1], label=data.target_names[target])
plt.xlabel('Principal Component 1')
plt.ylabel('Principal Component 2')
plt.title('PCA from Scratch on Iris Dataset')
plt.legend()
plt.grid(True)
plt.show()
