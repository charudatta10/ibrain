---
title: "Recurrent Neural Networks (RNN)"
description: "Published from /C:/Users/korde/Home/Github/notes/pages/nlp_01.md"
---
<div class="note-properties">
  <div class="note-property-row"><span class="note-property-key">marp</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">theme</span><span class="note-property-value">default</span></div>
  <div class="note-property-row"><span class="note-property-key">paginate</span><span class="note-property-value">true</span></div>
</div>

## A Detailed Exploration

Understanding Sequential Data Processing

---

# What is an RNN?

A **Recurrent Neural Network** is a type of neural network designed for sequential data.

**Key Characteristic:** Networks with loops, allowing information to persist.

**Applications:**

- Natural Language Processing (text generation, translation)
- Speech recognition
- Time series prediction
- Video analysis

---

# Why RNNs? The Sequential Data Problem

Traditional neural networks process inputs independently:

- Each input is treated in isolation
- No memory of previous inputs
- Cannot handle variable-length sequences

**Example:** Understanding "The cat sat on the mat"

- Word order matters
- Context from previous words is crucial
- Each word depends on what came before

---

# RNN Architecture Overview

````
Input Sequence: x₁, x₂, x₃, ..., xₜ
         ↓      ↓      ↓         ↓
             [RNN] → [RNN] → [RNN] → [RNN]
                   ↓       ↓       ↓        ↓
                       h₁      h₂      h₃       hₜ
                             ↓       ↓       ↓        ↓
                                 y₁      y₂      y₃       yₜ
                                 ```

                                 **Components:**
                                 - **xₜ**: Input at time step t
                                 - **hₜ**: Hidden state (memory) at time t
                                 - **yₜ**: Output at time step t

                                 ---

                                 # How a Single RNN Neuron Works

                                 ## The Core Equation

                                 At each time step t:

                                 **hₜ = tanh(Wₓₓ · xₜ + Wₕₕ · hₜ₋₁ + bₕ)**
                                 **yₜ = Wₕᵧ · hₜ + bᵧ**

                                 Where:
                                 - **hₜ**: Current hidden state
                                 - **xₜ**: Current input
                                 - **hₜ₋₁**: Previous hidden state (memory)
                                 - **W**: Weight matrices
                                 - **b**: Bias vectors

                                 ---

                                 # Single Neuron Visualization

                                 ```
                                 Previous Hidden State (hₜ₋₁)
                                          │
                                                   ├──────────┐
                                                            │          │
                                                                ┌────▼────┐     │
                                                                    │  Wₕₕ    │     │
                                                                        └────┬────┘     │
                                                                                 │          │
                                                                                          │     ┌────▼────┐
                                                                                              xₜ ──┼────►│   +     │───► tanh ───► hₜ
                                                                                                       │     └────▲────┘
                                                                                                           ┌────▼────┐     │
                                                                                                               │  Wₓₓ    │     │
                                                                                                                   └─────────┘     │
                                                                                                                                       │
                                                                                                                                                          bₕ
                                                                                                                                                          ```

                                                                                                                                                          **The neuron combines current input with past memory!**

                                                                                                                                                          ---

                                                                                                                                                          # Step-by-Step: Single Neuron Computation

                                                                                                                                                          **Given:**
                                                                                                                                                          - Input: xₜ = [0.5]
                                                                                                                                                          - Previous hidden: hₜ₋₁ = [0.3]
                                                                                                                                                          - Weights: Wₓₓ = [0.8], Wₕₕ = [0.6]
                                                                                                                                                          - Bias: bₕ = [0.1]

                                                                                                                                                          **Computation:**
                                                                                                                                                          1. Input contribution: 0.8 × 0.5 = 0.4
                                                                                                                                                          2. Memory contribution: 0.6 × 0.3 = 0.18
                                                                                                                                                          3. Sum with bias: 0.4 + 0.18 + 0.1 = 0.68
                                                                                                                                                          4. Activation: hₜ = tanh(0.68) ≈ 0.59

                                                                                                                                                          **Result:** Hidden state hₜ = [0.59] carries forward to next step!

                                                                                                                                                          ---

                                                                                                                                                          # Unfolding Through Time

                                                                                                                                                          **Time Step 1:**
                                                                                                                                                          h₁ = tanh(Wₓₓ·x₁ + Wₕₕ·h₀ + bₕ)

                                                                                                                                                          **Time Step 2:**
                                                                                                                                                          h₂ = tanh(Wₓₓ·x₂ + Wₕₕ·h₁ + bₕ)

                                                                                                                                                          **Time Step 3:**
                                                                                                                                                          h₃ = tanh(Wₓₓ·x₃ + Wₕₕ·h₂ + bₕ)

                                                                                                                                                          **Notice:** Same weights (Wₓₓ, Wₕₕ) are reused at each step!
                                                                                                                                                          This is called **parameter sharing**.

                                                                                                                                                          ---

                                                                                                                                                          # Problem 1: Vanishing Gradients

                                                                                                                                                          ## The Core Issue

                                                                                                                                                          During backpropagation through time, gradients are multiplied repeatedly:

                                                                                                                                                          ∂L/∂h₁ = ∂L/∂hₜ · ∂hₜ/∂hₜ₋₁ · ∂hₜ₋₁/∂hₜ₋₂ · ... · ∂h₂/∂h₁

                                                                                                                                                          If gradients < 1, repeated multiplication causes them to **vanish** (approach 0)

                                                                                                                                                          **Consequence:** Network can't learn long-term dependencies

                                                                                                                                                          ---

                                                                                                                                                          # Vanishing Gradient Visualization

                                                                                                                                                          ```
                                                                                                                                                          Gradient magnitude through time:

                                                                                                                                                          Time:  t=10  t=9  t=8  t=7  t=6  t=5  t=4  t=3  t=2  t=1
                                                                                                                                                                 │     │    │    │    │    │    │    │    │    │
                                                                                                                                                                 Grad:  1.0 → 0.8 → 0.6 → 0.4 → 0.3 → 0.2 → 0.1 → 0.05→ 0.01→ 0.001

                                                                                                                                                                 After 10 steps: gradient is 0.001 (almost zero!)
                                                                                                                                                                 ```

                                                                                                                                                                 **Impact:** Early time steps receive almost no learning signal
                                                                                                                                                                 **Result:** Cannot learn from distant past information

                                                                                                                                                                 ---

                                                                                                                                                                 # Problem 2: Exploding Gradients

                                                                                                                                                                 ## The Opposite Problem

                                                                                                                                                                 If gradients > 1, repeated multiplication causes them to **explode**

                                                                                                                                                                 **Example:**
                                                                                                                                                                 - Each step multiplies by 1.1
                                                                                                                                                                 - After 50 steps: 1.1⁵⁰ ≈ 117

                                                                                                                                                                 **Consequences:**
                                                                                                                                                                 - Numerical instability (NaN values)
                                                                                                                                                                 - Massive weight updates
                                                                                                                                                                 - Training divergence

                                                                                                                                                                 ---

                                                                                                                                                                 # Problem 3: Short-Term Memory

                                                                                                                                                                 RNNs struggle to retain information over long sequences:

                                                                                                                                                                 **Example Sentence:**
                                                                                                                                                                 "The cat, which was sitting on the mat that I bought last week at the store downtown, was sleeping"

                                                                                                                                                                 **Challenge:** Connecting "cat" with "was sleeping" when separated by many words

                                                                                                                                                                 **Why?** Information in hidden state gets overwritten with each new input

                                                                                                                                                                 ---

                                                                                                                                                                 # Solution 1: LSTM (Long Short-Term Memory)

                                                                                                                                                                 ## Architecture Enhancement

                                                                                                                                                                 LSTM adds a **cell state** (Cₜ) - a highway for information:

                                                                                                                                                                 **Gates:**
                                                                                                                                                                 - **Forget Gate (fₜ):** What to remove from memory
                                                                                                                                                                 - **Input Gate (iₜ):** What new info to store
                                                                                                                                                                 - **Output Gate (oₜ):** What to output from memory

                                                                                                                                                                 These gates control information flow, preventing vanishing gradients!

                                                                                                                                                                 ---

                                                                                                                                                                 # LSTM Equations

                                                                                                                                                                 **Forget Gate:**
                                                                                                                                                                 fₜ = σ(Wf · [hₜ₋₁, xₜ] + bf)

                                                                                                                                                                 **Input Gate:**
                                                                                                                                                                 iₜ = σ(Wi · [hₜ₋₁, xₜ] + bi)

                                                                                                                                                                 **Candidate Memory:**
                                                                                                                                                                 C̃ₜ = tanh(Wc · [hₜ₋₁, xₜ] + bc)

                                                                                                                                                                 **Cell State Update:**
                                                                                                                                                                 Cₜ = fₜ ⊙ Cₜ₋₁ + iₜ ⊙ C̃ₜ

                                                                                                                                                                 **Output Gate:**
                                                                                                                                                                 oₜ = σ(Wo · [hₜ₋₁, xₜ] + bo)
                                                                                                                                                                 hₜ = oₜ ⊙ tanh(Cₜ)

                                                                                                                                                                 ---

                                                                                                                                                                 # LSTM vs Standard RNN

                                                                                                                                                                 **Standard RNN:**
                                                                                                                                                                 - Single hidden state
                                                                                                                                                                 - Information easily overwritten
                                                                                                                                                                 - Vanishing gradient problem

                                                                                                                                                                 **LSTM:**
                                                                                                                                                                 - Cell state + hidden state
                                                                                                                                                                 - Controlled information flow via gates
                                                                                                                                                                 - Gradient flows more easily through cell state
                                                                                                                                                                 - Can remember information for 100+ time steps

                                                                                                                                                                 ---

                                                                                                                                                                 # Solution 2: GRU (Gated Recurrent Unit)

                                                                                                                                                                 ## Simplified LSTM Alternative

                                                                                                                                                                 **Gates:**
                                                                                                                                                                 - **Reset Gate (rₜ):** How much past info to forget
                                                                                                                                                                 - **Update Gate (zₜ):** How much to update hidden state

                                                                                                                                                                 **Advantages:**
                                                                                                                                                                 - Fewer parameters than LSTM
                                                                                                                                                                 - Faster training
                                                                                                                                                                 - Similar performance for many tasks

                                                                                                                                                                 ---

                                                                                                                                                                 # GRU Equations

                                                                                                                                                                 **Update Gate:**
                                                                                                                                                                 zₜ = σ(Wz · [hₜ₋₁, xₜ] + bz)

                                                                                                                                                                 **Reset Gate:**
                                                                                                                                                                 rₜ = σ(Wr · [hₜ₋₁, xₜ] + br)

                                                                                                                                                                 **Candidate Hidden State:**
                                                                                                                                                                 h̃ₜ = tanh(W · [rₜ ⊙ hₜ₋₁, xₜ] + b)

                                                                                                                                                                 **Final Hidden State:**
                                                                                                                                                                 hₜ = (1 - zₜ) ⊙ hₜ₋₁ + zₜ ⊙ h̃ₜ

                                                                                                                                                                 ---

                                                                                                                                                                 # Solution 3: Gradient Clipping

                                                                                                                                                                 ## Preventing Exploding Gradients

                                                                                                                                                                 **Technique:** Cap gradient magnitude during backpropagation

                                                                                                                                                                 ```python
                                                                                                                                                                 if gradient_norm > threshold:
                                                                                                                                                                     gradient = gradient * (threshold / gradient_norm)
                                                                                                                                                                     ```

                                                                                                                                                                     **Parameters:**
                                                                                                                                                                     - Common threshold: 5 or 10
                                                                                                                                                                     - Applied to entire gradient vector

                                                                                                                                                                     **Result:** Training stability, especially in early phases

                                                                                                                                                                     ---

                                                                                                                                                                     # Solution 4: Better Initialization

                                                                                                                                                                     ## Xavier/He Initialization

                                                                                                                                                                     Instead of random weights, use carefully scaled initialization:

                                                                                                                                                                     **Xavier:** W ~ N(0, 2/(nᵢₙ + nₒᵤₜ))
                                                                                                                                                                     **He:** W ~ N(0, 2/nᵢₙ)

                                                                                                                                                                     **Benefits:**
                                                                                                                                                                     - Gradients neither vanish nor explode initially
                                                                                                                                                                     - Faster convergence
                                                                                                                                                                     - More stable training

                                                                                                                                                                     ---

                                                                                                                                                                     # Solution 5: Bidirectional RNNs

                                                                                                                                                                     ## Processing Both Directions

                                                                                                                                                                     ```
                                                                                                                                                                     Forward:  x₁ → x₂ → x₃ → x₄
                                                                                                                                                                                 ↓    ↓    ↓    ↓
                                                                                                                                                                                            h₁ → h₂ → h₃ → h₄

                                                                                                                                                                                            Backward: x₁ ← x₂ ← x₃ ← x₄
                                                                                                                                                                                                        ↓    ↓    ↓    ↓
                                                                                                                                                                                                                   h₁ ← h₂ ← h₃ ← h₄

                                                                                                                                                                                                                   Output: Concatenate forward and backward states
                                                                                                                                                                                                                   ```

                                                                                                                                                                                                                   **Advantage:** Each position has context from past AND future

                                                                                                                                                                                                                   ---

                                                                                                                                                                                                                   # Comparison: RNN Variants

                                                                                                                                                                                                                   | Feature | RNN | LSTM | GRU |
                                                                                                                                                                                                                   |---------|-----|------|-----|
                                                                                                                                                                                                                   | Parameters | Low | High | Medium |
                                                                                                                                                                                                                   | Training Speed | Fast | Slow | Medium |
                                                                                                                                                                                                                   | Long-term Memory | Poor | Excellent | Very Good |
                                                                                                                                                                                                                   | Vanishing Gradient | Yes | No | No |
                                                                                                                                                                                                                   | Complexity | Simple | Complex | Moderate |

                                                                                                                                                                                                                   **When to use each?**
                                                                                                                                                                                                                   - RNN: Short sequences, simple patterns
                                                                                                                                                                                                                   - LSTM: Long sequences, complex dependencies
                                                                                                                                                                                                                   - GRU: Good balance, faster than LSTM

                                                                                                                                                                                                                   ---

                                                                                                                                                                                                                   # Practical Example: Sentiment Analysis

                                                                                                                                                                                                                   **Input:** "This movie was absolutely terrible"

                                                                                                                                                                                                                   **Processing:**
                                                                                                                                                                                                                   1. "This" → h₁ (neutral context)
                                                                                                                                                                                                                   2. "movie" → h₂ (movie domain)
                                                                                                                                                                                                                   3. "was" → h₃ (past tense)
                                                                                                                                                                                                                   4. "absolutely" → h₄ (intensifier detected)
                                                                                                                                                                                                                   5. "terrible" → h₅ (negative + intensifier = very negative)

                                                                                                                                                                                                                   **Output:** Negative sentiment (0.95 confidence)

                                                                                                                                                                                                                   **Key:** Each word updates the hidden state, building understanding

                                                                                                                                                                                                                   ---

                                                                                                                                                                                                                   # Training RNNs: Backpropagation Through Time

                                                                                                                                                                                                                   **Steps:**
                                                                                                                                                                                                                   1. Forward pass through entire sequence
                                                                                                                                                                                                                   2. Compute loss at each/final time step
                                                                                                                                                                                                                   3. Backward pass from end to start
                                                                                                                                                                                                                   4. Accumulate gradients
                                                                                                                                                                                                                   5. Update weights

                                                                                                                                                                                                                   **Challenge:** Requires storing all intermediate states (memory intensive)

                                                                                                                                                                                                                   **Solution:** Truncated BPTT - only backpropagate k steps

                                                                                                                                                                                                                   ---

                                                                                                                                                                                                                   # Modern Alternatives: Attention & Transformers

                                                                                                                                                                                                                   **Limitation of RNNs:**
                                                                                                                                                                                                                   - Sequential processing (slow on GPUs)
                                                                                                                                                                                                                   - Still struggle with very long sequences

                                                                                                                                                                                                                   **Solution: Transformers**
                                                                                                                                                                                                                   - Process entire sequence in parallel
                                                                                                                                                                                                                   - Attention mechanism focuses on relevant parts
                                                                                                                                                                                                                   - Powers ChatGPT, BERT, GPT-4

                                                                                                                                                                                                                   **Note:** Transformers largely replaced RNNs for NLP, but RNNs still useful for time-series and streaming data

                                                                                                                                                                                                                   ---

                                                                                                                                                                                                                   # Key Takeaways

                                                                                                                                                                                                                   1. **RNNs** process sequential data by maintaining hidden state (memory)
                                                                                                                                                                                                                   2. **Single neuron** combines current input with previous state via weighted sum + activation
                                                                                                                                                                                                                   3. **Main problems:** Vanishing/exploding gradients, short-term memory
                                                                                                                                                                                                                   4. **Solutions:** LSTM/GRU gates, gradient clipping, better initialization
                                                                                                                                                                                                                   5. **LSTM/GRU** enable learning long-term dependencies through controlled information flow
                                                                                                                                                                                                                   6. **Bidirectional** RNNs capture both past and future context

                                                                                                                                                                                                                   ---

                                                                                                                                                                                                                   # Resources for Further Learning

                                                                                                                                                                                                                   **Papers:**
                                                                                                                                                                                                                   - "Learning Long-term Dependencies with Gradient Descent is Difficult" (Bengio et al., 1994)
                                                                                                                                                                                                                   - "Long Short-Term Memory" (Hochreiter & Schmidhuber, 1997)
                                                                                                                                                                                                                   - "Learning Phrase Representations using RNN Encoder-Decoder" (Cho et al., 2014)

                                                                                                                                                                                                                   **Practice:**
                                                                                                                                                                                                                   - Implement basic RNN from scratch
                                                                                                                                                                                                                   - Try LSTM for text generation
                                                                                                                                                                                                                   - Compare RNN vs LSTM on sequence tasks

                                                                                                                                                                                                                   ---

                                                                                                                                                                                                                   # Thank You!

                                                                                                                                                                                                                   ## Questions?

                                                                                                                                                                                                                   **Remember:**
                                                                                                                                                                                                                   - RNNs = Memory for sequences
                                                                                                                                                                                                                   - Gates = Control for long-term learning
                                                                                                                                                                                                                   - Practice makes perfect!
````
