---
title: "Evaluating Generative Models"
description: "Published from /C:/Users/korde/Home/Github/notes/19_is_fid_score.md"
---
<div class="note-properties">
  <div class="note-property-row"><span class="note-property-key">marp</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">theme</span><span class="note-property-value">default</span></div>
  <div class="note-property-row"><span class="note-property-key">paginate</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">style</span><span class="note-property-value">section {
  font-size: 28px;
}
h1 {
  color: #2c3e50;
}
h2 {
  color: #34495e;
}
</span></div>
</div>

## Inception Score & FID Score

Understanding metrics for GANs, Diffusion Models, and other generative architectures

---

## Why Do We Need These Metrics?

**The Challenge:**

- How do we measure the quality of generated images?
- Human evaluation is expensive and subjective
- Need automated, objective metrics

**What Makes a Good Generated Image?**

1. **Quality** - Images should look realistic
2. **Diversity** - Should cover variety in the dataset
3. **Mode Coverage** - Shouldn't collapse to few examples

---

# Part 1: Inception Score (IS)

---

## Inception Score: Overview

**Introduced:** 2016 by Salimans et al.

**Key Idea:** Use a pre-trained classifier (Inception v3) to evaluate generated images

**Measures:**

- Image quality (sharpness, realism)
- Diversity of generated samples

**Range:** 1.0 to ∞ (higher is better)

- Random noise: ~1
- ImageNet dataset: ~233

---

## How Inception Score Works

**Step 1:** Generate images from your model (e.g., GAN)

**Step 2:** Pass images through pre-trained Inception v3 network

**Step 3:** Get class probability distribution p(y|x) for each image

**Step 4:** Calculate two key components:

- Marginal distribution p(y)
- Conditional distribution p(y|x)

---

## Mathematical Formula

$$IS = \exp\left(\mathbb{E}_x\left[D_{KL}(p(y|x) \| p(y))\right]\right)$$

Where:

- **p(y|x)** = probability of class y given image x (from Inception)
- **p(y)** = marginal distribution over all generated images
- **D_KL** = Kullback-Leibler divergence
- **𝔼_x** = expectation over all generated images

---

## Understanding the Components

**p(y|x) - Conditional Distribution**

- Should have **low entropy** (peaked distribution)
- Means the image clearly belongs to one class
- Indicates image quality/sharpness

**p(y) - Marginal Distribution**

- Should have **high entropy** (uniform distribution)
- Means generated images span many classes
- Indicates diversity

---

## Visual Intuition: Good IS

```
Good Generator:
┌─────────────┐     ┌──────────────┐
│ Generated   │ →   │ p(y|x): 🔺   │  Sharp peak = clear class
│ Image of    │     │   │          │
│ Cat         │     │   │          │  Low entropy ✓
└─────────────┘     └───┴──────────┘
                        cat  dog

Across all images:
p(y): ━━━━━━━━━━━━━━━━━  Uniform = diverse ✓
      cat dog bird ...
```

---

## Visual Intuition: Bad IS

```
Poor Generator:
┌─────────────┐     ┌──────────────┐
│ Blurry      │ →   │ p(y|x): ━━━  │  Flat = unclear
│ Ambiguous   │     │              │
│ Image       │     │              │  High entropy ✗
└─────────────┘     └──────────────┘
                        cat  dog

Across all images:
p(y):     🔺              Peaked = not diverse ✗
      cat dog bird ...
```

---

## Inception Score: PyTorch Code

```python
import torch
import torch.nn.functional as F
from torchvision.models import inception_v3

def inception_score(images, batch_size=32, splits=10):
    # Load pretrained Inception v3
    inception = inception_v3(pretrained=True, transform_input=False)
    inception.eval()

    preds = []

    # Get predictions for all images
    for i in range(0, len(images), batch_size):
        batch = images[i:i+batch_size]
        with torch.no_grad():
            pred = F.softmax(inception(batch), dim=1)
        preds.append(pred)

    preds = torch.cat(preds, dim=0)
```

---

## Inception Score: PyTorch Code (cont.)

```python
    # Calculate IS
    scores = []
    for k in range(splits):
        part = preds[k * (len(preds) // splits):
                     (k+1) * (len(preds) // splits)]

        # p(y|x)
        py_x = part

        # p(y) = average over images
        py = torch.mean(part, dim=0, keepdim=True)

        # KL divergence
        kl = py_x * (torch.log(py_x) - torch.log(py))
        kl = torch.sum(kl, dim=1)

        scores.append(torch.exp(torch.mean(kl)))

    return torch.mean(torch.stack(scores)), torch.std(torch.stack(scores))
```

---

## Inception Score: Advantages

✅ **Simple to compute** - Just need pre-trained Inception model

✅ **No reference needed** - Don't need real images for comparison

✅ **Captures two important aspects** - Quality and diversity

✅ **Widely adopted** - Easy to compare across papers

✅ **Fast evaluation** - Can compute on thousands of images quickly

---

## Inception Score: Limitations

❌ **Biased toward ImageNet** - Inception trained on ImageNet classes

❌ **Ignores spatial structure** - Doesn't detect distortions/artifacts

❌ **Can be fooled** - Adversarial examples can game the metric

❌ **No comparison to real data** - Doesn't measure similarity to training set

❌ **Mode dropping not detected** - Can get high IS with limited diversity

❌ **Not suitable for all domains** - Fails for non-natural images

---

## Example: Mode Dropping Problem

```
Scenario: GAN generates only 10 classes perfectly out of 1000

┌─────────────┐
│ Only cats   │ → p(y|x): Sharp peak ✓
│ and dogs    │
│ (perfect)   │   But p(y): Still peaked ✗
└─────────────┘

Result: Can still achieve HIGH Inception Score!
This is why we need FID...
```

---

# Part 2: Fréchet Inception Distance (FID)

---

## FID Score: Overview

**Introduced:** 2017 by Heusel et al.

**Key Improvement:** Compares generated images to **real images**

**Measures:**

- Similarity between generated and real image distributions
- Both quality and diversity

**Range:** 0 to ∞ (lower is better)

- 0 = perfect match to real distribution
- Typical good GANs: 10-50 on standard datasets

---

## How FID Works

**Step 1:** Extract features from Inception v3 network

- Use intermediate layer (before classification)
- Typically: 2048-dimensional feature vector

**Step 2:** Compute statistics for **real** images

- Mean μ_r and covariance Σ_r

**Step 3:** Compute statistics for **generated** images

- Mean μ_g and covariance Σ_g

**Step 4:** Calculate Fréchet distance between distributions

---

## Mathematical Formula

$$FID = \|\mu_r - \mu_g\|^2 + \text{Tr}(\Sigma_r + \Sigma_g - 2(\Sigma_r\Sigma_g)^{1/2})$$

Where:

- **μ_r, μ_g** = mean feature vectors (real and generated)
- **Σ_r, Σ_g** = covariance matrices (real and generated)
- **Tr** = trace of a matrix
- **‖·‖²** = squared Euclidean distance

---

## Understanding FID Components

**First Term: ‖μ_r - μ_g‖²**

- Measures difference in mean features
- How far apart are the "centers" of distributions?

**Second Term: Tr(Σ_r + Σ_g - 2√(Σ_r Σ_g))**

- Measures difference in covariance
- How different are the "spreads" of distributions?
- Captures diversity and variance

---

## Visual Intuition: FID

```
Feature Space (2D projection):

Real Images:              Generated Images:
    ●  ●  ●                   ○  ○  ○
  ●   μr   ●       vs.      ○   μg   ○
    ●  ●  ●                   ○  ○  ○

Low FID: Centers close, similar spread
High FID: Centers far or different spread
```

---

## Why FID is Better Than IS

**1. Compares to real data**

- Directly measures similarity to training distribution
- Detects mode collapse effectively

**2. Uses feature representations**

- Not limited to class labels
- Captures perceptual similarity

**3. More robust**

- Harder to game with adversarial examples
- Better correlation with human judgment

---

## FID: PyTorch Code

```python
import torch
import numpy as np
from scipy import linalg
from torchvision.models import inception_v3

def calculate_fid(real_images, generated_images, batch_size=32):
    # Load Inception v3
    inception = inception_v3(pretrained=True, transform_input=False)
    inception.fc = torch.nn.Identity()  # Remove final layer
    inception.eval()

    def get_features(images):
        features = []
        for i in range(0, len(images), batch_size):
            batch = images[i:i+batch_size]
            with torch.no_grad():
                feat = inception(batch)
            features.append(feat)
        return torch.cat(features, dim=0).cpu().numpy()
```

---

## FID: PyTorch Code (cont.)

```python
    # Extract features
    real_features = get_features(real_images)
    gen_features = get_features(generated_images)

    # Calculate statistics
    mu_real = np.mean(real_features, axis=0)
    sigma_real = np.cov(real_features, rowvar=False)

    mu_gen = np.mean(gen_features, axis=0)
    sigma_gen = np.cov(gen_features, rowvar=False)

    # Calculate FID
    diff = mu_real - mu_gen
    covmean = linalg.sqrtm(sigma_real @ sigma_gen)

    if np.iscomplexobj(covmean):
        covmean = covmean.real

    fid = diff @ diff + np.trace(sigma_real + sigma_gen - 2*covmean)
    return fid
```

---

## FID Score: Advantages

✅ **Compares to real data** - Directly measures distribution similarity

✅ **Detects mode collapse** - Can't get low FID with limited diversity

✅ **Better human correlation** - Aligns better with human judgment

✅ **Uses rich features** - Not limited to class labels

✅ **Widely adopted** - Standard metric in generative modeling

✅ **Detects quality issues** - Sensitive to artifacts and distortions

---

## FID Score: Limitations

❌ **Requires real samples** - Need access to real data distribution

❌ **Sensitive to sample size** - Needs sufficient samples (≥10k recommended)

❌ **Computationally expensive** - Matrix operations on large covariances

❌ **Still uses Inception** - Biased toward ImageNet-like images

❌ **Assumes Gaussian** - Models distributions as multivariate Gaussian

❌ **Not interpretable** - Hard to understand what score means

---

## Comparison: IS vs FID

| Aspect                    | Inception Score  | FID Score       |
| ------------------------- | ---------------- | --------------- |
| **Direction**             | Higher is better | Lower is better |
| **Needs real data**       | ❌ No            | ✅ Yes          |
| **Detects mode collapse** | Poor             | Excellent       |
| **Human correlation**     | Moderate         | Strong          |
| **Computation**           | Fast             | Moderate        |
| **Interpretability**      | Medium           | Low             |

---

## When to Use Which Metric?

**Use Inception Score when:**

- Quick evaluation needed
- No access to real data samples
- Comparing multiple generator variants
- Working with ImageNet-like images

**Use FID Score when:**

- Need accurate quality assessment
- Have access to real data
- Publishing research results
- Detecting mode collapse is critical

**Best Practice:** Report both metrics! 📊

---

## Practical Tips: Computing IS/FID

**Sample Size:**

- IS: Minimum 5,000 images
- FID: Minimum 10,000 images (more is better)

**Consistency:**

- Always use same sample size across comparisons
- Use multiple random seeds and report mean ± std
- Use same Inception model version

**Preprocessing:**

- Resize images to 299×299 (Inception input size)
- Normalize to [-1, 1] or [0, 1] consistently
- Ensure same preprocessing for real and generated

---

## Common Pitfalls

**1. Insufficient Samples**

```python
# Bad: Only 1000 images
fid = calculate_fid(real[:1000], generated[:1000])

# Good: 10k+ images
fid = calculate_fid(real[:10000], generated[:10000])
```

**2. Inconsistent Preprocessing**

```python
# Bad: Different ranges
real = normalize(real, mean=0.5, std=0.5)
generated = normalize(generated, mean=0, std=1)

# Good: Same preprocessing
preprocess = transforms.Compose([...])
real = preprocess(real)
generated = preprocess(generated)
```

---

## Real-World FID Scores

**State-of-the-art (CIFAR-10):**

- StyleGAN2: FID ≈ 2.4
- Diffusion Models: FID ≈ 1.9
- BigGAN: FID ≈ 6.9

**State-of-the-art (ImageNet 256×256):**

- Guided Diffusion: FID ≈ 3.9
- StyleGAN-XL: FID ≈ 2.3
- DALL-E 2: FID ≈ 10.4

Lower scores = better quality and diversity

---

## Beyond IS and FID: Other Metrics

**Precision and Recall:**

- Precision: Quality (no fake-looking images)
- Recall: Diversity (covers real distribution)

**Kernel Inception Distance (KID):**

- Similar to FID but uses MMD
- More robust to sample size

**CLIP Score:**

- Uses CLIP embeddings instead of Inception
- Better for text-to-image models

---

## Example: Evaluating Your GAN

```python
from torchvision.datasets import CIFAR10
from your_gan import Generator

# Load real data
real_data = CIFAR10(root='./data', train=True, download=True)
real_images = load_images(real_data, num_samples=10000)

# Generate images
generator = Generator().eval()
z = torch.randn(10000, 100)
generated_images = generator(z)

# Calculate metrics
is_mean, is_std = inception_score(generated_images, splits=10)
fid = calculate_fid(real_images, generated_images)

print(f"Inception Score: {is_mean:.2f} ± {is_std:.2f}")
print(f"FID Score: {fid:.2f}")
```

---

## Interpreting Your Results

**Inception Score: 8.5 ± 0.3**

- Quality: Images are reasonably sharp and recognizable
- Diversity: Generates variety of classes

**FID Score: 25.7**

- Moderate quality compared to real images
- Room for improvement (aim for <20)

**What to do:**

- If IS is low: Improve image quality and diversity
- If FID is high: Better match the real data distribution
- If IS is high but FID is high: May have mode collapse

---

## Practical Workflow

```
1. Train generator
   ↓
2. Generate 10k-50k images
   ↓
3. Calculate IS (quick check)
   ↓
4. Calculate FID (thorough evaluation)
   ↓
5. Visual inspection of samples
   ↓
6. Iterate and improve
```

**Remember:** Metrics are guides, not perfect oracles!
Always combine with human evaluation.

---

## Code Libraries

**Python Packages:**

```bash
# PyTorch implementations
pip install pytorch-fid
pip install torchmetrics

# Usage
from pytorch_fid import fid_score
fid = fid_score.calculate_fid_given_paths(
    [real_path, generated_path],
    batch_size=50,
    device='cuda',
    dims=2048
)
```

**TorchMetrics:**

```python
from torchmetrics.image.fid import FrechetInceptionDistance
fid = FrechetInceptionDistance(feature=2048)
fid.update(real_images, real=True)
fid.update(generated_images, real=False)
score = fid.compute()
```

---

## Research Applications

**GANs:** StyleGAN, BigGAN, Progressive GAN

**Diffusion Models:** DDPM, Stable Diffusion, Imagen

**VAEs:** VQ-VAE, VQ-GAN

**Text-to-Image:** DALL-E, Midjourney evaluation

**Video Generation:** Evaluating temporal consistency

**Medical Imaging:** Synthetic data quality assessment

---

## Key Takeaways

1. **Inception Score** measures quality + diversity without real data
2. **FID Score** compares to real distribution (more reliable)
3. Both use **pre-trained Inception v3** features
4. **Lower FID** and **higher IS** indicate better generators
5. Use **sufficient samples** (10k+) for reliable estimates
6. Always **report both metrics** plus visual samples
7. Metrics are **guidelines**, not ground truth

---

## Further Reading

**Original Papers:**

- IS: "Improved Techniques for Training GANs" (Salimans et al., 2016)
- FID: "GANs Trained by a Two Time-Scale Update Rule Converge to a Local Nash Equilibrium" (Heusel et al., 2017)

**Implementations:**

- pytorch-fid: https://github.com/mseitzer/pytorch-fid
- TorchMetrics: https://torchmetrics.readthedocs.io/

**Resources:**

- Papers With Code: GAN benchmarks
- Distill.pub: "GAN evaluation metrics"

---

# Thank You!

## Questions?

**Key Resources:**

- PyTorch FID: `pip install pytorch-fid`
- TorchMetrics: `pip install torchmetrics`
- Papers With Code for benchmarks

**Remember:** Good metrics guide development, but human evaluation remains essential! 👁️

---
