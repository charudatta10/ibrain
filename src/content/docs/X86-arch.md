---
title: "x86 Architecture"
description: "Published from /C:/Users/korde/Home/Github/notes/X86-arch.md"
---
<div class="note-properties">
  <div class="note-property-row"><span class="note-property-key">marp</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">theme</span><span class="note-property-value">default</span></div>
  <div class="note-property-row"><span class="note-property-key">paginate</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">author</span><span class="note-property-value">Charudatta G. Korde</span></div>
</div>

## Design, Evolution & Internals

Engineer • Researcher • Educator

---

# What is x86?

- Family of CISC instruction set architectures
- Originally developed by Intel
- Dominates desktops, servers, laptops
- Backward compatible across generations
- 16-bit → 32-bit → 64-bit (x86-64)

---

# Historical Evolution

| Year | Processor | Mode   |
| ---- | --------- | ------ |
| 1978 | 8086      | 16-bit |
| 1985 | 80386     | 32-bit |
| 2003 | AMD64     | 64-bit |

- Backward compatibility preserved
- Complex but powerful

---

# Architectural Modes

1. Real Mode (16-bit)
2. Protected Mode (32-bit)
3. Long Mode (64-bit)
4. Virtual 8086 Mode

Each mode enables different memory and privilege capabilities.

---

# Registers Overview

## General Purpose (64-bit)

- RAX
- RBX
- RCX
- RDX
- RSI
- RDI
- RBP
- RSP
- R8–R15

Lower portions:

- EAX (32-bit)
- AX (16-bit)
- AH/AL (8-bit)

---

# Special Registers

- RIP (Instruction Pointer)
- RFLAGS (Status flags)
- Segment Registers (CS, DS, SS, ES, FS, GS)
- Control Registers (CR0–CR4)

---

# Instruction Format

Typical x86 instruction:

[prefix] opcode [modrm] [sib] [displacement] [immediate]

Example:

mov rax, rbx add eax, 10

Variable-length encoding (1–15 bytes)

---

# Memory Architecture

- Little-endian
- Segmentation (legacy)
- Paging (modern systems)
- Virtual memory support

Address translation:

Virtual → Page Table → Physical

---

# Privilege Levels (Rings)

- Ring 0 — Kernel
- Ring 3 — User
- Ring 1 & 2 (rarely used)

Hardware-enforced isolation.

---

# Stack Architecture

- Grows downward
- Managed via RSP
- CALL pushes return address
- RET pops address

Example:

push rax pop rax

---

# Calling Conventions (x86-64)

## System V (Linux)

- RDI, RSI, RDX, RCX, R8, R9

## Microsoft (Windows)

- RCX, RDX, R8, R9

Stack used for additional parameters.

---

# SIMD & Extensions

- MMX
- SSE
- AVX
- AVX-512

Used for:

- Multimedia
- Cryptography
- AI/ML acceleration

---

# Pipeline & Microarchitecture

- Instruction Fetch
- Decode
- Execute
- Memory Access
- Writeback

Modern CPUs:

- Out-of-order execution
- Branch prediction
- Speculative execution

---

# Virtualization Support

- Intel VT-x
- AMD-V

Hardware-level virtualization support:

- Hypervisors
- Containers (indirect benefit)

---

# Security Features

- NX Bit
- SMEP / SMAP
- ASLR (OS-level)
- Secure Enclaves (SGX)

---

# x86 vs ARM

| Feature                | x86             | ARM             |
| ---------------------- | --------------- | --------------- |
| ISA Type               | CISC            | RISC            |
| Power Efficiency       | Moderate        | High            |
| Backward Compatibility | Strong          | Moderate        |
| Dominant In            | Servers/Desktop | Mobile/Embedded |

---

# Strengths

- Massive software ecosystem
- Backward compatibility
- High performance
- Strong virtualization

# Weaknesses

- Power hungry
- Complex decoding
- Legacy baggage

---

# Conclusion

x86 remains:

- The backbone of modern computing
- Highly optimized
- Backward compatible
- Continuously evolving

Understanding x86 is essential for:

- OS development
- Compiler design
- Reverse engineering
- Systems research

---

# References

- Intel Software Developer Manual
- AMD Architecture Programmer’s Manual
- Computer Organization & Design (Patterson & Hennessy)

---

# Thank You

Questions?
