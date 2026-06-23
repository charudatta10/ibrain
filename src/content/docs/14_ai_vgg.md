---
title: "VGG Networks"
description: "Published from /C:/Users/korde/Home/Github/notes/14_ai_vgg.md"
---
<div class="note-properties">
  <div class="note-property-row"><span class="note-property-key">marp</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">theme</span><span class="note-property-value">default</span></div>
  <div class="note-property-row"><span class="note-property-key">paginate</span><span class="note-property-value">true</span></div>
</div>

## Visual Geometry Group

Understanding Deep Convolutional Neural Networks

---

# What is VGG?

- Developed by **Visual Geometry Group** at Oxford University
- Published in 2014 by Karen Simonyan and Andrew Zisserman
- Runner-up in ILSVRC 2014 (ImageNet competition)
- Key insight: **Depth matters** in neural networks

---

# Key Innovation: Simplicity

**Core Principle:** Use very small 3×3 convolution filters throughout

**Why 3×3 filters?**

- Smallest size to capture spatial patterns (left, right, up, down, center)
- Two 3×3 conv layers have same receptive field as one 5×5 layer
- But with fewer parameters and more non-linearity

---

# VGG Architecture Variants

**VGG-16:** 16 weight layers (13 conv + 3 FC)
**VGG-19:** 19 weight layers (16 conv + 3 FC)

**Common structure:**

- Input: 224×224 RGB image
- Convolutional layers with 3×3 filters
- MaxPooling with 2×2 filters, stride 2
- Three fully connected layers at the end
- Softmax for classification

---

# VGG-16 Layer Configuration

| Block | Layers    | Filters          | Output Size |
| ----- | --------- | ---------------- | ----------- |
| Conv1 | 2×Conv3×3 | 64               | 224×224     |
| Conv2 | 2×Conv3×3 | 128              | 112×112     |
| Conv3 | 3×Conv3×3 | 256              | 56×56       |
| Conv4 | 3×Conv3×3 | 512              | 28×28       |
| Conv5 | 3×Conv3×3 | 512              | 14×14       |
| FC    | 3 layers  | 4096, 4096, 1000 | -           |

---

# Architecture Deep Dive

```
Input (224×224×3)
    ↓
[Conv3×3, 64] → [Conv3×3, 64] → MaxPool
    ↓
[Conv3×3, 128] → [Conv3×3, 128] → MaxPool
    ↓
[Conv3×3, 256] → [Conv3×3, 256] → [Conv3×3, 256] → MaxPool
    ↓
[Conv3×3, 512] → [Conv3×3, 512] → [Conv3×3, 512] → MaxPool
    ↓
[Conv3×3, 512] → [Conv3×3, 512] → [Conv3×3, 512] → MaxPool
    ↓
FC-4096 → FC-4096 → FC-1000 → Softmax
```

---

# Key Design Principles

1. **Uniform Architecture:** All conv layers use 3×3 filters with stride 1, padding 1
2. **Depth over Width:** Deeper networks with small filters > Shallow networks with large filters
3. **Progressive Doubling:** Feature maps double after each pooling (64→128→256→512)
4. **ReLU Activation:** After every convolutional layer
5. **Spatial Reduction:** MaxPooling reduces spatial dimensions by half

---

# Why Stack Small Filters?

**Receptive Field Comparison:**

- One 7×7 conv layer: **49 parameters** per channel
- Three 3×3 conv layers: **27 parameters** per channel

**Benefits:**

- 45% fewer parameters for same receptive field
- More non-linearity (3 ReLU vs 1 ReLU)
- Better feature learning

---

# VGG Parameters

**Total Parameters:**

- VGG-16: ~138 million parameters
- VGG-19: ~144 million parameters

**Distribution:**

- Most parameters in fully connected layers (~120M)
- Conv layers: ~15-20M parameters

**Challenge:** Large memory footprint and slow training

---

# Training Details

- **Optimizer:** SGD with momentum (0.9)
- **Batch size:** 256
- **Learning rate:** 0.01, reduced by 10× when validation plateaus
- **Regularization:**
  - Dropout (0.5) in FC layers
  - Weight decay (L2 penalty): 5×10⁻⁴
- **Data augmentation:** Random crops, horizontal flips, RGB color shift

---

# ImageNet Performance

| Model  | Top-1 Error | Top-5 Error |
| ------ | ----------- | ----------- |
| VGG-16 | 28.5%       | 9.9%        |
| VGG-19 | 28.7%       | 9.9%        |

**Note:** VGG-16 slightly better than VGG-19, showing that simply adding layers doesn't always help without proper design.

---

# Impact and Legacy

**Pioneering Contributions:**

- Demonstrated importance of network depth
- Popularized small filter sizes
- Simple, homogeneous architecture
- Strong baseline for transfer learning

**Widely Used For:**

- Feature extraction in computer vision
- Transfer learning for various tasks
- Perceptual loss in style transfer and GANs

---

# Transfer Learning with VGG

**Why VGG is Popular for Transfer Learning:**

- Pre-trained on ImageNet (1.2M images, 1000 classes)
- Rich hierarchical features
- Easy to extract features from any layer
- Stable and reliable representations

**Common Practice:**

- Use conv layers as feature extractor
- Replace FC layers for new task
- Fine-tune last few conv blocks

---

# Advantages of VGG

✓ Simple and uniform architecture
✓ Easy to understand and implement
✓ Excellent feature representations
✓ Strong performance on many tasks
✓ Good for visualization studies
✓ Reliable for transfer learning

---

# Limitations of VGG

✗ Very large number of parameters
✗ High memory consumption
✗ Slow training and inference
✗ Not suitable for mobile/embedded devices
✗ Superseded by more efficient architectures (ResNet, EfficientNet)

---

# Code Example: VGG-16 in PyTorch

```python
import torch.nn as nn

class VGG16(nn.Module):
    def __init__(self, num_classes=1000):
        super(VGG16, self).__init__()
        self.features = nn.Sequential(
            # Block 1
            nn.Conv2d(3, 64, 3, padding=1),
            nn.ReLU(inplace=True),
            nn.Conv2d(64, 64, 3, padding=1),
            nn.ReLU(inplace=True),
            nn.MaxPool2d(2, 2),
            # ... (more blocks)
        )
        self.classifier = nn.Sequential(
            nn.Linear(512*7*7, 4096),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(4096, 4096),
            nn.ReLU(inplace=True),
            nn.Dropout(0.5),
            nn.Linear(4096, num_classes)
        )
```

---

# VGG vs Other Architectures

| Architecture | Year     | Layers | Parameters | Top-5 Error |
| ------------ | -------- | ------ | ---------- | ----------- |
| AlexNet      | 2012     | 8      | 60M        | 16.4%       |
| **VGG-16**   | **2014** | **16** | **138M**   | **9.9%**    |
| GoogLeNet    | 2014     | 22     | 7M         | 9.2%        |
| ResNet-50    | 2015     | 50     | 25M        | 7.1%        |

---

# Modern Usage

**Still Relevant Today:**

- Perceptual loss functions (image generation)
- Style transfer (VGG features capture texture well)
- Neural art and creative AI
- Teaching and research baseline
- Feature visualization studies

**Not Recommended For:**

- Mobile applications
- Real-time inference
- Resource-constrained environments

---

# Key Takeaways

1. **Depth matters** - Deeper networks learn better representations
2. **Small filters work** - 3×3 filters are efficient and effective
3. **Simplicity is powerful** - Uniform architecture is easier to understand
4. **Foundation for progress** - Influenced ResNet, DenseNet, and more
5. **Transfer learning** - Pre-trained VGG still widely used

---

# References

**Original Paper:**
"Very Deep Convolutional Networks for Large-Scale Image Recognition"
Simonyan & Zisserman, ICLR 2015

**Key Resources:**

- Paper: https://arxiv.org/abs/1409.1556
- PyTorch models: torchvision.models.vgg16
- TensorFlow models: tf.keras.applications.VGG16

---

# Thank You!

**Questions?**

VGG: Simple, Deep, and Effective 🧠
