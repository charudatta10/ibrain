---
title: "Prompt"
description: "Published from /C:/Users/korde/Home/Github/notes/pages/Prompt.md"
---
<div class="note-properties">
  <div class="note-property-row"><span class="note-property-key">marp</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">theme</span><span class="note-property-value">default</span></div>
  <div class="note-property-row"><span class="note-property-key">paginate</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">headingDivider</span><span class="note-property-value">2</span></div>
</div>

🧠 Prompt Engineering 101

Modular Design for AI Interaction

---

What Is Prompt Engineering?

- Crafting inputs to guide AI toward useful outputs
- Interface between human intent and machine interpretation
- Like designing a syllabus: structure matters

---

Core Principles

- Clarity: Be explicit
- Context: Add relevant background
- Structure: Use formatting to guide output
- Modularity: Break into remixable sub-prompts
- Iteration: Refine based on feedback

---

Prompt Types

| Type               | Description                       |
| ------------------ | --------------------------------- |
| Instructional      | Direct task guidance              |
| Role-based         | Assigns persona/expertise         |
| Few-shot           | Uses examples to guide behavior   |
| Chain-of-thought   | Encourages step-by-step reasoning |
| Constraint-based   | Limits format/tone/scope          |
| Remixable scaffold | Templates for reuse               |

---

Examples

`markdown

Role-based
"Act as a forensic science professor explaining DNA profiling."

Constraint-based
"Write a tweet under 280 characters using only emojis and hashtags."

Remixable scaffold
"Generate a markdown syllabus with weekly topics, readings, and assignments."
