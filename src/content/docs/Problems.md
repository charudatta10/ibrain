---
title: "Problems"
description: "Published from /C:/Users/korde/Home/Github/notes/Problems.md"
---
## **RNN Forward Pass - Question Bank**

### **Level 1: Basic Hidden State Computation**

**Q1.** Given an RNN with hidden size h=2 and input size x=2. At timestep t:

- x_t = [0.5, 0.3]
- h\_{t-1} = [0.1, 0.2]
- W_xh = [[0.4, 0.3], [0.2, 0.1]]
- W_hh = [[0.5, 0.2], [0.1, 0.4]]
- b_h = [0.1, 0.2]

Calculate the hidden state h_t (use tanh activation).

**Q2.** For an RNN with h=1, x=1:

- x_t = [0.8]
- h\_{t-1} = [0.5]
- W_xh = [0.3]
- W_hh = [0.6]
- b_h = [0.1]

Calculate h_t step-by-step.

**Q3.** Given:

- x_t = [1.0, 0.0, 0.5]
- h\_{t-1} = [0.0, 0.0]
- W_xh = [[0.2, 0.3, 0.1], [0.4, 0.2, 0.5]]
- W_hh = [[0.3, 0.2], [0.1, 0.4]]
- b_h = [0.0, 0.0]

Compute the pre-activation values and then h_t.

### **Level 2: Output Layer Computation**

**Q4.** After computing h_t = [0.6, 0.4], calculate the output y_t with:

- W_hy = [[0.5, 0.3], [0.2, 0.7], [0.1, 0.4]]
- b_y = [0.1, 0.2, 0.0]
- Output activation: softmax

**Q5.** For binary classification with:

- h_t = [0.3, 0.5]
- W_hy = [[0.4], [0.6]]
- b_y = [0.2]
- Output activation: sigmoid

Calculate the probability output.

**Q6.** For regression with:

- h_t = [0.2, 0.8, 0.5]
- W_hy = [[0.3, 0.2, 0.4]]
- b_y = [0.1]
- Output activation: none (linear)

Calculate y_t.

### **Level 3: Multi-Timestep Forward Pass**

**Q7.** Complete forward pass for 3 timesteps with h=2, x=1:

- Initial: h_0 = [0.0, 0.0]
- Inputs: x_1 = [1.0], x_2 = [0.5], x_3 = [0.2]
- W_xh = [[0.3], [0.4]]
- W_hh = [[0.2, 0.1], [0.3, 0.5]]
- b_h = [0.0, 0.0]

Calculate h_1, h_2, and h_3.

**Q8.** For the sequence "ABC" encoded as one-hot vectors (A=[1,0,0], B=[0,1,0], C=[0,0,1]):

- h=2
- W_xh = [[0.5, 0.2, 0.3], [0.1, 0.4, 0.2]]
- W_hh = [[0.3, 0.2], [0.1, 0.5]]
- b_h = [0.1, 0.1]
- h_0 = [0.0, 0.0]

Process the entire sequence and show h_1, h_2, h_3.

**Q9.** Given outputs from Q7 (h_1, h_2, h_3), if we want to predict the next value at each timestep:

- W_hy = [[0.4, 0.3]]
- b_y = [0.0]

Calculate y_1, y_2, and y_3.

### **Level 4: Activation Functions**

**Q10.** Calculate manually (show work):

- tanh(0.0) = ?
- tanh(1.0) = ?
- tanh(-0.5) = ?
- tanh(∞) = ?

**Q11.** Given pre-activation values z = [0.5, -0.3, 1.2], compute tanh(z) element-wise.

**Q12.** Compute the softmax for output logits:

- z = [2.0, 1.0, 0.1]
- Show exp(z_i) for each element
- Show the normalized probabilities

### **Level 5: Matrix Dimensions**

**Q13.** An RNN has input size d_x = 50 and hidden size d_h = 100. What are the dimensions of:

- W_xh?
- W_hh?
- b_h?

**Q14.** For output layer with hidden size d_h = 100 and output size d_y = 10:

- What is the dimension of W_hy?
- What is the dimension of b_y?

**Q15.** For a batch of B=32 sequences, each of length T=10, input size d_x=20, hidden size d_h=50:

- What is the shape of the input tensor x?
- What is the shape of h_t at any timestep?
- What is the total number of hidden states computed for the entire batch?

### **Level 6: Concatenation vs Separate Weights**

**Q16.** Some RNN implementations concatenate [x_t, h_{t-1}] and use a single weight matrix. Given:

- x_t = [0.5, 0.3]
- h\_{t-1} = [0.2, 0.1]
- Concatenated input: [0.5, 0.3, 0.2, 0.1]
- W = [[0.1, 0.2, 0.3, 0.4], [0.5, 0.2, 0.1, 0.3]]
- b = [0.1, 0.0]

Calculate h_t and verify it matches the standard formulation.

**Q17.** Show that h*t = tanh(W_xh x_t + W_hh h*{t-1} + b*h) is equivalent to h_t = tanh(W [x_t; h*{t-1}] + b) by computing both for:

- x*t = [1.0], h*{t-1} = [0.5]
- W_xh = [[0.3]], W_hh = [[0.2]], b_h = [0.1]

### **Level 7: Sequence Processing Types**

**Q18.** Many-to-one: Process sequence [x_1, x_2, x_3] and output only at t=3.

- x_1 = [1.0], x_2 = [0.5], x_3 = [0.2]
- h=1, W_xh = [[0.4]], W_hh = [[0.5]], b_h = [0.0]
- W_hy = [[0.6]], b_y = [0.1]

Calculate only y_3 (sentiment classification style).

**Q19.** One-to-many: Start with x*1 = [1.0], then generate h_2 and h_3 using h*{t-1} as input (set x_t = [0.0] for t>1).

- h=2, W_xh = [[0.2], [0.3]]
- W_hh = [[0.4, 0.1], [0.2, 0.5]]
- b_h = [0.0, 0.0]

Show h_1, h_2, h_3.

**Q20.** Many-to-many: Calculate outputs at each timestep for inputs [0.5, 0.3, 0.7].

- h=1, W_xh = [[0.4]], W_hh = [[0.3]], b_h = [0.1]
- W_hy = [[0.5]], b_y = [0.0]

Show y_1, y_2, y_3.

### **Level 8: Edge Cases and Initialization**

**Q21.** What is h_0 typically initialized to? Why?

**Q22.** Calculate the forward pass when all weights are zero:

- W_xh = [[0]], W_hh = [[0]], b_h = [0]
- x_1 = [5.0], h_0 = [0]

What is h_1?

**Q23.** What happens when W_hh has very large values (e.g., 10.0) and we process a long sequence? Explain the exploding gradient problem conceptually.

**Q24.** Calculate h_t when:

- x*t = [0], h*{t-1} = [0.8]
- W_xh = [[0.5]], W_hh = [[1.0]], b_h = [0]

What happens to the hidden state over time if input is always zero?

### **Level 9: Different Activations**

**Q25.** Compute h_t using ReLU activation instead of tanh:

- z = W*xh x_t + W_hh h*{t-1} + b_h = [0.5, -0.3, 0.8]
- h_t = ReLU(z) = ?

**Q26.** Compute h_t using sigmoid activation:

- z = [-1.0, 0.0, 1.0]
- h_t = σ(z) = ?

### **Level 10: Practical Applications**

**Q27.** Character-level language model: Given vocabulary {h, e, l, o} with one-hot encodings:

- h=[1,0,0,0], e=[0,1,0,0], l=[0,0,1,0], o=[0,0,0,1]
- Process "hel" to predict "elo"
- Use h=3, and provide W_xh, W_hh, W_hy of your choice

Show the complete forward pass.

**Q28.** Sentiment analysis: Process the sequence [good=1, movie=2, excellent=3] using embeddings:

- Embedding: 1→[0.5,0.2], 2→[0.3,0.8], 3→[0.9,0.1]
- h=2, W_xh = [[0.4,0.3],[0.2,0.5]], W_hh = [[0.3,0.2],[0.1,0.6]]
- b_h = [0,0]
- Final classification: W_hy = [[0.7,0.3]], b_y = [0]

Compute the sentiment score using only h_3.

**Q29.** Time series prediction: Given temperatures [20, 22, 21] (normalized to [0.2, 0.22, 0.21]):

- h=1, W_xh=[[0.8]], W_hh=[[0.5]], b_h=[0]
- W_hy=[[1.0]], b_y=[0]

Predict the next temperature.

**Q30.** Named Entity Recognition (many-to-many): Tag each word in sequence [John, loves, Python].

- Embeddings: John=[1,0,0], loves=[0,1,0], Python=[0,0,1]
- h=2, output_classes=3 (Person, Verb, Tech)
- Process and output classification at each timestep

Design the architecture dimensions.
