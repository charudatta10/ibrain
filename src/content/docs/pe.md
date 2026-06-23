---
title: "Portable Executable (PE) Files"
description: "Published from /C:/Users/korde/Home/Github/notes/pe.md"
---
<div class="note-properties">
  <div class="note-property-row"><span class="note-property-key">marp</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">theme</span><span class="note-property-value">default</span></div>
  <div class="note-property-row"><span class="note-property-key">paginate</span><span class="note-property-value">true</span></div>
</div>

## Understanding Windows Executables

---

# What is a PE File?

- **Portable Executable (PE)** is the file format for executables, DLLs, and other binaries in Windows
- Used by Windows operating systems (NT, 2000, XP, Vista, 7, 8, 10, 11)
- Standard format defined by Microsoft
- Contains code, resources, and metadata needed for Windows loader

**Common PE file extensions:**
`.exe`, `.dll`, `.sys`, `.ocx`, `.scr`

---

# PE File Structure Overview

```
┌─────────────────────┐
│   DOS Header        │  Legacy compatibility
├─────────────────────┤
│   DOS Stub          │  "This program cannot be run in DOS mode"
├─────────────────────┤
│   PE Signature      │  "PE\0\0"
├─────────────────────┤
│   COFF Header       │  Basic file information
├─────────────────────┤
│   Optional Header   │  Additional metadata
├─────────────────────┤
│   Section Headers   │  Describes each section
├─────────────────────┤
│   Sections          │  .text, .data, .rsrc, etc.
└─────────────────────┘
```

---

# DOS Header (IMAGE_DOS_HEADER)

- First 64 bytes of every PE file
- Provides backward compatibility with DOS
- Key fields:
  - **e_magic**: Magic number "MZ" (0x5A4D)
    - **e_lfanew**: Offset to PE header

      The DOS stub typically prints:
      _"This program cannot be run in DOS mode"_

      ***

      # PE Header Components

      **1. PE Signature**
      - 4-byte signature: `50 45 00 00` ("PE\0\0")

      **2. COFF File Header (IMAGE_FILE_HEADER)**
      - Machine type (x86, x64, ARM, etc.)
      - Number of sections
      - Timestamp
      - Characteristics flags

      ***

      # Optional Header

      Despite its name, this header is **required** for executable files.

      **Key information:**
      - Entry point address (where execution begins)
      - Image base address (preferred load address)
      - Section alignment
      - Subsystem (GUI, Console, Driver, etc.)
      - Data directories (Import, Export, Resources, etc.)

      ***

      # PE Sections

      Common sections in PE files:

      | Section  | Purpose                             |
      | -------- | ----------------------------------- |
      | `.text`  | Executable code                     |
      | `.data`  | Initialized data                    |
      | `.bss`   | Uninitialized data                  |
      | `.rdata` | Read-only data (constants)          |
      | `.rsrc`  | Resources (icons, dialogs, strings) |
      | `.reloc` | Relocation information              |

      ***

      # Section Characteristics

      Each section has flags defining its properties:
      - **Executable**: Can contain code
      - **Readable**: Can be read
      - **Writable**: Can be modified
      - **Initialized Data**: Contains data
      - **Uninitialized Data**: BSS-type section

      Example: `.text` is typically readable and executable, but not writable

      ***

      # Import Address Table (IAT)
      - Lists functions imported from DLLs
      - Essential for dynamic linking
      - Resolved by Windows loader at runtime

      **Example imports:**

      ````
      kernel32.dll:
        - CreateFileA
          - ReadFile
            - WriteFile
            user32.dll:
              - MessageBoxA
              ```

              ---

              # Export Address Table (EAT)

              - Found in DLLs
              - Lists functions/data exported for use by other programs
              - Contains function names and addresses

              **Example:** A DLL exporting functions for other applications to call

              ---

              # Resources Section (.rsrc)

              Contains non-executable data:

              - Icons and cursors
              - Dialog boxes and menus
              - Strings and version information
              - Bitmaps and images
              - Custom resources

              Organized in a tree structure by type, name/ID, and language

              ---

              # Virtual vs File Addresses

              **Two address spaces:**

              1. **Raw File Offset**: Position in the file on disk
              2. **Relative Virtual Address (RVA)**: Position in memory when loaded

              The loader maps file sections to virtual memory according to alignment specifications

              ---

              # PE File Analysis Tools

              **Static Analysis:**
              - PE-bear, CFF Explorer
              - PEview, Dependency Walker
              - Hex editors (HxD, 010 Editor)

              **Dynamic Analysis:**
              - Debuggers (x64dbg, OllyDbg, WinDbg)
              - Process Monitor, Process Explorer

              ---

              # Security Considerations

              **PE files can be analyzed for:**
              - Malware detection
              - Code signing verification
              - Packed/obfuscated code
              - Suspicious imports
              - Anomalous section characteristics

              **Protection mechanisms:**
              - ASLR (Address Space Layout Randomization)
              - DEP (Data Execution Prevention)
              - Code signing certificates

              ---

              # Common PE File Modifications

              **Legitimate uses:**
              - Adding resources (icons, version info)
              - Code signing
              - Compression/packing (UPX, etc.)

              **Malicious uses:**
              - Malware injection
              - API hooking
              - Anti-debugging tricks
              - Polymorphic code

              ---

              # Thank You!

              ## Questions?

              **Further Reading:**
              - Microsoft PE/COFF Specification
              - "Practical Malware Analysis" by Sikorski & Honig
              - Corkami PE format posters

              ---
      ````
