---
title: "Long Short-Term Memory (LSTM)"
description: "Published from /C:/Users/korde/Home/Github/notes/Lstm.md"
---
<div class="note-properties">
  <div class="note-property-row"><span class="note-property-key">marp</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">theme</span><span class="note-property-value">default</span></div>
  <div class="note-property-row"><span class="note-property-key">paginate</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">style</span><span class="note-property-value">section {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
h1 {
  color: #FFFFFF;
  font-size: 44pt;
  font-weight: bold;
}
h2 {
  color: #FFFFFF;
  font-size: 32pt;
  font-weight: bold;
}
h3 {
  color: #CADCFC;
  font-size: 24pt;
  font-weight: bold;
}
code {
  background: #2C3E7E;
  color: #CADCFC;
}
strong {
  color: #FFFFFF;
}
section.light {
  background-color: #FFFFFF;
  color: #1E2761;
}
section.light h1, section.light h2 {
  color: #1E2761;
}
section.light h3 {
  color: #2C3E7E;
}
section.light code {
  background: #E8EEF7;
  color: #1E2761;
}
</span></div>
</div>

## A Deep Dive into Sequential Learning

**Understanding the Architecture That Revolutionized Sequence Modeling**

---

<!-- _class: light -->

# Agenda

### 1. Historical Context & Motivation

### 2. The Vanishing Gradient Problem

### 3. LSTM Architecture & Mathematics

### 4. Detailed Diagrams & Flow

### 5. Real-World Use Cases

### 6. Limitations & Drawbacks

### 7. Python Implementation

---

# The Beginning: Why LSTMs?

**Traditional RNNs faced a critical problem:**

- Unable to learn **long-term dependencies**
- Gradients vanish or explode during backpropagation
- Memory of earlier events fades quickly

**The Challenge:**
_"I grew up in France... I speak fluent \_\_\_\_"_

Simple RNNs struggle to connect "France" with "French" across long sequences.

---

<!-- _class: light -->

# Historical Timeline

### **1991** - Sepp Hochreiter identifies vanishing gradient problem

### **1997** - Hochreiter & Schmidhuber publish LSTM

### **2000s** - Gradual adoption in speech recognition

### **2013** - Alex Graves achieves breakthrough in handwriting recognition

### **2014-2016** - LSTM dominates NLP, machine translation, and speech

### **2017+** - Transformers emerge, but LSTMs remain relevant

---

# The Vanishing Gradient Problem

**During backpropagation through time (BPTT):**

Gradient = ∂L/∂W = ∂L/∂h*t × ∂h_t/∂h*{t-1} × ... × ∂h_1/∂W

**Each step multiplies by the derivative of activation function:**

- If |derivative| < 1 → gradients **vanish** exponentially
- If |derivative| > 1 → gradients **explode**

**Result:** Network can't learn from events >5-10 steps in the past

---

<!-- _class: light -->

# LSTM Solution: The Cell State

**Key Innovation:** Separate **cell state** (C_t) from hidden state (h_t)

The cell state acts as a "memory highway":

- Information flows with minimal transformation
- Protected from gradient vanishing
- Gates control what to remember and forget

**Think of it as:** A conveyor belt carrying information through time, with workers (gates) deciding what to add or remove.

---

# LSTM Architecture: The Four Gates

### **1. Forget Gate (f_t)** - What to remove from memory

### **2. Input Gate (i_t)** - What new information to store

### **3. Candidate Values (C̃_t)** - New information to consider

### **4. Output Gate (o_t)** - What to output based on memory

Each gate uses **sigmoid (σ)** or **tanh** activation functions strategically.

---

# LSTM Mathematics: Forget Gate

**Purpose:** Decide what information to throw away from the cell state

**Formula:**

```
f_t = σ(W_f · [h_{t-1}, x_t] + b_f)
```

**Components:**

- `W_f`: Weight matrix for forget gate
- `h_{t-1}`: Previous hidden state
- `x_t`: Current input
- `σ`: Sigmoid function (outputs 0 to 1)
- `b_f`: Bias term

**Output:** Vector of values between 0 (forget) and 1 (keep)

---

<!-- _class: light -->

# LSTM Mathematics: Input Gate

**Purpose:** Decide what new information to store in the cell state

**Two-step process:**

**Step 1 - Input Gate:**

```
i_t = σ(W_i · [h_{t-1}, x_t] + b_i)
```

**Step 2 - Candidate Values:**

```
C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C)
```

- `i_t`: Determines which values to update (0 to 1)
- `C̃_t`: New candidate values to add (-1 to 1)

---

# LSTM Mathematics: Cell State Update

**Purpose:** Update the cell state by combining forget and input operations

**Formula:**

```
C_t = f_t ⊙ C_{t-1} + i_t ⊙ C̃_t
```

**Breakdown:**

- `f_t ⊙ C_{t-1}`: Keep what forget gate says to remember
- `i_t ⊙ C̃_t`: Add what input gate says is important
- `⊙`: Element-wise multiplication (Hadamard product)

**Result:** Updated memory state carrying forward relevant information

---

<!-- _class: light -->

# LSTM Mathematics: Output Gate

**Purpose:** Decide what to output from the current cell state

**Two-step process:**

**Step 1 - Output Gate:**

```
o_t = σ(W_o · [h_{t-1}, x_t] + b_o)
```

**Step 2 - Hidden State:**

```
h_t = o_t ⊙ tanh(C_t)
```

- `o_t`: Determines what parts of cell state to output
- `h_t`: Final hidden state (used for predictions and next timestep)

---

# Complete LSTM Equations

```
Forget Gate:    f_t = σ(W_f · [h_{t-1}, x_t] + b_f)

Input Gate:     i_t = σ(W_i · [h_{t-1}, x_t] + b_i)

Candidate:      C̃_t = tanh(W_C · [h_{t-1}, x_t] + b_C)

Cell State:     C_t = f_t ⊙ C_{t-1} + i_t ⊙ C̃_t

Output Gate:    o_t = σ(W_o · [h_{t-1}, x_t] + b_o)

Hidden State:   h_t = o_t ⊙ tanh(C_t)
```

**All gates work in parallel, controlled by learned weight matrices**

---

# LSTM Cell Diagram: Information Flow

```
                    ┌─────────────────┐
                    │   Cell State    │
      C_{t-1} ─────►│      C_t        │─────► C_t
         │          └─────────────────┘        │
         │                  ▲                  │
         │                  │                  │
         ▼                  │                  ▼
      ┌──────┐         ┌────────┐         ┌──────┐
      │  ×   │         │   +    │         │ tanh │
      └──────┘         └────────┘         └──────┘
         ▲                  ▲                  │
         │                  │                  │
      ┌──────┐         ┌────────┐         ┌──────┐
      │  f_t │         │   i_t  │         │  o_t │
      └──────┘         │   ×    │         └──────┘
         ▲             │  C̃_t   │             │
         │             └────────┘             │
         │                  ▲                 │
         └──────────────────┴─────────────────┘
                            │
                     [h_{t-1}, x_t]
```

---

<!-- _class: light -->

# Gate Operations Visualized

**Forget Gate (f_t):**
`[0.1, 0.9, 0.3] → Nearly forget first value, keep second`

**Input Gate (i_t) × Candidate (C̃_t):**
`[0.8, 0.2, 0.7] × [-0.5, 0.9, 0.3] = [-0.4, 0.18, 0.21]`
`Add these values to cell state`

**Output Gate (o_t):**
`[0.9, 0.4, 0.6] × tanh(C_t) → Filter cell state for output`

**Each gate learns what information is important through training**

---

# LSTM vs Standard RNN

| Feature             | Standard RNN    | LSTM                        |
| ------------------- | --------------- | --------------------------- |
| **Memory**          | Short-term only | Long-term + short-term      |
| **Parameters**      | W, U, b         | W_f, W_i, W_C, W_o + biases |
| **Gradients**       | Vanish quickly  | Protected by cell state     |
| **Training Time**   | Fast            | 3-4× slower                 |
| **Sequence Length** | <10 steps       | 100+ steps                  |
| **Use Case**        | Simple patterns | Complex dependencies        |

---

<!-- _class: light -->

# Use Case 1: Natural Language Processing

### **Machine Translation**

- Encoder-decoder with attention
- Handles variable-length sequences
- Captures context across sentences

### **Sentiment Analysis**

- Understands negations: "not bad" vs "bad"
- Captures long-distance dependencies
- State-of-the-art until BERT/Transformers

### **Text Generation**

- Character-level or word-level prediction
- Maintains coherent style over paragraphs

---

# Use Case 2: Time Series Prediction

### **Stock Price Forecasting**

- Learns from historical patterns
- Handles irregular intervals
- Multi-step ahead prediction

### **Weather Forecasting**

- Processes multiple meteorological variables
- Captures seasonal patterns
- Long-term dependency modeling

### **Energy Load Prediction**

- Demand forecasting for power grids
- Accounts for weekly/daily cycles

---

<!-- _class: light -->

# Use Case 3: Speech & Audio

### **Speech Recognition**

- Maps audio sequences to text
- Handles variable-length inputs
- Google Voice, Siri foundations

### **Music Generation**

- Learns musical patterns and structure
- Generates coherent melodies
- Style transfer between composers

### **Speaker Identification**

- Analyzes voice characteristics over time
- Robust to background noise

---

# Use Case 4: Video & Vision

### **Video Captioning**

- Describes events in video sequences
- Combines CNN (spatial) + LSTM (temporal)

### **Action Recognition**

- Classifies activities across frames
- Sports analytics, surveillance

### **Handwriting Recognition**

- Alex Graves' breakthrough work (2013)
- Handles variable-length sequences
- Online and offline recognition

---

<!-- _class: light -->

# Use Case 5: Specialized Domains

### **Protein Structure Prediction**

- Sequence-to-structure mapping
- Learns amino acid dependencies

### **Anomaly Detection**

- Network traffic monitoring
- Industrial sensor data
- Predicts normal, flags deviations

### **Recommendation Systems**

- Sequential user behavior modeling
- Next-item prediction
- Session-based recommendations

---

# Limitations & Drawbacks

### **1. Computational Cost**

- 3-4× more parameters than simple RNN
- Slower training and inference
- Higher memory requirements

### **2. Sequential Processing**

- Cannot parallelize across time steps
- Unlike Transformers which process all tokens simultaneously
- Limits scalability on modern hardware (GPUs/TPUs)

---

<!-- _class: light -->

# Drawbacks (Continued)

### **3. Fixed Context Window**

- Hidden state has fixed dimensionality
- Information bottleneck for very long sequences
- Degradation after 100-200 timesteps

### **4. Training Complexity**

- Requires careful hyperparameter tuning
- Learning rate, gradient clipping crucial
- Prone to overfitting on small datasets

### **5. Superseded by Transformers**

- Attention mechanisms more effective for many NLP tasks
- BERT, GPT models outperform on benchmarks
- Still relevant for streaming data and limited compute

---

# When to Use LSTMs (2024+)

### **✓ Good Fit:**

- Streaming data / online learning
- Resource-constrained environments
- Time series with strong temporal patterns
- When you need fast inference

### **✗ Consider Alternatives:**

- Large-scale text modeling → Transformers
- Fixed-length sequences → 1D CNNs
- Very long sequences (1000+) → Transformers with sparse attention
- Simple patterns → GRU (fewer parameters)

---

<!-- _class: light -->

# Python Implementation: Setup

```python
import numpy as np
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.layers import LSTM, Dense, Embedding
from tensorflow.keras.models import Sequential
from tensorflow.keras.preprocessing.sequence import pad_sequences
from sklearn.model_selection import train_test_split

# For visualization
import matplotlib.pyplot as plt

# Check GPU availability
print("GPUs Available:",
      tf.config.list_physical_devices('GPU'))
```

---

# Example 1: Simple Sequence Prediction

```python
# Generate synthetic sequential data
def generate_sequence(length=50):
    """Generate a sine wave with noise"""
    x = np.linspace(0, 4*np.pi, length)
    y = np.sin(x) + np.random.normal(0, 0.1, length)
    return y

# Create dataset
sequences = [generate_sequence() for _ in range(1000)]
X, y = [], []

for seq in sequences:
    for i in range(len(seq)-10):
        X.append(seq[i:i+10])
        y.append(seq[i+10])

X = np.array(X).reshape(-1, 10, 1)
y = np.array(y)
```

---

<!-- _class: light -->

# Example 1: Build LSTM Model

```python
# Build the model
model = Sequential([
    LSTM(50, activation='tanh', input_shape=(10, 1),
         return_sequences=False),
    Dense(25, activation='relu'),
    Dense(1)
])

# Compile
model.compile(
    optimizer='adam',
    loss='mse',
    metrics=['mae']
)

# Train
history = model.fit(
    X, y,
    epochs=20,
    batch_size=32,
    validation_split=0.2,
    verbose=1
)
```

---

# Example 2: Text Generation with LSTM

```python
# Sample text preprocessing
text = "your long text here..."
chars = sorted(list(set(text)))
char_to_idx = {c: i for i, c in enumerate(chars)}
idx_to_char = {i: c for i, c in enumerate(chars)}

# Create sequences
seq_length = 40
sequences = []
next_chars = []

for i in range(len(text) - seq_length):
    sequences.append(text[i:i+seq_length])
    next_chars.append(text[i+seq_length])

# Encode
X = np.zeros((len(sequences), seq_length, len(chars)))
y = np.zeros((len(sequences), len(chars)))

for i, seq in enumerate(sequences):
    for t, char in enumerate(seq):
        X[i, t, char_to_idx[char]] = 1
    y[i, char_to_idx[next_chars[i]]] = 1
```

---

<!-- _class: light -->

# Example 2: Text Generation Model

```python
# Build character-level LSTM
model = Sequential([
    LSTM(128, input_shape=(seq_length, len(chars)),
         return_sequences=True),
    LSTM(128),
    Dense(len(chars), activation='softmax')
])

model.compile(
    optimizer='adam',
    loss='categorical_crossentropy'
)

# Train
model.fit(X, y, epochs=50, batch_size=128)

# Generate text
def generate_text(model, seed, length=200):
    generated = seed
    for _ in range(length):
        x = np.zeros((1, seq_length, len(chars)))
        for t, char in enumerate(seed):
            x[0, t, char_to_idx[char]] = 1

        pred = model.predict(x, verbose=0)
        next_char = idx_to_char[np.argmax(pred)]
        generated += next_char
        seed = seed[1:] + next_char
    return generated
```

---

# Example 3: Stock Price Prediction

```python
from sklearn.preprocessing import MinMaxScaler

# Load and preprocess stock data
# Assume 'df' has a 'Close' column with prices
data = df['Close'].values.reshape(-1, 1)

# Normalize
scaler = MinMaxScaler(feature_range=(0, 1))
scaled_data = scaler.fit_transform(data)

# Create sequences (use 60 days to predict next day)
sequence_length = 60
X, y = [], []

for i in range(sequence_length, len(scaled_data)):
    X.append(scaled_data[i-sequence_length:i, 0])
    y.append(scaled_data[i, 0])

X = np.array(X)
y = np.array(y)
X = X.reshape(X.shape[0], X.shape[1], 1)
```

---

<!-- _class: light -->

# Example 3: Stock Model Architecture

```python
# Build multi-layer LSTM for stock prediction
model = Sequential([
    LSTM(50, return_sequences=True,
         input_shape=(sequence_length, 1)),
    LSTM(50, return_sequences=True),
    LSTM(50),
    Dense(25),
    Dense(1)
])

model.compile(optimizer='adam', loss='mean_squared_error')

# Train
model.fit(X, y, epochs=25, batch_size=32,
          validation_split=0.1)

# Make predictions
predictions = model.predict(X_test)
predictions = scaler.inverse_transform(predictions)

# Calculate metrics
from sklearn.metrics import mean_squared_error, r2_score
rmse = np.sqrt(mean_squared_error(y_test_actual, predictions))
r2 = r2_score(y_test_actual, predictions)
print(f"RMSE: {rmse}, R²: {r2}")
```

---

# Example 4: Sentiment Analysis

```python
from tensorflow.keras.datasets import imdb
from tensorflow.keras.preprocessing import sequence

# Load IMDB dataset
max_features = 10000  # vocabulary size
maxlen = 500  # max sequence length

(X_train, y_train), (X_test, y_test) = imdb.load_data(
    num_words=max_features
)

# Pad sequences
X_train = sequence.pad_sequences(X_train, maxlen=maxlen)
X_test = sequence.pad_sequences(X_test, maxlen=maxlen)

print(f"Training shape: {X_train.shape}")
print(f"Testing shape: {X_test.shape}")
```

---

<!-- _class: light -->

# Example 4: Sentiment Model

```python
# Build sentiment classification model
model = Sequential([
    Embedding(max_features, 128, input_length=maxlen),
    LSTM(64, dropout=0.2, recurrent_dropout=0.2),
    Dense(1, activation='sigmoid')
])

model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Train
history = model.fit(
    X_train, y_train,
    epochs=10,
    batch_size=64,
    validation_data=(X_test, y_test)
)

# Evaluate
loss, accuracy = model.evaluate(X_test, y_test)
print(f"Test Accuracy: {accuracy:.4f}")
```

---

# Advanced: Bidirectional LSTM

```python
from tensorflow.keras.layers import Bidirectional

# Bidirectional LSTM processes sequence both ways
model = Sequential([
    Embedding(max_features, 128),
    Bidirectional(LSTM(64, return_sequences=True)),
    Bidirectional(LSTM(32)),
    Dense(64, activation='relu'),
    Dense(1, activation='sigmoid')
])

# Benefits:
# - Captures context from past AND future
# - Better for tasks where entire sequence is available
# - Common in NLP, speech recognition
# - 2× parameters compared to unidirectional LSTM
```

---

<!-- _class: light -->

# Advanced: Stacked LSTM

```python
# Multiple LSTM layers for complex patterns
model = Sequential([
    LSTM(128, return_sequences=True, input_shape=(timesteps, features)),
    LSTM(64, return_sequences=True),
    LSTM(32, return_sequences=False),
    Dense(16, activation='relu'),
    Dense(output_dim)
])

# Key points:
# - return_sequences=True for all but last LSTM
# - Each layer learns different abstraction levels
# - More prone to overfitting (use dropout)
# - Typical depth: 2-4 layers
```

---

# Training Best Practices

### **1. Gradient Clipping**

```python
optimizer = keras.optimizers.Adam(clipnorm=1.0)
# or
optimizer = keras.optimizers.Adam(clipvalue=0.5)
```

### **2. Dropout & Regularization**

```python
LSTM(64, dropout=0.2, recurrent_dropout=0.2)
```

### **3. Early Stopping**

```python
early_stop = keras.callbacks.EarlyStopping(
    monitor='val_loss', patience=5, restore_best_weights=True
)
model.fit(X, y, callbacks=[early_stop])
```

---

<!-- _class: light -->

# Hyperparameter Tuning Guide

| Parameter           | Typical Range | Impact                       |
| ------------------- | ------------- | ---------------------------- |
| **Units**           | 32-512        | More = more capacity, slower |
| **Layers**          | 1-4           | Deeper = complex patterns    |
| **Dropout**         | 0.0-0.5       | Prevents overfitting         |
| **Learning Rate**   | 1e-4 to 1e-2  | Critical for convergence     |
| **Batch Size**      | 16-128        | Larger = faster, less stable |
| **Sequence Length** | 10-500        | Task dependent               |

**Start small, scale up as needed!**

---

# Debugging Common Issues

### **Loss not decreasing?**

- Check learning rate (try 1e-3, 1e-4)
- Verify data normalization
- Ensure labels are correct

### **Overfitting?**

- Add dropout (0.2-0.4)
- Reduce model size
- Get more training data
- Use early stopping

### **Exploding gradients?**

- Use gradient clipping
- Reduce learning rate
- Check for data outliers

---

<!-- _class: light -->

# Performance Optimization

### **1. Batch Processing**

```python
# Use generators for large datasets
def data_generator(X, y, batch_size):
    while True:
        for i in range(0, len(X), batch_size):
            yield X[i:i+batch_size], y[i:i+batch_size]
```

### **2. Mixed Precision Training**

```python
from tensorflow.keras import mixed_precision
policy = mixed_precision.Policy('mixed_float16')
mixed_precision.set_global_policy(policy)
```

### **3. XLA Compilation**

```python
model.compile(optimizer='adam', loss='mse', jit_compile=True)
```

---

# Saving & Loading Models

```python
# Save entire model
model.save('lstm_model.h5')

# Load model
loaded_model = keras.models.load_model('lstm_model.h5')

# Save weights only
model.save_weights('lstm_weights.h5')

# Load weights
model.load_weights('lstm_weights.h5')

# Save architecture as JSON
json_config = model.to_json()
with open('model_config.json', 'w') as f:
    f.write(json_config)

# Load from JSON
with open('model_config.json', 'r') as f:
    loaded_model = keras.models.model_from_json(f.read())
```

---

<!-- _class: light -->

# Visualizing Training

```python
import matplotlib.pyplot as plt

def plot_history(history):
    fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(12, 4))

    # Loss
    ax1.plot(history.history['loss'], label='Train')
    ax1.plot(history.history['val_loss'], label='Validatio
```
