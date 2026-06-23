---
title: "PyTorch nn.Module Quiz"
description: "Published from /C:/Users/korde/Home/Github/notes/18_ai_problem.md"
---
<div class="note-properties">
  <div class="note-property-row"><span class="note-property-key">marp</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">theme</span><span class="note-property-value">default</span></div>
  <div class="note-property-row"><span class="note-property-key">paginate</span><span class="note-property-value">true</span></div>
</div>

## 20 Questions on Neural Network Architecture

---

## Question 1: Count Parameters

```python
class Net1(nn.Module):
    def __init__(self):
        super().__init__()
        self.fc1 = nn.Linear(784, 128)
        self.fc2 = nn.Linear(128, 10)
```

**How many trainable parameters does this network have?**

---

## Answer 1

```python
fc1: 784 × 128 + 128 (bias) = 100,480
fc2: 128 × 10 + 10 (bias) = 1,290
Total: 101,770 parameters
```

---

## Question 2: Count Parameters (Conv Layer)

```python
class ConvNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 64, kernel_size=3, padding=1)
```

**How many parameters in conv1?**

---

## Answer 2

```python
Conv2d parameters:
(kernel_h × kernel_w × in_channels × out_channels) + bias
= (3 × 3 × 3 × 64) + 64
= 1,728 + 64
= 1,792 parameters
```

---

## Question 3: Input/Output Size

```python
class Net3(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 16, kernel_size=5, stride=2)
```

**Input: (3, 32, 32). What is the output shape?**

---

## Answer 3

```python
Output size = ((input_size - kernel_size) / stride) + 1
H_out = ((32 - 5) / 2) + 1 = 14
W_out = ((32 - 5) / 2) + 1 = 14

Output shape: (16, 14, 14)
```

---

## Question 4: Count Parameters (BatchNorm)

```python
class Net4(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 32, 3)
        self.bn1 = nn.BatchNorm2d(32)
```

**How many parameters in bn1?**

---

## Answer 4

```python
BatchNorm2d parameters:
- gamma (scale): 32
- beta (shift): 32
Total trainable: 64 parameters

(Note: running_mean and running_var are not trainable)
```

---

## Question 5: Complete the Architecture

```python
class IncompleteNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 32, 3, padding=1)
        self.pool = nn.MaxPool2d(2, 2)
        # Input image: (1, 28, 28)
        # After conv1 + pool: (32, 14, 14)
        self.fc1 = nn.Linear(?, 128)
```

**What should replace the `?`**

---

## Answer 5

```python
After conv1: (32, 28, 28)
After pool: (32, 14, 14)
Flattened: 32 × 14 × 14 = 6,272

self.fc1 = nn.Linear(6272, 128)
```

---

## Question 6: Count Total Parameters

```python
class Net6(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(1, 16, 3)
        self.conv2 = nn.Conv2d(16, 32, 3)
        self.fc1 = nn.Linear(32*5*5, 10)
```

**Total parameters?**

---

## Answer 6

```python
conv1: (3×3×1×16) + 16 = 160
conv2: (3×3×16×32) + 32 = 4,640
fc1: (32×5×5×10) + 10 = 8,010

Total: 12,810 parameters
```

---

## Question 7: Output Size with Padding

```python
class Net7(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Conv2d(3, 64, kernel_size=7,
                              stride=2, padding=3)
```

**Input: (3, 224, 224). Output shape?**

---

## Answer 7

```python
Output = ((input + 2×padding - kernel) / stride) + 1
H_out = ((224 + 2×3 - 7) / 2) + 1 = 112
W_out = ((224 + 2×3 - 7) / 2) + 1 = 112

Output shape: (64, 112, 112)
```

---

## Question 8: Complete the Network

```python
class ResidualBlock(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(64, 64, 3, padding=1)
        self.conv2 = nn.Conv2d(?, ?, 3, padding=1)

    def forward(self, x):
        residual = x
        out = F.relu(self.conv1(x))
        out = self.conv2(out)
        return F.relu(out + residual)
```

**Fill in the `?` marks**

---

## Answer 8

```python
self.conv2 = nn.Conv2d(64, 64, 3, padding=1)

# For residual connection, input and output
# must have the same shape
```

---

## Question 9: Depthwise Convolution Parameters

```python
class Net9(nn.Module):
    def __init__(self):
        super().__init__()
        self.dw_conv = nn.Conv2d(32, 32, 3,
                                  groups=32, padding=1)
```

**How many parameters?**

---

## Answer 9

```python
Depthwise convolution (groups=in_channels):
Parameters per group: 3×3×1 = 9
Total: 32 groups × 9 + 32 (bias) = 320

(Much less than regular conv: 3×3×32×32 + 32 = 9,248)
```

---

## Question 10: Count Parameters (Embedding)

```python
class Net10(nn.Module):
    def __init__(self):
        super().__init__()
        self.embedding = nn.Embedding(10000, 300)
        self.fc = nn.Linear(300, 5)
```

**Total parameters?**

---

## Answer 10

```python
embedding: 10,000 × 300 = 3,000,000
fc: 300 × 5 + 5 = 1,505

Total: 3,001,505 parameters
```

---

## Question 11: Transpose Convolution Output

```python
class Net11(nn.Module):
    def __init__(self):
        super().__init__()
        self.deconv = nn.ConvTranspose2d(64, 32,
                                         kernel_size=4,
                                         stride=2, padding=1)
```

**Input: (64, 16, 16). Output shape?**

---

## Answer 11

```python
Output = (input - 1) × stride - 2×padding + kernel
H_out = (16-1)×2 - 2×1 + 4 = 32
W_out = (16-1)×2 - 2×1 + 4 = 32

Output shape: (32, 32, 32)
```

---

## Question 12: Complete LSTM Network

```python
class LSTMNet(nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = nn.LSTM(input_size=100,
                           hidden_size=256,
                           num_layers=2)
        self.fc = nn.Linear(?, 10)
```

**What should replace `?`**

---

## Answer 12

```python
self.fc = nn.Linear(256, 10)

# The output of LSTM has shape (seq_len, batch, hidden_size)
# We typically use the last hidden state or pooling
# which has dimension equal to hidden_size
```

---

## Question 13: Multi-Head Attention Parameters

```python
class Net13(nn.Module):
    def __init__(self):
        super().__init__()
        self.mha = nn.MultiheadAttention(embed_dim=512,
                                         num_heads=8)
```

**Approximate parameter count?**

---

## Answer 13

```python
MultiheadAttention parameters:
- Q projection: 512 × 512 + 512
- K projection: 512 × 512 + 512
- V projection: 512 × 512 + 512
- Output projection: 512 × 512 + 512

Total ≈ 4 × (512×512 + 512) = 1,050,624 parameters
```

---

## Question 14: Dilated Convolution Output

```python
class Net14(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Conv2d(16, 32, kernel_size=3,
                              dilation=2, padding=2)
```

**Input: (16, 28, 28). Output shape?**

---

## Answer 14

```python
Effective kernel size = kernel + (kernel-1)×(dilation-1)
                      = 3 + (3-1)×(2-1) = 5

Output = ((28 + 2×2 - 5) / 1) + 1 = 28

Output shape: (32, 28, 28)
```

---

## Question 15: Complete Autoencoder

```python
class Autoencoder(nn.Module):
    def __init__(self):
        super().__init__()
        # Encoder
        self.enc1 = nn.Linear(784, 256)
        self.enc2 = nn.Linear(256, 64)
        # Decoder
        self.dec1 = nn.Linear(?, ?)
        self.dec2 = nn.Linear(256, 784)
```

**Fill in the decoder layer**

---

## Answer 15

```python
self.dec1 = nn.Linear(64, 256)

# Decoder mirrors the encoder in reverse
# 784 → 256 → 64 (encoder)
# 64 → 256 → 784 (decoder)
```

---

## Question 16: Grouped Convolution

```python
class Net16(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv = nn.Conv2d(64, 128, kernel_size=3,
                              groups=4, padding=1)
```

**How many parameters?**

---

## Answer 16

```python
With groups=4:
- Each group: in=16, out=32
- Parameters per group: 3×3×16×32 = 4,608
- Total conv: 4 × 4,608 = 18,432
- Bias: 128
Total: 18,560 parameters

(vs 73,856 without grouping)
```

---

## Question 17: Calculate Receptive Field

```python
class Net17(nn.Module):
    def __init__(self):
        super().__init__()
        self.conv1 = nn.Conv2d(3, 64, 3, padding=1)
        self.conv2 = nn.Conv2d(64, 64, 3, padding=1)
        self.conv3 = nn.Conv2d(64, 128, 3, padding=1)
```

**What is the receptive field after conv3?**

---

## Answer 17

```python
Receptive field calculation:
- After conv1: 3×3
- After conv2: 5×5 (3 + 2×(3-1)/2)
- After conv3: 7×7 (5 + 2×(3-1)/2)

Receptive field: 7×7
```

---

## Question 18: Complete U-Net Skip Connection

```python
class UNetBlock(nn.Module):
    def __init__(self):
        super().__init__()
        self.down = nn.Conv2d(64, 128, 3, stride=2, padding=1)
        self.up = nn.ConvTranspose2d(128, 64, 2, stride=2)
        self.conv = nn.Conv2d(?, 64, 3, padding=1)

    def forward(self, x):
        skip = x
        x = self.down(x)
        x = self.up(x)
        x = torch.cat([x, skip], dim=1)
        return self.conv(x)
```

**Fill in `?`**

---

## Answer 18

```python
self.conv = nn.Conv2d(128, 64, 3, padding=1)

# After concatenation: 64 (from up) + 64 (skip) = 128 channels
```

---

## Question 19: Separable Convolution Parameters

```python
class SeparableConv(nn.Module):
    def __init__(self):
        super().__init__()
        self.depthwise = nn.Conv2d(64, 64, 3,
                                   groups=64, padding=1)
        self.pointwise = nn.Conv2d(64, 128, 1)
```

**Total parameters vs standard Conv2d(64, 128, 3)?**

---

## Answer 19

```python
Separable convolution:
- Depthwise: (3×3×1×64) + 64 = 640
- Pointwise: (1×1×64×128) + 128 = 8,320
- Total: 8,960

Standard Conv2d(64, 128, 3):
- Total: (3×3×64×128) + 128 = 73,856

Reduction: ~8.2x fewer parameters!
```

---

## Question 20: Complete Vision Transformer

```python
class PatchEmbedding(nn.Module):
    def __init__(self):
        super().__init__()
        # Image: (3, 224, 224)
        # Patch size: 16×16
        # Embed dim: 768
        self.proj = nn.Conv2d(3, 768,
                             kernel_size=?, stride=?)
```

**Fill in kernel_size and stride**

---

## Answer 20

```python
self.proj = nn.Conv2d(3, 768,
                     kernel_size=16, stride=16)

# Creates (224/16) × (224/16) = 14×14 = 196 patches
# Each patch is embedded to 768 dimensions
# Output: (768, 14, 14) → flatten to (196, 768)
```

---

# Thank You!

Practice these concepts to master PyTorch neural networks!

**Key takeaways:**

- Parameter counting: weights + biases
- Output size formulas for conv/pool/transpose
- Architecture completion requires understanding dimensions
- Special layers: BatchNorm, Embedding, Attention, etc.
