---
title: "Compliance within LAN & WAN Domains"
description: "Published from /C:/Users/korde/Home/Github/notes/Lan_wan.md"
---
<div class="note-properties">
  <div class="note-property-row"><span class="note-property-key">marp</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">theme</span><span class="note-property-value">default</span></div>
  <div class="note-property-row"><span class="note-property-key">paginate</span><span class="note-property-value">true</span></div>
  <div class="note-property-row"><span class="note-property-key">backgroundImage</span><span class="note-property-value">url('https://marp.app/assets/hero-background.svg')</span></div>
</div>

## Cybersecurity and Audit Compliance

### Topics Covered:

- Compliance Requirements & Business Drivers
- LAN Domain Components & Security
- Maximizing CIA Triad
- WAN Domain Security
- Penetration Testing & Configuration Validation

---

# **Compliance Law Requirements**

## Key Regulatory Frameworks

- **HIPAA** - Healthcare Information Portability and Accountability Act
- **PCI-DSS** - Payment Card Industry Data Security Standard
- **SOX** - Sarbanes-Oxley Act (Financial Reporting)
- **GDPR** - General Data Protection Regulation
- **GLBA** - Gramm-Leach-Bliley Act (Financial Services)
- **FISMA** - Federal Information Security Management Act

---

# **Business Drivers for Compliance**

## Why Organizations Must Comply

1. **Legal Obligations** - Avoid penalties and legal consequences
2. **Customer Trust** - Protect sensitive data and maintain reputation
3. **Competitive Advantage** - Certification as market differentiator
4. **Risk Management** - Reduce security incidents and breaches
5. **Operational Efficiency** - Standardized processes and controls
6. **Financial Protection** - Avoid fines, lawsuits, and data breach costs

---

# **LAN Domain Overview**

## Local Area Network Characteristics

- **Geographic Scope**: Limited physical area (building, campus)
- **Ownership**: Typically owned and managed by single organization
- **Speed**: High bandwidth (1 Gbps to 100 Gbps)
- **Security Boundary**: First line of defense for internal networks
- **Compliance Focus**: Access control, segmentation, monitoring

---

# **Devices in the LAN Domain**

## Network Infrastructure Components

| Device           | Function              | Security Role                    |
| ---------------- | --------------------- | -------------------------------- |
| **Switches**     | Layer 2/3 forwarding  | VLAN segmentation, port security |
| **Routers**      | Inter-network routing | ACLs, routing policies           |
| **Wireless APs** | Wi-Fi connectivity    | Authentication, encryption       |
| **Firewalls**    | Traffic filtering     | Rule enforcement, logging        |
| **IDS/IPS**      | Threat detection      | Monitoring, prevention           |

---

# **LAN Domain Components (Continued)**

## Endpoints and Security Tools

- **Workstations** - Employee computers with endpoint protection
- **Servers** - File, application, database servers
- **Printers/MFDs** - Network-connected peripherals
- **VoIP Phones** - Voice communication devices
- **Network Access Control (NAC)** - Authentication systems
- **DHCP/DNS Servers** - Core network services
- **SIEM Systems** - Security monitoring and logging

---

# **Maximizing CIA Triad in LAN**

## Confidentiality

### Protection Measures:

- **Encryption**: Data-at-rest and data-in-transit (TLS/SSL, IPsec)
- **Access Controls**: Role-based access control (RBAC)
- **Network Segmentation**: VLANs, private VLANs
- **Authentication**: 802.1X, multi-factor authentication (MFA)
- **Data Classification**: Label and protect sensitive information

---

# **Maximizing CIA Triad in LAN**

## Integrity

### Protection Measures:

- **Hashing**: SHA-256 for data verification
- **Digital Signatures**: Verify sender authenticity
- **Version Control**: Track configuration changes
- **File Integrity Monitoring (FIM)**: Detect unauthorized modifications
- **Change Management**: Documented approval processes
- **Anti-tampering Controls**: Secure boot, signed firmware

---

# **Maximizing CIA Triad in LAN**

## Availability

### Protection Measures:

- **Redundancy**: Dual power supplies, redundant links
- **High Availability**: Failover clustering, load balancing
- **Backup Systems**: Regular backups with offsite storage
- **Disaster Recovery**: Documented recovery procedures
- **DDoS Protection**: Rate limiting, traffic filtering
- **Patch Management**: Timely security updates
- **Capacity Planning**: Prevent resource exhaustion

---

# **WAN Domain Overview**

## Wide Area Network Characteristics

- **Geographic Scope**: Connects distant locations (cities, countries)
- **Connectivity**: Internet, MPLS, leased lines, VPN
- **Speed**: Variable (from kbps to Gbps)
- **Security Challenges**: Public infrastructure, multiple access points
- **Compliance Focus**: Encryption, secure transmission, data sovereignty

---

# **Devices in the WAN Domain**

## Border and Connectivity Components

| Device                | Function                | Security Role              |
| --------------------- | ----------------------- | -------------------------- |
| **Border Routers**    | WAN connectivity        | Perimeter filtering        |
| **VPN Concentrators** | Secure remote access    | Encryption, authentication |
| **SD-WAN Devices**    | Dynamic path selection  | Encrypted tunnels          |
| **Load Balancers**    | Traffic distribution    | DDoS mitigation            |
| **Proxy Servers**     | Gateway filtering       | Content inspection         |
| **WAN Optimizers**    | Performance enhancement | Traffic visibility         |

---

# **WAN Domain Components (Continued)**

## Security and Monitoring Tools

- **Next-Gen Firewalls (NGFW)** - Deep packet inspection
- **Web Application Firewalls (WAF)** - Application layer protection
- **Intrusion Prevention Systems** - Signature-based detection
- **SSL/TLS Inspection** - Decrypt and inspect encrypted traffic
- **Bandwidth Management** - QoS policies and traffic shaping
- **NetFlow/sFlow Collectors** - Traffic analysis
- **Unified Threat Management (UTM)** - Integrated security

---

# **LAN/WAN Compliance Challenges**

## Common Security Gaps

1. **Unencrypted Traffic** - Data exposure in transit
2. **Weak Authentication** - Default credentials, no MFA
3. **Lack of Segmentation** - Flat networks enable lateral movement
4. **Insufficient Monitoring** - Blind spots in network visibility
5. **Outdated Systems** - Unpatched vulnerabilities
6. **Poor Configuration** - Permissive firewall rules
7. **Shadow IT** - Unauthorized devices and applications

---

# **Network Segmentation Strategy**

## Compliance-Driven Architecture

```
DMZ (Public-Facing)
├── Web Servers
└── Mail Servers

Internal Network
├── User VLAN (Workstations)
├── Server VLAN (Applications)
├── Database VLAN (Critical Data)
├── Management VLAN (Admin Access)
└── Guest VLAN (Visitors)

Restricted Zones
├── PCI Cardholder Data Environment
└── HIPAA Protected Health Information
```

---

# **Penetration Testing Overview**

## Purpose and Objectives

### What is Penetration Testing?

Simulated cyber attack to identify vulnerabilities before malicious actors exploit them.

### Key Objectives:

- Identify security weaknesses in infrastructure
- Validate effectiveness of security controls
- Test incident response capabilities
- Ensure compliance with regulations
- Provide remediation recommendations

---

# **Types of Penetration Testing**

## Testing Methodologies

| Type          | Description        | Use Case                      |
| ------------- | ------------------ | ----------------------------- |
| **Black Box** | No prior knowledge | External attacker simulation  |
| **White Box** | Full knowledge     | Comprehensive assessment      |
| **Gray Box**  | Partial knowledge  | Insider threat simulation     |
| **Internal**  | Within network     | Lateral movement testing      |
| **External**  | From Internet      | Perimeter security validation |

---

# **Penetration Testing Phases**

## Methodology Framework

1. **Reconnaissance** - Information gathering (passive/active)
2. **Scanning** - Port scanning, vulnerability identification
3. **Gaining Access** - Exploit vulnerabilities
4. **Maintaining Access** - Establish persistence
5. **Covering Tracks** - Log manipulation, cleanup
6. **Reporting** - Document findings and recommendations

---

# **LAN Domain Penetration Testing**

## Common Attack Vectors

- **ARP Spoofing** - Man-in-the-middle attacks
- **VLAN Hopping** - Bypass network segmentation
- **DHCP Starvation** - Denial of service
- **MAC Flooding** - Switch table overflow
- **Rogue Access Points** - Unauthorized wireless networks
- **802.1X Bypass** - Authentication circumvention
- **SMB/LLMNR Poisoning** - Credential harvesting

---

# **WAN Domain Penetration Testing**

## Perimeter Attack Techniques

- **Port Scanning** - Identify exposed services
- **Vulnerability Scanning** - Known CVEs in public systems
- **Password Attacks** - Brute force, dictionary attacks
- **SSL/TLS Weaknesses** - Protocol downgrades, weak ciphers
- **VPN Exploitation** - Authentication bypass
- **Web Application Attacks** - SQL injection, XSS
- **Social Engineering** - Phishing, pretexting

---

# **Configuration Validation**

## Security Hardening Checks

### Network Devices:

- Strong authentication (no default passwords)
- Encrypted management protocols (SSH, HTTPS)
- Disable unnecessary services
- Access control lists properly configured
- Logging enabled and centralized
- Time synchronization (NTP)
- Banner warnings implemented

---

# **Configuration Validation Tools**

## Automated Assessment Solutions

| Tool            | Purpose                | Domain          |
| --------------- | ---------------------- | --------------- |
| **Nessus**      | Vulnerability scanning | LAN/WAN         |
| **Nmap**        | Network discovery      | LAN/WAN         |
| **OpenVAS**     | Security scanner       | LAN/WAN         |
| **Nipper**      | Config analysis        | Network devices |
| **Metasploit**  | Exploitation framework | LAN/WAN         |
| **Wireshark**   | Packet analysis        | LAN/WAN         |
| **Aircrack-ng** | Wireless testing       | LAN             |

---

# **Compliance Validation Checklist**

## LAN Domain Requirements

✓ Network segmentation implemented (VLANs)
✓ Access control lists configured and reviewed
✓ Port security enabled on switches
✓ 802.1X authentication deployed
✓ Wireless networks using WPA3/WPA2 Enterprise
✓ Intrusion detection/prevention active
✓ Logs forwarded to centralized SIEM
✓ Regular vulnerability scans conducted

---

# **Compliance Validation Checklist**

## WAN Domain Requirements

✓ Firewall rules follow least privilege principle
✓ VPN using strong encryption (AES-256)
✓ Multi-factor authentication for remote access
✓ DDoS protection mechanisms in place
✓ SSL/TLS certificates valid and up-to-date
✓ Web filtering and content inspection enabled
✓ Bandwidth management and QoS configured
✓ Perimeter monitoring and alerting active

---

# **Continuous Compliance Monitoring**

## Ongoing Security Assurance

### Automated Processes:

- **Continuous Vulnerability Scanning** - Weekly/monthly scans
- **Configuration Audits** - Detect unauthorized changes
- **Security Information & Event Management** - Real-time alerting
- **Compliance Reporting** - Dashboard and metrics
- **Patch Management** - Timely updates
- **Access Reviews** - Quarterly privilege audits

---

# **Remediation Priorities**

## Risk-Based Approach

### Critical (Fix Immediately):

- Publicly exposed vulnerabilities (CVSS 9-10)
- Default credentials on critical systems
- Unencrypted transmission of sensitive data

### High (Fix within 30 days):

- Missing patches for known exploits
- Weak authentication mechanisms
- Insufficient network segmentation

### Medium/Low (Schedule appropriately):

- Configuration improvements
- End-of-life system replacements

---

# **Documentation Requirements**

## Audit Trail and Evidence

### Required Documentation:

1. Network topology diagrams
2. Data flow diagrams
3. Configuration baselines
4. Change management logs
5. Penetration test reports
6. Vulnerability scan results
7. Remediation tracking
8. Policy and procedure documents
9. Training records
10. Incident response logs

---

# **Best Practices Summary**

## Key Takeaways

1. **Defense in Depth** - Multiple layers of security controls
2. **Least Privilege** - Minimum necessary access rights
3. **Encryption Everywhere** - Protect data in transit and at rest
4. **Continuous Monitoring** - Real-time visibility and alerting
5. **Regular Testing** - Quarterly penetration tests
6. **Configuration Management** - Standardized, documented settings
7. **User Awareness** - Security training and phishing simulations
8. **Incident Response** - Prepared and tested procedures

---

# **Questions & Discussion**

## Contact Information

Thank you for your attention!

### Additional Resources:

- NIST Cybersecurity Framework
- CIS Critical Security Controls
- SANS Security Resources
- OWASP Testing Guide

---

# **References**

- NIST SP 800-53 - Security and Privacy Controls
- NIST SP 800-115 - Technical Guide to Information Security Testing
- PCI DSS v4.0 - Payment Card Industry Data Security Standard
- ISO/IEC 27001 - Information Security Management
- OWASP Testing Guide
- PTES - Penetration Testing Execution Standard
- CIS Controls v8
- HIPAA Security Rule
