---
title: "Computer Architecture & Malware Analysis"
description: "Published from /C:/Users/korde/Home/Github/notes/floss.md"
---
<div class="note-properties">
  <div class="note-property-row"><span class="note-property-key">marp</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">theme</span><span class="note-property-value">default</span></div>
  <div class="note-property-row"><span class="note-property-key">paginate</span><span class="note-property-value">true</span></div>
</div>

**Topics Covered:**

- Computer Architecture Fundamentals
- String Analysis in Malware
- FLOSS and Other Analysis Tools

---

# Computer Architecture: Von Neumann Model

The foundation of modern computing systems consists of:

- **Central Processing Unit (CPU)**: Executes instructions
- **Memory**: Stores programs and data
- **Input/Output (I/O)**: Interfaces with external devices
- **System Bus**: Connects all components

**Key Principle**: Stored-program concept where instructions and data share the same memory space.

---

# CPU Architecture Components

**Control Unit (CU)**

- Fetches instructions from memory
- Decodes instructions
- Coordinates execution across CPU components

**Arithmetic Logic Unit (ALU)**

- Performs arithmetic operations (add, subtract, multiply, divide)
- Executes logical operations (AND, OR, NOT, XOR)
- Handles comparisons and bit manipulation

---

# CPU Registers

**General Purpose Registers**

- EAX/RAX, EBX/RBX, ECX/RCX, EDX/RDX (x86/x64)
- Used for arithmetic, data manipulation, function arguments

**Special Purpose Registers**

- **EIP/RIP**: Instruction Pointer (program counter)
- **ESP/RSP**: Stack Pointer
- **EBP/RBP**: Base Pointer (stack frame reference)
- **EFLAGS/RFLAGS**: Status flags (zero, carry, sign, overflow)

---

# Memory Hierarchy

**Speed vs Capacity Trade-off:**

1. **Registers**: Fastest, smallest (bytes)
2. **L1 Cache**: Very fast (KB range)
3. **L2 Cache**: Fast (hundreds of KB)
4. **L3 Cache**: Moderate (MB range)
5. **RAM**: Slower (GB range)
6. **Secondary Storage**: Slowest, largest (TB range)

---

# Memory Architecture

**Memory Segmentation**

- **Code Segment (.text)**: Executable instructions
- **Data Segment (.data)**: Initialized global/static variables
- **BSS Segment**: Uninitialized data
- **Heap**: Dynamically allocated memory (grows upward)
- **Stack**: Function calls, local variables (grows downward)

---

# Instruction Set Architecture (ISA)

**CISC (Complex Instruction Set Computing)**

- Example: x86/x64
- Variable-length instructions
- Rich instruction set with complex operations

**RISC (Reduced Instruction Set Computing)**

- Examples: ARM, MIPS, RISC-V
- Fixed-length instructions
- Simple, regular instruction format
- Load/store architecture

---

# Instruction Execution Cycle

**Fetch-Decode-Execute Cycle:**

1. **Fetch**: Read instruction from memory at address in program counter
2. **Decode**: Interpret instruction opcode and operands
3. **Execute**: Perform the operation
4. **Memory Access**: Read/write data if needed
5. **Write Back**: Store results in registers/memory
6. **Update PC**: Move to next instruction

---

# Pipelining

**Instruction Pipeline Stages:**

- Multiple instructions processed simultaneously
- Different stages of different instructions overlap

**Benefits:**

- Increased throughput
- Better CPU utilization

**Challenges:**

- Pipeline hazards (data, control, structural)
- Branch prediction needed

---

# Strings in Computing

**What are Strings?**

- Sequences of characters stored in memory
- Critical for understanding program behavior
- In malware: URLs, IP addresses, commands, encryption keys

**String Encoding:**

- **ASCII**: 7-bit character encoding
- **UTF-8**: Variable-length Unicode encoding
- **UTF-16**: 16-bit Unicode encoding
- **Wide strings**: Platform-specific (wchar_t)

---

# String Storage in Memory

**Null-Terminated Strings (C-style)**

```
"Hello" → 48 65 6C 6C 6F 00
```

**Length-Prefixed Strings (Pascal-style)**

```
"Hello" → 05 48 65 6C 6C 6F
```

**String Obfuscation in Malware:**

- Encryption/encoding
- Stack strings (built at runtime)
- Split strings
- XOR encoding

---

# Why String Analysis for Malware?

**Intelligence Gathering:**

- C2 (Command & Control) server addresses
- File paths and registry keys
- API function names
- Error messages and debugging info
- Cryptocurrency wallet addresses
- User-agent strings

**Reveals Malware Capabilities:**

- Network communication
- File operations
- Persistence mechanisms

---

# FLOSS: FireEye Labs Obfuscated String Solver

**Purpose:** Extract obfuscated strings from malware

**Capabilities:**

- Static string extraction
- Stack string detection
- Decoded strings via emulation
- Tight string analysis

**Installation:**

```bash
pip install flare-floss
```

---

# FLOSS Analysis Techniques

**1. Static Strings**

- Standard ASCII/Unicode strings in binary
- Same as `strings` command but enhanced

**2. Stack Strings**

- Strings built character-by-character on stack
- Evades simple string extraction

**3. Decoded/Obfuscated Strings**

- Emulates code paths to decode strings
- Identifies decoding functions automatically

---

# FLOSS Command Line Usage

**Basic Analysis:**

```bash
floss malware.exe
```

**Verbose Output:**

```bash
floss -v malware.exe
```

**Output to File:**

```bash
floss -o output.txt malware.exe
```

**JSON Output:**

```bash
floss -j malware.exe > results.json
```

---

# FLOSS Analysis Example

**Command:**

```bash
floss -n 5 suspicious.dll
```

**Output Sections:**

- FLOSS static strings (minimum length 5)
- FLOSS stack strings
- FLOSS decoded strings
- Associated function addresses

**Key Information:**

- Decoding function locations
- String usage context

---

# Other String Analysis Tools

**1. Strings (Unix/Linux)**

```bash
strings -a -n 8 malware.bin
# -a: scan entire file
# -n 8: minimum length 8
```

**2. BinText (Windows)**

- GUI-based string extractor
- ASCII and Unicode support
- User-friendly interface

---

# Advanced Malware Analysis Tools

**Static Analysis:**

- **IDA Pro**: Disassembler and debugger
- **Ghidra**: NSA's reverse engineering tool
- **Radare2**: Open-source framework
- **PE-bear**: PE file analyzer

**Dynamic Analysis:**

- **x64dbg/x32dbg**: Windows debuggers
- **OllyDbg**: Classic Windows debugger
- **Process Monitor**: System activity monitor
- **Wireshark**: Network traffic analysis

---

# Yara Rules for String Detection

**Pattern Matching for Malware:**

````yara
rule Suspicious_Strings
{
    strings:
            $url = "http://malicious-c2.com"
                    $cmd = "cmd.exe /c"
                            $reg = "HKEY_CURRENT_USER\\Software"

                                    condition:
                                            any of them
                                            }
                                            ```

                                            **Use Cases:**
                                            - Malware classification
                                            - IOC detection
                                            - Automated triage

                                            ---

                                            # Sandboxing and Behavioral Analysis

                                            **Automated Malware Analysis Platforms:**

                                            - **Cuckoo Sandbox**: Open-source automated analysis
                                            - **Joe Sandbox**: Commercial platform
                                            - **Any.run**: Interactive online sandbox
                                            - **Hybrid Analysis**: Community-driven

                                            **Benefits:**
                                            - Safe execution environment
                                            - Automated string extraction
                                            - Network behavior monitoring

                                            ---

                                            # Deobfuscation Techniques

                                            **Common Obfuscation Methods:**
                                            - XOR encoding
                                            - Base64 encoding
                                            - Custom character substitution
                                            - ROT13/Caesar cipher
                                            - RC4/AES encryption

                                            **Analysis Approach:**
                                            1. Identify encoding patterns
                                            2. Locate decoding routines
                                            3. Extract decoding keys
                                            4. Decrypt strings programmatically

                                            ---

                                            # String Analysis Best Practices

                                            **Comprehensive Approach:**
                                            1. Start with simple string extraction
                                            2. Use FLOSS for obfuscated strings
                                            3. Dynamic analysis to capture runtime strings
                                            4. Cross-reference with network/file activity
                                            5. Document all IOCs

                                            **Safety Considerations:**
                                            - Always analyze in isolated environment
                                            - Use virtual machines or sandboxes
                                            - Never execute on production systems

                                            ---

                                            # Practical Analysis Workflow

                                            **Step-by-Step Process:**

                                            1. **Initial Triage**: Basic file information, hashes
                                            2. **Static String Analysis**: Run strings, FLOSS
                                            3. **Disassembly**: IDA Pro/Ghidra for code review
                                            4. **Dynamic Analysis**: Execute in sandbox
                                            5. **Network Analysis**: Capture traffic
                                            6. **Documentation**: Create detailed report
                                            7. **IOC Extraction**: Share intelligence

                                            ---

                                            # Memory Dump Analysis

                                            **Extracting Strings from Memory:**

                                            **Tools:**
                                            - **Volatility**: Memory forensics framework
                                            - **Rekall**: Advanced memory analysis
                                            - **WinDbg**: Windows debugger

                                            **Commands:**
                                            ```bash
                                            volatility -f memory.dmp strings
                                            volatility -f memory.dmp yarascan
                                            ```

                                            **Benefits:** Captures decrypted/deobfuscated runtime strings

                                            ---

                                            # Case Study: String-Based Detection

                                            **Real-World Example:**

                                            Malware sample contains:
                                            - Encoded C2 URL in .data section
                                            - Stack strings for API names
                                            - Registry keys for persistence

                                            **FLOSS Output:**
                                            ```
                                            [STACK STRING] ws2_32.dll
                                            [DECODED STRING] http://192.168.1.100:8080
                                            [STATIC STRING] SOFTWARE\\Microsoft\\Windows\\Run
                                            ```

                                            **IOCs Extracted:** Network indicators, persistence mechanism identified

                                            ---

                                            # Limitations and Challenges

                                            **String Analysis Limitations:**
                                            - Encrypted strings may remain hidden
                                            - Polymorphic malware changes strings
                                            - Large binaries produce noise
                                            - False positives in legitimate software

                                            **Mitigation:**
                                            - Combine with behavioral analysis
                                            - Use multiple tools
                                            - Apply context and filtering
                                            - Leverage threat intelligence

                                            ---

                                            # Advanced Topics

                                            **Assembly Language & Architecture:**
                                            - Understanding disassembled code
                                            - Recognizing string operations (mov, lea, push)
                                            - API call identification

                                            **Binary Instrumentation:**
                                            - PIN, DynamoRIO, Frida
                                            - Runtime string extraction
                                            - API hooking

                                            **Machine Learning:**
                                            - Automated string classification
                                            - Malware family detection

                                            ---

                                            # Resources and Further Learning

                                            **Documentation:**
                                            - FLOSS GitHub: github.com/fireeye/flare-floss
                                            - Intel SDM: Software Developer Manuals
                                            - ARM Architecture Reference Manual

                                            **Training:**
                                            - Malware Unicorn Workshops
                                            - SANS FOR610 (Reverse Engineering)
                                            - Practical Malware Analysis (book)

                                            **Communities:**
                                            - r/ReverseEngineering
                                            - MalwareTech Blog
                                            - OpenAnalysis.net

                                            ---

                                            # Summary

                                            **Computer Architecture:**
                                            - Von Neumann model, CPU components, memory hierarchy
                                            - Instruction execution and pipelining
                                            - ISA variations (CISC vs RISC)

                                            **String Analysis:**
                                            - Critical for malware intelligence
                                            - FLOSS extracts obfuscated strings
                                            - Combine static and dynamic approaches

                                            **Tools Ecosystem:**
                                            - Integrated analysis workflow
                                            - Multiple complementary tools needed

                                            ---

                                            # Thank You!

                                            **Key Takeaways:**
                                            - Understanding architecture aids reverse engineering
                                            - String analysis reveals malware behavior
                                            - FLOSS is essential for modern malware analysis
                                            - Always use layered analysis approach

                                            **Questions?**

                                            ---
````
