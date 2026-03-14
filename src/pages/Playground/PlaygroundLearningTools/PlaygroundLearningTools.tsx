import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Wrench, Code2, Hash, Lock, Key, Binary, Server,
    ChevronDown, ChevronUp, Copy, Check, RotateCcw,
    Shuffle, Calculator, List, Network, Shield, LucideIcon,
    Radio, Zap, KeyRound, ShieldCheck, Clock, Fingerprint, Type, FileText, Search, RefreshCw,
} from 'lucide-react';

// ── Utilities ──────────────────────────────────────────────────────────────

const b64Encode = (s: string) => { try { return btoa(unescape(encodeURIComponent(s))); } catch { return 'Error: invalid input'; } };
const b64Decode = (s: string) => { try { return decodeURIComponent(escape(atob(s))); } catch { return 'Error: invalid Base64 string'; } };

const urlEncode = (s: string) => { try { return encodeURIComponent(s); } catch { return 'Error'; } };
const urlDecode = (s: string) => { try { return decodeURIComponent(s); } catch { return 'Error: invalid URL-encoded string'; } };

const toHex = (s: string) => Array.from(s).map(c => c.charCodeAt(0).toString(16).padStart(2, '0')).join(' ');
const fromHex = (s: string) => { try { return (s.trim().replace(/\s+/g, '').match(/.{1,2}/g) ?? []).map(b => String.fromCharCode(parseInt(b, 16))).join(''); } catch { return 'Error: invalid hex string'; } };

const rot13 = (s: string) => s.replace(/[a-zA-Z]/g, c => { const b = c <= 'Z' ? 65 : 97; return String.fromCharCode(((c.charCodeAt(0) - b + 13) % 26) + b); });

const caesarCipher = (s: string, n: number, dec = false) => {
    const sh = dec ? (26 - ((n % 26 + 26) % 26)) % 26 : (n % 26 + 26) % 26;
    return s.replace(/[a-zA-Z]/g, c => { const b = c <= 'Z' ? 65 : 97; return String.fromCharCode(((c.charCodeAt(0) - b + sh) % 26) + b); });
};

const vigenereCipher = (s: string, key: string, dec = false) => {
    const k = key.toLowerCase().replace(/[^a-z]/g, '');
    if (!k) return 'Error: key must contain at least one letter';
    let i = 0;
    return s.replace(/[a-zA-Z]/g, c => {
        const b = c <= 'Z' ? 65 : 97;
        const sh = k.charCodeAt(i++ % k.length) - 97;
        return String.fromCharCode(((c.charCodeAt(0) - b + (dec ? 26 - sh : sh)) % 26) + b);
    });
};

const decodeJWT = (token: string) => {
    try {
        const parts = token.trim().split('.');
        if (parts.length !== 3) throw new Error('Token must have exactly 3 parts (header.payload.signature)');
        const parse = (s: string) => {
            const b = s.replace(/-/g, '+').replace(/_/g, '/').padEnd(s.length + (4 - s.length % 4) % 4, '=');
            return JSON.stringify(JSON.parse(decodeURIComponent(escape(atob(b)))), null, 2);
        };
        return { header: parse(parts[0]), payload: parse(parts[1]), sig: parts[2], error: null };
    } catch (e: any) { return { header: '', payload: '', sig: '', error: e.message as string }; }
};

const convertBase = (val: string, from: number) => {
    const n = parseInt(val.trim(), from);
    if (isNaN(n) || val.trim() === '') return null;
    return { bin: n.toString(2), oct: n.toString(8), dec: n.toString(10), hex: n.toString(16).toUpperCase() };
};

const ip2int = (ip: string) => ip.split('.').reduce((acc, o) => (acc << 8) | parseInt(o), 0) >>> 0;
const int2ip = (n: number) => [(n >>> 24) & 255, (n >>> 16) & 255, (n >>> 8) & 255, n & 255].join('.');
const calcSubnet = (cidr: string) => {
    try {
        const [ipStr, prefStr] = cidr.trim().split('/');
        const pref = parseInt(prefStr);
        if (!ipStr || isNaN(pref) || pref < 0 || pref > 32) throw new Error('Use CIDR format: e.g. 192.168.1.0/24');
        const octs = ipStr.split('.').map(Number);
        if (octs.length !== 4 || octs.some(o => isNaN(o) || o < 0 || o > 255)) throw new Error('Invalid IP address');
        const ipInt = ip2int(ipStr);
        const mask = pref === 0 ? 0 : (~0 << (32 - pref)) >>> 0;
        const network = (ipInt & mask) >>> 0;
        const broadcast = (network | ~mask) >>> 0;
        const total = Math.pow(2, 32 - pref);
        const usable = pref >= 31 ? total : Math.max(0, total - 2);
        return { network: int2ip(network), broadcast: int2ip(broadcast), mask: int2ip(mask), first: pref >= 31 ? int2ip(network) : int2ip(network + 1), last: pref >= 31 ? int2ip(broadcast) : int2ip(broadcast - 1), total, usable, pref, error: null };
    } catch (e: any) { return { error: e.message as string }; }
};

const computeHash = async (algo: string, text: string) => {
    const buf = await crypto.subtle.digest(algo, new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
};

// ── New utilities ──────────────────────────────────────────────────────────

const toBinary  = (s: string) => Array.from(s).map(c => c.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
const fromBinary = (s: string) => { try { const g = s.trim().replace(/\s+/g,'').match(/.{8}/g); if (!g) return 'Error: input must be groups of 8 bits'; return g.map(b => String.fromCharCode(parseInt(b,2))).join(''); } catch { return 'Error: invalid binary'; } };

const htmlEncode = (s: string) => s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const htmlDecode = (s: string) => { try { const t = document.createElement('textarea'); t.innerHTML = s; return t.value; } catch { return 'Error'; } };

const MORSE: Record<string, string> = { A:'.-',B:'-...',C:'-.-.',D:'-..',E:'.',F:'..-.',G:'--.',H:'....',I:'..',J:'.---',K:'-.-',L:'.-..',M:'--',N:'-.',O:'---',P:'.--.',Q:'--.-',R:'.-.',S:'...',T:'-',U:'..-',V:'...-',W:'.--',X:'-..-',Y:'-.--',Z:'--..',0:'-----',1:'.----',2:'..---',3:'...--',4:'....-',5:'.....',6:'-....',7:'--...',8:'---..',9:'----.' };
const MORSE_REV = Object.fromEntries(Object.entries(MORSE).map(([k,v])=>[v,k]));
const morseEncode = (s: string) => s.toUpperCase().split('').map(c => c===' ' ? '/' : (MORSE[c]||'?')).join(' ');
const morseDecode = (s: string) => s.split(' / ').map(w => w.split(' ').map(c => MORSE_REV[c]||'?').join('')).join(' ');

const xorCipher = (text: string, key: string): { text: string; hex: string } => {
    if (!key) return { text: 'Error: key required', hex: '' };
    const bytes = Array.from(text).map((c,i) => c.charCodeAt(0) ^ key.charCodeAt(i % key.length));
    return { text: bytes.map(b => String.fromCharCode(b)).join(''), hex: bytes.map(b => b.toString(16).padStart(2,'0')).join(' ') };
};

const atbash = (s: string) => s.replace(/[a-zA-Z]/g, c => { const b = c <= 'Z' ? 65 : 97; return String.fromCharCode(b + 25 - (c.charCodeAt(0) - b)); });

const genPassword = (len: number, lo: boolean, up: boolean, num: boolean, sym: boolean) => {
    const pool = (lo?'abcdefghijklmnopqrstuvwxyz':'')+(up?'ABCDEFGHIJKLMNOPQRSTUVWXYZ':'')+(num?'0123456789':'')+(sym?'!@#$%^&*()-_=+[]{}|;:,.<>?':'');
    if (!pool) return '';
    const arr = new Uint32Array(len); crypto.getRandomValues(arr);
    return Array.from(arr).map(n => pool[n % pool.length]).join('');
};

const checkStrength = (p: string) => {
    const lo=/[a-z]/.test(p), up=/[A-Z]/.test(p), num=/[0-9]/.test(p), sym=/[^a-zA-Z0-9]/.test(p);
    let cs=0; if(lo)cs+=26; if(up)cs+=26; if(num)cs+=10; if(sym)cs+=32;
    const entropy = cs>0 ? Math.round(p.length * Math.log2(cs)) : 0;
    const score = [p.length>=8, p.length>=16, lo, up, num, sym].filter(Boolean).length;
    const level = score<=2?'Weak':score===3?'Fair':score===4?'Good':score===5?'Strong':'Very Strong';
    const color = score<=2?'text-red-400':score===3?'text-orange-400':score===4?'text-yellow-400':score===5?'text-emerald-400':'text-cyan-400';
    return { lo, up, num, sym, entropy, score, level, color, len: p.length };
};

const ts2date = (ts: string) => { const d = new Date(parseInt(ts)*1000); return isNaN(d.getTime()) ? null : { utc: d.toUTCString(), iso: d.toISOString(), local: d.toLocaleString(), ms: (parseInt(ts)*1000).toString() }; };
const date2ts = (s: string) => { const d = new Date(s); return isNaN(d.getTime()) ? null : Math.floor(d.getTime()/1000); };

const genUUID = () => { const a=new Uint8Array(16); crypto.getRandomValues(a); a[6]=(a[6]&0x0f)|0x40; a[8]=(a[8]&0x3f)|0x80; const h=Array.from(a).map(b=>b.toString(16).padStart(2,'0')).join(''); return `${h.slice(0,8)}-${h.slice(8,12)}-${h.slice(12,16)}-${h.slice(16,20)}-${h.slice(20)}`; };

const toCamel  = (s: string) => s.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_,c)=>c.toUpperCase());
const toPascal = (s: string) => { const c=toCamel(s); return c.charAt(0).toUpperCase()+c.slice(1); };
const toSnake  = (s: string) => s.replace(/([a-z])([A-Z])/g,'$1_$2').replace(/[\W]+/g,'_').replace(/^_|_$/g,'').toLowerCase();
const toKebab  = (s: string) => toSnake(s).replace(/_/g,'-');
const toTitle  = (s: string) => s.toLowerCase().replace(/\b\w/g, c=>c.toUpperCase());
const toConst  = (s: string) => toSnake(s).toUpperCase();

const testRegex = (pat: string, flags: string, text: string) => { try { const rx=new RegExp(pat,flags); const all=[...text.matchAll(new RegExp(pat,flags.includes('g')?flags:flags+'g'))]; return { valid:true, count:all.length, matches:all }; } catch(e:any){ return { valid:false, error:e.message, count:0, matches:[] }; } };

const inspectStr = (s: string) => {
    const words=s.trim().split(/\s+/).filter(Boolean).length;
    const lines=s.split('\n').length;
    const bytes=new TextEncoder().encode(s).length;
    const freq: Record<string,number>={};
    for(const c of s) freq[c]=(freq[c]||0)+1;
    const n=s.length;
    const entropy=n===0?0:-Object.values(freq).reduce((a,v)=>{const p=v/n;return a+p*Math.log2(p);},0);
    const top=Object.entries(freq).sort((a,b)=>b[1]-a[1]).slice(0,6);
    return { chars:n, words, lines, bytes, unique:Object.keys(freq).length, entropy:entropy.toFixed(3), top };
};

// ── Common Ports Data ──────────────────────────────────────────────────────

const PORTS = [
    { port: 20, proto: 'TCP', service: 'FTP-Data', desc: 'File Transfer Protocol – data channel' },
    { port: 21, proto: 'TCP', service: 'FTP', desc: 'File Transfer Protocol – control channel' },
    { port: 22, proto: 'TCP', service: 'SSH', desc: 'Secure Shell encrypted remote login' },
    { port: 23, proto: 'TCP', service: 'Telnet', desc: 'Unencrypted remote login (deprecated, dangerous)' },
    { port: 25, proto: 'TCP', service: 'SMTP', desc: 'Simple Mail Transfer Protocol' },
    { port: 53, proto: 'TCP/UDP', service: 'DNS', desc: 'Domain Name System' },
    { port: 67, proto: 'UDP', service: 'DHCP-S', desc: 'DHCP Server – assigns IP addresses' },
    { port: 68, proto: 'UDP', service: 'DHCP-C', desc: 'DHCP Client – receives IP configuration' },
    { port: 80, proto: 'TCP', service: 'HTTP', desc: 'Hypertext Transfer Protocol' },
    { port: 110, proto: 'TCP', service: 'POP3', desc: 'Post Office Protocol v3 – email retrieval' },
    { port: 137, proto: 'UDP', service: 'NetBIOS', desc: 'NetBIOS Name Service' },
    { port: 139, proto: 'TCP', service: 'NetBIOS', desc: 'NetBIOS Session Service' },
    { port: 143, proto: 'TCP', service: 'IMAP', desc: 'Internet Message Access Protocol' },
    { port: 161, proto: 'UDP', service: 'SNMP', desc: 'Simple Network Management Protocol' },
    { port: 389, proto: 'TCP', service: 'LDAP', desc: 'Lightweight Directory Access Protocol' },
    { port: 443, proto: 'TCP', service: 'HTTPS', desc: 'HTTP Secure over TLS/SSL' },
    { port: 445, proto: 'TCP', service: 'SMB', desc: 'Server Message Block – Windows file sharing' },
    { port: 636, proto: 'TCP', service: 'LDAPS', desc: 'LDAP over SSL' },
    { port: 993, proto: 'TCP', service: 'IMAPS', desc: 'IMAP over SSL/TLS' },
    { port: 995, proto: 'TCP', service: 'POP3S', desc: 'POP3 over SSL/TLS' },
    { port: 1433, proto: 'TCP', service: 'MSSQL', desc: 'Microsoft SQL Server' },
    { port: 1521, proto: 'TCP', service: 'Oracle', desc: 'Oracle Database listener' },
    { port: 2049, proto: 'TCP', service: 'NFS', desc: 'Network File System' },
    { port: 3306, proto: 'TCP', service: 'MySQL', desc: 'MySQL / MariaDB database' },
    { port: 3389, proto: 'TCP', service: 'RDP', desc: 'Remote Desktop Protocol' },
    { port: 5432, proto: 'TCP', service: 'PostgreSQL', desc: 'PostgreSQL database' },
    { port: 5900, proto: 'TCP', service: 'VNC', desc: 'Virtual Network Computing remote desktop' },
    { port: 6379, proto: 'TCP', service: 'Redis', desc: 'Redis in-memory data store' },
    { port: 8080, proto: 'TCP', service: 'HTTP-Alt', desc: 'HTTP alternate / proxy port' },
    { port: 8443, proto: 'TCP', service: 'HTTPS-Alt', desc: 'HTTPS alternate port' },
    { port: 27017, proto: 'TCP', service: 'MongoDB', desc: 'MongoDB NoSQL database' },
];

// ── Reusable UI atoms ──────────────────────────────────────────────────────

const IA = 'w-full bg-[#0B1120] border border-white/10 text-gray-200 text-xs font-mono p-3 rounded-sm resize-none focus:outline-none focus:border-red-500/50 placeholder:text-gray-600';
const INPUT = 'w-full bg-[#0B1120] border border-white/10 text-gray-200 text-xs font-mono p-2.5 rounded-sm focus:outline-none focus:border-red-500/50 placeholder:text-gray-600';
const LABEL = 'block text-[10px] font-mono font-bold uppercase tracking-widest text-gray-500 mb-1.5';
const BTN = 'px-4 py-2 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm transition-all duration-150';
const BTN_RED = `${BTN} bg-red-500/20 text-red-400 border border-red-500/40 hover:bg-red-500/30 hover:border-red-500/60`;
const BTN_GHOST = `${BTN} bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-white`;

function CopyBtn({ text }: { text: string }) {
    const [done, setDone] = useState(false);
    const copy = () => { navigator.clipboard.writeText(text); setDone(true); setTimeout(() => setDone(false), 1500); };
    if (!text) return null;
    return (
        <button onClick={copy} className="flex items-center gap-1.5 px-2.5 py-1 text-[10px] font-mono font-bold uppercase tracking-widest rounded-sm border transition-all bg-white/5 border-white/10 hover:bg-white/10 text-gray-400 hover:text-white">
            {done ? <><Check className="w-3 h-3 text-emerald-400" /><span className="text-emerald-400">Copied</span></> : <><Copy className="w-3 h-3" />Copy</>}
        </button>
    );
}

function OutputBlock({ label, value }: { label: string; value: string }) {
    if (!value) return null;
    return (
        <div>
            <div className="flex items-center justify-between mb-1.5">
                <span className={LABEL}>{label}</span>
                <CopyBtn text={value} />
            </div>
            <div className="bg-[#0B1120] border border-white/10 rounded-sm p-3 min-h-[60px]">
                <pre className="text-xs font-mono text-gray-300 whitespace-pre-wrap break-all leading-relaxed">{value}</pre>
            </div>
        </div>
    );
}

// ── Tool Components ────────────────────────────────────────────────────────

function Base64Tool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const run = () => setOutput(mode === 'encode' ? b64Encode(input) : b64Decode(input));
    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                {(['encode', 'decode'] as const).map(m => (
                    <button key={m} onClick={() => { setMode(m); setOutput(''); }} className={`${BTN} border ${mode === m ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>{m}</button>
                ))}
            </div>
            <div><label className={LABEL}>Input</label><textarea rows={4} className={IA} placeholder={mode === 'encode' ? 'Enter plain text...' : 'Enter Base64 string...'} value={input} onChange={e => setInput(e.target.value)} /></div>
            <div className="flex gap-2">
                <button onClick={run} className={BTN_RED}><span className="flex items-center gap-1.5"><Hash className="w-3 h-3" />{mode === 'encode' ? 'Encode' : 'Decode'}</span></button>
                <button onClick={() => { setInput(''); setOutput(''); }} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>
            </div>
            <OutputBlock label="Output" value={output} />
        </div>
    );
}

function URLEncoderTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const run = () => setOutput(mode === 'encode' ? urlEncode(input) : urlDecode(input));
    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                {(['encode', 'decode'] as const).map(m => (
                    <button key={m} onClick={() => { setMode(m); setOutput(''); }} className={`${BTN} border ${mode === m ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>{m}</button>
                ))}
            </div>
            <div><label className={LABEL}>Input</label><textarea rows={3} className={IA} placeholder={mode === 'encode' ? 'https://example.com/path?q=hello world' : 'https%3A%2F%2Fexample.com'} value={input} onChange={e => setInput(e.target.value)} /></div>
            <div className="flex gap-2">
                <button onClick={run} className={BTN_RED}>{mode === 'encode' ? 'Encode URL' : 'Decode URL'}</button>
                <button onClick={() => { setInput(''); setOutput(''); }} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>
            </div>
            <OutputBlock label="Output" value={output} />
        </div>
    );
}

function HexTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'toHex' | 'fromHex'>('toHex');
    const run = () => setOutput(mode === 'toHex' ? toHex(input) : fromHex(input));
    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <button onClick={() => { setMode('toHex'); setOutput(''); }} className={`${BTN} border ${mode === 'toHex' ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>Text → Hex</button>
                <button onClick={() => { setMode('fromHex'); setOutput(''); }} className={`${BTN} border ${mode === 'fromHex' ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>Hex → Text</button>
            </div>
            <div><label className={LABEL}>{mode === 'toHex' ? 'Plain Text' : 'Hex String (space-separated or continuous)'}</label>
                <textarea rows={3} className={IA} placeholder={mode === 'toHex' ? 'Hello World' : '48 65 6c 6c 6f'} value={input} onChange={e => setInput(e.target.value)} />
            </div>
            <div className="flex gap-2">
                <button onClick={run} className={BTN_RED}>Convert</button>
                <button onClick={() => { setInput(''); setOutput(''); }} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>
            </div>
            <OutputBlock label="Output" value={output} />
        </div>
    );
}

function ROT13Tool() {
    const [input, setInput] = useState('');
    const output = rot13(input);
    return (
        <div className="space-y-4">
            <p className="text-[11px] font-mono text-gray-500 leading-relaxed">ROT13 shifts each letter by 13 positions. It is self-inverse — applying it twice returns the original text.</p>
            <div><label className={LABEL}>Input</label><textarea rows={4} className={IA} placeholder="Type here... output updates live" value={input} onChange={e => setInput(e.target.value)} /></div>
            <div>
                <div className="flex items-center justify-between mb-1.5"><span className={LABEL}>ROT13 Output (live)</span><CopyBtn text={output} /></div>
                <div className="bg-[#0B1120] border border-white/10 rounded-sm p-3 min-h-[60px]">
                    <pre className="text-xs font-mono text-emerald-400 whitespace-pre-wrap break-all leading-relaxed">{output || <span className="text-gray-600">Output will appear here...</span>}</pre>
                </div>
            </div>
            <button onClick={() => setInput('')} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>
        </div>
    );
}

function CaesarTool() {
    const [input, setInput] = useState('');
    const [shift, setShift] = useState(3);
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
    const [output, setOutput] = useState('');
    const run = () => setOutput(caesarCipher(input, shift, mode === 'decrypt'));
    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                {(['encrypt', 'decrypt'] as const).map(m => (
                    <button key={m} onClick={() => { setMode(m); setOutput(''); }} className={`${BTN} border ${mode === m ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>{m}</button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2"><label className={LABEL}>Text</label><textarea rows={3} className={IA} placeholder="Enter your text..." value={input} onChange={e => setInput(e.target.value)} /></div>
                <div>
                    <label className={LABEL}>Shift: <span className="text-red-400">{shift}</span></label>
                    <input type="range" aria-label="Caesar shift amount" min={1} max={25} value={shift} onChange={e => setShift(+e.target.value)} className="w-full accent-red-500 mt-2" />
                    <div className="flex justify-between text-[10px] font-mono text-gray-600 mt-1"><span>1</span><span>25</span></div>
                </div>
            </div>
            <div className="flex gap-2">
                <button onClick={run} className={BTN_RED}>{mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}</button>
                <button onClick={() => { setInput(''); setOutput(''); }} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>
            </div>
            <OutputBlock label="Output" value={output} />
        </div>
    );
}

function VigenereTool() {
    const [input, setInput] = useState('');
    const [key, setKey] = useState('');
    const [mode, setMode] = useState<'encrypt' | 'decrypt'>('encrypt');
    const [output, setOutput] = useState('');
    const run = () => setOutput(vigenereCipher(input, key, mode === 'decrypt'));
    return (
        <div className="space-y-4">
            <p className="text-[11px] font-mono text-gray-500 leading-relaxed">Vigenère cipher uses a keyword to shift each letter by a different amount. Non-alphabetic characters are preserved unchanged.</p>
            <div className="flex gap-2">
                {(['encrypt', 'decrypt'] as const).map(m => (
                    <button key={m} onClick={() => { setMode(m); setOutput(''); }} className={`${BTN} border ${mode === m ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>{m}</button>
                ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2"><label className={LABEL}>Text</label><textarea rows={3} className={IA} placeholder="Enter your text..." value={input} onChange={e => setInput(e.target.value)} /></div>
                <div><label className={LABEL}>Keyword</label><input className={INPUT + ' h-[76px]'} placeholder="e.g. KEY" value={key} onChange={e => setKey(e.target.value)} /></div>
            </div>
            <div className="flex gap-2">
                <button onClick={run} className={BTN_RED}>{mode === 'encrypt' ? 'Encrypt' : 'Decrypt'}</button>
                <button onClick={() => { setInput(''); setKey(''); setOutput(''); }} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>
            </div>
            <OutputBlock label="Output" value={output} />
        </div>
    );
}

function HashTool() {
    const [input, setInput] = useState('');
    const [algo, setAlgo] = useState('SHA-256');
    const [output, setOutput] = useState('');
    const [loading, setLoading] = useState(false);
    const run = async () => {
        if (!input) return;
        setLoading(true);
        try { setOutput(await computeHash(algo, input)); } catch { setOutput('Error: hashing failed'); }
        setLoading(false);
    };
    const ALGOS = ['SHA-1', 'SHA-256', 'SHA-384', 'SHA-512'];
    return (
        <div className="space-y-4">
            <p className="text-[11px] font-mono text-gray-500 leading-relaxed">Generates a one-way cryptographic hash of the input text. Uses the native <code className="text-red-400">SubtleCrypto</code> Web API — runs entirely in your browser.</p>
            <div className="flex flex-wrap gap-2">
                {ALGOS.map(a => (
                    <button key={a} onClick={() => { setAlgo(a); setOutput(''); }} className={`${BTN} border ${algo === a ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>{a}</button>
                ))}
            </div>
            <div><label className={LABEL}>Input Text</label><textarea rows={3} className={IA} placeholder="Enter text to hash..." value={input} onChange={e => setInput(e.target.value)} /></div>
            <div className="flex gap-2">
                <button onClick={run} disabled={loading} className={`${BTN_RED} disabled:opacity-50`}>
                    {loading ? 'Hashing...' : <span className="flex items-center gap-1.5"><Hash className="w-3 h-3" />Generate Hash</span>}
                </button>
                <button onClick={() => { setInput(''); setOutput(''); }} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>
            </div>
            {output && (
                <div>
                    <div className="flex items-center justify-between mb-1.5">
                        <span className={LABEL}>{algo} Hash</span>
                        <CopyBtn text={output} />
                    </div>
                    <div className="bg-[#0B1120] border border-emerald-500/20 rounded-sm p-3">
                        <pre className="text-xs font-mono text-emerald-400 break-all leading-relaxed">{output}</pre>
                    </div>
                </div>
            )}
        </div>
    );
}

function JWTTool() {
    const [input, setInput] = useState('');
    const result = input.trim() ? decodeJWT(input) : null;
    return (
        <div className="space-y-4">
            <p className="text-[11px] font-mono text-gray-500 leading-relaxed">Decodes a JWT token locally — your token never leaves the browser. Only decodes; does <span className="text-red-400">not</span> verify the signature.</p>
            <div><label className={LABEL}>JWT Token</label><textarea rows={3} className={IA} placeholder="Paste your JWT here: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." value={input} onChange={e => setInput(e.target.value)} /></div>
            {result?.error && <div className="px-3 py-2 rounded-sm border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-400">{result.error}</div>}
            {result && !result.error && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <div className="flex items-center justify-between mb-1.5"><span className={LABEL}>Header</span><CopyBtn text={result.header} /></div>
                        <pre className="bg-[#0B1120] border border-white/10 rounded-sm p-3 text-xs font-mono text-blue-400 whitespace-pre-wrap overflow-auto max-h-48">{result.header}</pre>
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-1.5"><span className={LABEL}>Payload</span><CopyBtn text={result.payload} /></div>
                        <pre className="bg-[#0B1120] border border-white/10 rounded-sm p-3 text-xs font-mono text-emerald-400 whitespace-pre-wrap overflow-auto max-h-48">{result.payload}</pre>
                    </div>
                    <div className="md:col-span-2">
                        <div className="flex items-center justify-between mb-1.5"><span className={LABEL}>Signature (raw, unverified)</span><CopyBtn text={result.sig} /></div>
                        <div className="bg-[#0B1120] border border-white/10 rounded-sm p-3"><pre className="text-xs font-mono text-yellow-400/80 break-all">{result.sig}</pre></div>
                    </div>
                </div>
            )}
            {input && <button onClick={() => setInput('')} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>}
        </div>
    );
}

function BaseConverterTool() {
    const [input, setInput] = useState('');
    const [from, setFrom] = useState<10 | 2 | 8 | 16>(10);
    const result = input ? convertBase(input, from) : null;
    const BASES: { label: string; val: 10 | 2 | 8 | 16; prefix: string }[] = [
        { label: 'DEC', val: 10, prefix: '' },
        { label: 'BIN', val: 2, prefix: '0b' },
        { label: 'OCT', val: 8, prefix: '0o' },
        { label: 'HEX', val: 16, prefix: '0x' },
    ];
    const labels: Record<number, string> = { 2: 'Binary (BIN)', 8: 'Octal (OCT)', 10: 'Decimal (DEC)', 16: 'Hexadecimal (HEX)' };
    return (
        <div className="space-y-4">
            <p className="text-[11px] font-mono text-gray-500 leading-relaxed">Converts a number between Binary, Octal, Decimal, and Hexadecimal. Output updates as you type.</p>
            <div className="flex flex-wrap gap-2">
                {BASES.map(b => (
                    <button key={b.val} onClick={() => { setFrom(b.val); setInput(''); }} className={`${BTN} border ${from === b.val ? 'bg-red-500/20 text-red-400 border-red-500/40' : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>{b.label}</button>
                ))}
            </div>
            <div><label className={LABEL}>Input ({labels[from]})</label><input className={INPUT} placeholder={from === 2 ? '1010' : from === 8 ? '17' : from === 16 ? 'FF' : '255'} value={input} onChange={e => setInput(e.target.value)} /></div>
            {result ? (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {[{ k: 'bin', l: 'Binary', col: 'text-blue-400', pre: '0b' }, { k: 'oct', l: 'Octal', col: 'text-yellow-400', pre: '0o' }, { k: 'dec', l: 'Decimal', col: 'text-emerald-400', pre: '' }, { k: 'hex', l: 'Hex', col: 'text-red-400', pre: '0x' }].map(({ k, l, col, pre }) => (
                        <div key={k} className="bg-[#0B1120] border border-white/10 rounded-sm p-3">
                            <div className={LABEL}>{l}</div>
                            <div className={`${col} font-mono font-bold text-sm break-all`}>{pre}{(result as any)[k]}</div>
                        </div>
                    ))}
                </div>
            ) : input ? (
                <div className="px-3 py-2 rounded-sm border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-400">Invalid {labels[from]} number</div>
            ) : null}
            {input && <button onClick={() => setInput('')} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>}
        </div>
    );
}

function SubnetTool() {
    const [input, setInput] = useState('');
    const [result, setResult] = useState<any>(null);
    const run = () => setResult(calcSubnet(input));
    return (
        <div className="space-y-4">
            <p className="text-[11px] font-mono text-gray-500 leading-relaxed">Calculates subnet details from CIDR notation. Enter an IPv4 address and prefix length.</p>
            <div className="flex gap-2">
                <div className="flex-1"><label className={LABEL}>CIDR Notation</label><input className={INPUT} placeholder="192.168.1.0/24" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && run()} /></div>
                <div className="flex items-end gap-2">
                    <button type="button" onClick={run} className={BTN_RED}>Calculate</button>
                    <button type="button" aria-label="Clear" onClick={() => { setInput(''); setResult(null); }} className={BTN_GHOST}><RotateCcw className="w-3 h-3" /></button>
                </div>
            </div>
            {result?.error && <div className="px-3 py-2 rounded-sm border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-400">{result.error}</div>}
            {result && !result.error && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {[
                        { label: 'Network Address', val: result.network, col: 'text-blue-400' },
                        { label: 'Subnet Mask', val: result.mask, col: 'text-gray-300' },
                        { label: 'Broadcast Address', val: result.broadcast, col: 'text-yellow-400' },
                        { label: 'First Usable Host', val: result.first, col: 'text-emerald-400' },
                        { label: 'Last Usable Host', val: result.last, col: 'text-emerald-400' },
                        { label: 'CIDR Prefix', val: `/${result.pref}`, col: 'text-red-400' },
                        { label: 'Total Hosts', val: result.total.toLocaleString(), col: 'text-white' },
                        { label: 'Usable Hosts', val: result.usable.toLocaleString(), col: 'text-white' },
                    ].map(({ label, val, col }) => (
                        <div key={label} className="bg-[#0B1120] border border-white/10 rounded-sm p-3">
                            <div className={LABEL}>{label}</div>
                            <div className={`${col} font-mono font-bold text-sm`}>{val}</div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function PortReferenceTool() {
    const [q, setQ] = useState('');
    const filtered = PORTS.filter(p =>
        p.port.toString().includes(q) ||
        p.service.toLowerCase().includes(q.toLowerCase()) ||
        p.desc.toLowerCase().includes(q.toLowerCase()) ||
        p.proto.toLowerCase().includes(q.toLowerCase())
    );
    return (
        <div className="space-y-4">
            <div><label className={LABEL}>Search ports, services, or protocols</label>
                <input className={INPUT} placeholder="e.g. 443, SSH, TCP, database..." value={q} onChange={e => setQ(e.target.value)} /></div>
            <div className="text-[10px] font-mono text-gray-600 uppercase tracking-widest">{filtered.length} / {PORTS.length} ports</div>
            <div className="border border-white/10 rounded-sm overflow-hidden">
                <div className="grid grid-cols-12 gap-2 px-3 py-2 bg-white/[0.03] border-b border-white/10">
                    {['Port', 'Proto', 'Service', 'Description'].map(h => (
                        <span key={h} className={`${h === 'Description' ? 'col-span-6' : h === 'Service' ? 'col-span-3' : 'col-span-1 md:col-span-1'} text-[9px] font-mono font-bold uppercase tracking-widest text-gray-500`}>{h}</span>
                    ))}
                </div>
                <div className="max-h-80 overflow-y-auto custom-scrollbar">
                    {filtered.map((p, i) => (
                        <div key={p.port} className={`grid grid-cols-12 gap-2 px-3 py-2 border-b border-white/5 ${i % 2 === 0 ? 'bg-white/[0.01]' : ''} hover:bg-white/[0.04] transition-colors`}>
                            <span className="col-span-2 md:col-span-2 text-xs font-mono font-bold text-red-400">{p.port}</span>
                            <span className="col-span-2 md:col-span-2 text-[10px] font-mono font-bold text-blue-400 uppercase">{p.proto}</span>
                            <span className="col-span-3 text-[10px] font-mono text-emerald-400">{p.service}</span>
                            <span className="col-span-5 text-[10px] font-mono text-gray-400 leading-relaxed">{p.desc}</span>
                        </div>
                    ))}
                    {filtered.length === 0 && (
                        <div className="px-3 py-8 text-center text-xs font-mono text-gray-600">No ports match your search</div>
                    )}
                </div>
            </div>
        </div>
    );
}

function BinaryTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'toBin' | 'fromBin'>('toBin');
    const run = () => setOutput(mode === 'toBin' ? toBinary(input) : fromBinary(input));
    return (
        <div className="space-y-4">
            <div className="flex gap-2">
                <button type="button" onClick={() => { setMode('toBin'); setOutput(''); }} className={`${BTN} border ${mode==='toBin'?'bg-red-500/20 text-red-400 border-red-500/40':'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>Text → Binary</button>
                <button type="button" onClick={() => { setMode('fromBin'); setOutput(''); }} className={`${BTN} border ${mode==='fromBin'?'bg-red-500/20 text-red-400 border-red-500/40':'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>Binary → Text</button>
            </div>
            <div><label className={LABEL}>{mode === 'toBin' ? 'Plain Text' : 'Binary (8-bit groups, space-separated)'}</label>
                <textarea rows={3} className={IA} placeholder={mode==='toBin'?'Hello':'01001000 01100101 01101100'} value={input} onChange={e => setInput(e.target.value)} />
            </div>
            <div className="flex gap-2">
                <button type="button" onClick={run} className={BTN_RED}>Convert</button>
                <button type="button" onClick={() => { setInput(''); setOutput(''); }} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>
            </div>
            <OutputBlock label="Output" value={output} />
        </div>
    );
}

function HTMLEntitiesTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const run = () => setOutput(mode === 'encode' ? htmlEncode(input) : htmlDecode(input));
    return (
        <div className="space-y-4">
            <p className="text-[11px] font-mono text-gray-500">Encode special characters as HTML entities (<code className="text-red-400">&amp;lt; &amp;gt; &amp;amp; &amp;quot; &amp;#39;</code>) or decode them back.</p>
            <div className="flex gap-2">
                {(['encode','decode'] as const).map(m => (
                    <button key={m} type="button" onClick={() => { setMode(m); setOutput(''); }} className={`${BTN} border ${mode===m?'bg-red-500/20 text-red-400 border-red-500/40':'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>{m}</button>
                ))}
            </div>
            <div><label className={LABEL}>{mode==='encode'?'HTML / Text':'HTML Entities'}</label>
                <textarea rows={3} className={IA} placeholder={mode==='encode'?'<script>alert("xss")</script>':'&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;'} value={input} onChange={e => setInput(e.target.value)} />
            </div>
            <div className="flex gap-2">
                <button type="button" onClick={run} className={BTN_RED}>{mode==='encode'?'Encode':'Decode'}</button>
                <button type="button" onClick={() => { setInput(''); setOutput(''); }} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>
            </div>
            <OutputBlock label="Output" value={output} />
        </div>
    );
}

function MorseTool() {
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');
    const [mode, setMode] = useState<'encode' | 'decode'>('encode');
    const run = () => setOutput(mode === 'encode' ? morseEncode(input) : morseDecode(input));
    return (
        <div className="space-y-4">
            <p className="text-[11px] font-mono text-gray-500">Supports A–Z, 0–9. Word separator is <code className="text-red-400">/</code> in Morse output. Non-supported characters are shown as <code className="text-red-400">?</code>.</p>
            <div className="flex gap-2">
                {(['encode','decode'] as const).map(m => (
                    <button key={m} type="button" onClick={() => { setMode(m); setOutput(''); }} className={`${BTN} border ${mode===m?'bg-red-500/20 text-red-400 border-red-500/40':'bg-white/5 text-gray-400 border-white/10 hover:text-white'}`}>{m}</button>
                ))}
            </div>
            <div><label className={LABEL}>{mode==='encode'?'Plain Text':'Morse Code (use / between words)'}</label>
                <textarea rows={3} className={IA} placeholder={mode==='encode'?'HELLO WORLD':'.... . .-.. .-.. --- / .-- --- .-. .-.. -..'} value={input} onChange={e => setInput(e.target.value)} />
            </div>
            <div className="flex gap-2">
                <button type="button" onClick={run} className={BTN_RED}>{mode==='encode'?'Encode to Morse':'Decode from Morse'}</button>
                <button type="button" onClick={() => { setInput(''); setOutput(''); }} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>
            </div>
            <OutputBlock label="Output" value={output} />
        </div>
    );
}

function XORTool() {
    const [input, setInput] = useState('');
    const [key, setKey] = useState('');
    const [result, setResult] = useState<{ text: string; hex: string } | null>(null);
    const run = () => setResult(xorCipher(input, key));
    return (
        <div className="space-y-4">
            <p className="text-[11px] font-mono text-gray-500 leading-relaxed">XOR each byte of the input with the key (cycled). Output is shown as hex because raw XOR bytes are often non-printable. XOR is self-inverse — apply the same key twice to recover the original.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2"><label className={LABEL}>Input Text</label><textarea rows={3} className={IA} placeholder="Enter text to XOR..." value={input} onChange={e => setInput(e.target.value)} /></div>
                <div><label className={LABEL}>Key</label><input className={INPUT} placeholder="secret" value={key} onChange={e => setKey(e.target.value)} /></div>
            </div>
            <div className="flex gap-2">
                <button type="button" onClick={run} className={BTN_RED}><Zap className="w-3 h-3 inline mr-1" />XOR</button>
                <button type="button" onClick={() => { setInput(''); setKey(''); setResult(null); }} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>
            </div>
            {result && !result.text.startsWith('Error') && (
                <div className="space-y-3">
                    <OutputBlock label="Output (Hex)" value={result.hex} />
                    <OutputBlock label="Output (Raw — may contain non-printable chars)" value={result.text} />
                </div>
            )}
            {result?.text.startsWith('Error') && <div className="px-3 py-2 rounded-sm border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-400">{result.text}</div>}
        </div>
    );
}

function AtbashTool() {
    const [input, setInput] = useState('');
    const output = atbash(input);
    return (
        <div className="space-y-4">
            <p className="text-[11px] font-mono text-gray-500">Atbash maps A↔Z, B↔Y, C↔X… It is self-inverse. Numbers and symbols are unchanged. Output updates live.</p>
            <div><label className={LABEL}>Input</label><textarea rows={4} className={IA} placeholder="Type here..." value={input} onChange={e => setInput(e.target.value)} /></div>
            <div>
                <div className="flex items-center justify-between mb-1.5"><span className={LABEL}>Atbash Output (live)</span><CopyBtn text={output} /></div>
                <div className="bg-[#0B1120] border border-white/10 rounded-sm p-3 min-h-[60px]">
                    <pre className="text-xs font-mono text-emerald-400 whitespace-pre-wrap break-all">{output || <span className="text-gray-600">Output appears here...</span>}</pre>
                </div>
            </div>
            <button type="button" onClick={() => setInput('')} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>
        </div>
    );
}

function PasswordGenTool() {
    const [len, setLen] = useState(20);
    const [lo, setLo] = useState(true);
    const [up, setUp] = useState(true);
    const [num, setNum] = useState(true);
    const [sym, setSym] = useState(true);
    const [pwd, setPwd] = useState('');
    const generate = () => setPwd(genPassword(len, lo, up, num, sym));
    const pool = (lo?26:0)+(up?26:0)+(num?10:0)+(sym?32:0);
    const entropy = pool>0 ? Math.round(len * Math.log2(pool)) : 0;
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {([['Lowercase a–z', lo, setLo], ['Uppercase A–Z', up, setUp], ['Numbers 0–9', num, setNum], ['Symbols !@#…', sym, setSym]] as [string, boolean, (v:boolean)=>void][]).map(([label, val, setter]) => (
                    <label key={label} className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={val} onChange={e=>setter(e.target.checked)} className="accent-red-500 w-4 h-4" />
                        <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{label}</span>
                    </label>
                ))}
            </div>
            <div>
                <label className={LABEL}>Length: <span className="text-red-400">{len}</span> chars · Entropy: <span className="text-emerald-400">~{entropy} bits</span></label>
                <input type="range" aria-label="Password length" min={8} max={64} value={len} onChange={e=>setLen(+e.target.value)} className="w-full accent-red-500 mt-1" />
                <div className="flex justify-between text-[10px] font-mono text-gray-600 mt-1"><span>8</span><span>64</span></div>
            </div>
            <button type="button" onClick={generate} className={BTN_RED}><RefreshCw className="w-3 h-3 inline mr-1" />Generate Password</button>
            {pwd && (
                <div>
                    <div className="flex items-center justify-between mb-1.5"><span className={LABEL}>Generated Password</span><CopyBtn text={pwd} /></div>
                    <div className="bg-[#0B1120] border border-emerald-500/20 rounded-sm p-4"><pre className="text-sm font-mono text-emerald-300 tracking-wider break-all">{pwd}</pre></div>
                </div>
            )}
        </div>
    );
}

function PasswordStrengthTool() {
    const [input, setInput] = useState('');
    const r = input ? checkStrength(input) : null;
    const barW = r ? `${Math.round((r.score / 6) * 100)}%` : '0%';
    return (
        <div className="space-y-4">
            <div><label className={LABEL}>Password to Analyze</label>
                <input type="text" className={INPUT} placeholder="Enter any password..." value={input} onChange={e=>setInput(e.target.value)} autoComplete="off" />
            </div>
            {r && (
                <>
                    <div>
                        <div className="flex justify-between mb-1.5">
                            <span className={LABEL}>Strength</span>
                            <span className={`text-xs font-mono font-bold uppercase tracking-widest ${r.color}`}>{r.level}</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-sm h-2">
                            <div className={`h-2 rounded-sm transition-all duration-500 ${r.score<=2?'bg-red-500':r.score===3?'bg-orange-500':r.score===4?'bg-yellow-500':r.score===5?'bg-emerald-500':'bg-cyan-400'}`} style={{ width: barW }} />
                        </div>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                            { label: 'Length', val: `${r.len} chars`, ok: r.len >= 12 },
                            { label: 'Entropy', val: `~${r.entropy} bits`, ok: r.entropy >= 60 },
                            { label: 'Lowercase', val: r.lo ? 'Yes' : 'No', ok: r.lo },
                            { label: 'Uppercase', val: r.up ? 'Yes' : 'No', ok: r.up },
                            { label: 'Numbers', val: r.num ? 'Yes' : 'No', ok: r.num },
                            { label: 'Symbols', val: r.sym ? 'Yes' : 'No', ok: r.sym },
                        ].map(({ label, val, ok }) => (
                            <div key={label} className={`bg-[#0B1120] rounded-sm p-3 border ${ok?'border-emerald-500/20':'border-red-500/20'}`}>
                                <div className={LABEL}>{label}</div>
                                <div className={`text-xs font-mono font-bold ${ok?'text-emerald-400':'text-red-400'}`}>{val}</div>
                            </div>
                        ))}
                    </div>
                    <p className="text-[10px] font-mono text-gray-600">Entropy is estimated based on character set size × password length. Does not account for dictionary attacks.</p>
                </>
            )}
        </div>
    );
}

function TimestampTool() {
    const [tsInput, setTsInput] = useState('');
    const [dateInput, setDateInput] = useState('');
    const [tsResult, setTsResult] = useState<any>(null);
    const [dateResult, setDateResult] = useState<number|null>(null);
    const now = () => setTsInput(String(Math.floor(Date.now()/1000)));
    return (
        <div className="space-y-6">
            <div className="space-y-3">
                <p className={LABEL}>Unix Timestamp → Human Date</p>
                <div className="flex gap-2">
                    <input className={INPUT} placeholder="e.g. 1700000000" value={tsInput} onChange={e => { setTsInput(e.target.value); setTsResult(null); }} />
                    <button type="button" onClick={() => setTsResult(ts2date(tsInput))} className={BTN_RED}>Convert</button>
                    <button type="button" onClick={now} className={BTN_GHOST} title="Use current timestamp"><Clock className="w-3.5 h-3.5" /></button>
                </div>
                {tsResult === null ? null : tsResult ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[['UTC', tsResult.utc, 'text-blue-400'], ['ISO 8601', tsResult.iso, 'text-emerald-400'], ['Local', tsResult.local, 'text-yellow-400']].map(([l,v,c]) => (
                            <div key={l as string} className="bg-[#0B1120] border border-white/10 rounded-sm p-3">
                                <div className={LABEL}>{l as string}</div>
                                <div className={`text-[11px] font-mono ${c as string} break-all`}>{v as string}</div>
                            </div>
                        ))}
                    </div>
                ) : <div className="text-xs font-mono text-red-400">Invalid timestamp</div>}
            </div>
            <div className="border-t border-white/5 pt-5 space-y-3">
                <p className={LABEL}>Date / DateTime → Unix Timestamp</p>
                <div className="flex gap-2">
                    <input type="datetime-local" aria-label="Date and time" className={INPUT} value={dateInput} onChange={e => { setDateInput(e.target.value); setDateResult(null); }} />
                    <button type="button" onClick={() => setDateResult(date2ts(dateInput))} className={BTN_RED}>Convert</button>
                </div>
                {dateResult !== null && (
                    <div>
                        <div className="bg-[#0B1120] border border-white/10 rounded-sm p-3">
                            <div className={LABEL}>Unix Timestamp (seconds)</div>
                            <div className="flex items-center justify-between">
                                <span className="text-lg font-mono font-bold text-emerald-400">{dateResult}</span>
                                <CopyBtn text={String(dateResult)} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function UUIDTool() {
    const [uuids, setUuids] = useState<string[]>([]);
    const [count, setCount] = useState(5);
    const generate = () => setUuids(Array.from({ length: count }, genUUID));
    return (
        <div className="space-y-4">
            <p className="text-[11px] font-mono text-gray-500">Generates RFC 4122 version 4 UUIDs using <code className="text-red-400">crypto.getRandomValues</code> — cryptographically secure and fully client-side.</p>
            <div className="flex items-end gap-3">
                <div className="w-40">
                    <label className={LABEL}>Count: <span className="text-red-400">{count}</span></label>
                    <input type="range" aria-label="UUID count" min={1} max={20} value={count} onChange={e=>setCount(+e.target.value)} className="w-full accent-red-500 mt-1" />
                </div>
                <button type="button" onClick={generate} className={BTN_RED}><RefreshCw className="w-3 h-3 inline mr-1" />Generate</button>
                {uuids.length>0 && <button type="button" onClick={() => { navigator.clipboard.writeText(uuids.join('\n')); }} className={BTN_GHOST}><Copy className="w-3 h-3 inline mr-1" />Copy All</button>}
            </div>
            {uuids.length > 0 && (
                <div className="bg-[#0B1120] border border-white/10 rounded-sm divide-y divide-white/5">
                    {uuids.map((u,i) => (
                        <div key={i} className="flex items-center justify-between px-3 py-2 hover:bg-white/[0.03]">
                            <span className="text-xs font-mono text-emerald-400 tracking-widest">{u}</span>
                            <CopyBtn text={u} />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

function TextCaseTool() {
    const [input, setInput] = useState('');
    const cases = input ? [
        { label: 'lowercase',       val: input.toLowerCase() },
        { label: 'UPPERCASE',       val: input.toUpperCase() },
        { label: 'Title Case',      val: toTitle(input) },
        { label: 'camelCase',       val: toCamel(input) },
        { label: 'PascalCase',      val: toPascal(input) },
        { label: 'snake_case',      val: toSnake(input) },
        { label: 'kebab-case',      val: toKebab(input) },
        { label: 'SCREAMING_SNAKE', val: toConst(input) },
    ] : [];
    return (
        <div className="space-y-4">
            <div><label className={LABEL}>Input Text</label>
                <textarea rows={2} className={IA} placeholder="Enter text to convert..." value={input} onChange={e => setInput(e.target.value)} />
            </div>
            {cases.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {cases.map(({ label, val }) => (
                        <div key={label} className="bg-[#0B1120] border border-white/10 rounded-sm px-3 py-2 flex items-center justify-between gap-2">
                            <div className="min-w-0">
                                <div className={LABEL + ' mb-0.5'}>{label}</div>
                                <span className="text-xs font-mono text-gray-200 truncate block">{val}</span>
                            </div>
                            <CopyBtn text={val} />
                        </div>
                    ))}
                </div>
            )}
            {input && <button type="button" onClick={() => setInput('')} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>}
        </div>
    );
}

function RegexTool() {
    const [pattern, setPattern] = useState('');
    const [flags, setFlags] = useState('gm');
    const [text, setText] = useState('');
    const result = pattern && text ? testRegex(pattern, flags, text) : null;
    const FLAG_LIST = ['g','i','m','s','u'];
    return (
        <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="md:col-span-2">
                    <label className={LABEL}>Regex Pattern</label>
                    <input className={INPUT + (result && !result.valid ? ' border-red-500/50' : '')} placeholder="e.g. \\b[A-Z]\\w+" value={pattern} onChange={e => setPattern(e.target.value)} />
                </div>
                <div>
                    <label className={LABEL}>Flags</label>
                    <div className="flex gap-2 flex-wrap mt-1">
                        {FLAG_LIST.map(f => (
                            <button key={f} type="button" onClick={() => setFlags(flags.includes(f) ? flags.replace(f,'') : flags+f)} className={`${BTN} border text-[10px] ${flags.includes(f)?'bg-red-500/20 text-red-400 border-red-500/40':'bg-white/5 text-gray-400 border-white/10'}`}>{f}</button>
                        ))}
                    </div>
                </div>
            </div>
            <div><label className={LABEL}>Test String</label>
                <textarea rows={4} className={IA} placeholder="Enter your test text here..." value={text} onChange={e => setText(e.target.value)} />
            </div>
            {result && !result.valid && <div className="px-3 py-2 rounded-sm border border-red-500/30 bg-red-500/10 text-xs font-mono text-red-400">Invalid regex: {(result as any).error}</div>}
            {result?.valid && (
                <div className="space-y-3">
                    <p className="text-[11px] font-mono text-gray-500"><span className="text-emerald-400 font-bold">{result.count}</span> match{result.count !== 1 ? 'es' : ''} found</p>
                    {result.matches.length > 0 && (
                        <div className="bg-[#0B1120] border border-white/10 rounded-sm divide-y divide-white/5 max-h-64 overflow-y-auto custom-scrollbar">
                            {result.matches.slice(0, 50).map((m: RegExpMatchArray, i: number) => (
                                <div key={i} className="px-3 py-2">
                                    <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] font-mono text-gray-500 uppercase tracking-widest">Match {i+1} · index {m.index}</span>
                                        <CopyBtn text={m[0]} />
                                    </div>
                                    <span className="text-xs font-mono text-emerald-400">{m[0]}</span>
                                    {m.slice(1).map((g, gi) => g !== undefined && (
                                        <div key={gi} className="mt-1"><span className="text-[10px] font-mono text-gray-600">Group {gi+1}: </span><span className="text-[10px] font-mono text-blue-400">{g}</span></div>
                                    ))}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}

function StringInspectorTool() {
    const [input, setInput] = useState('');
    const r = input ? inspectStr(input) : null;
    return (
        <div className="space-y-4">
            <div><label className={LABEL}>Text to Inspect</label>
                <textarea rows={5} className={IA} placeholder="Paste any text here..." value={input} onChange={e => setInput(e.target.value)} />
            </div>
            {r && (
                <>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {[
                            { label: 'Characters',    val: r.chars.toLocaleString(),   col: 'text-white' },
                            { label: 'Words',         val: r.words.toLocaleString(),   col: 'text-blue-400' },
                            { label: 'Lines',         val: r.lines.toLocaleString(),   col: 'text-yellow-400' },
                            { label: 'Bytes (UTF-8)', val: r.bytes.toLocaleString(),   col: 'text-emerald-400' },
                            { label: 'Unique Chars',  val: r.unique.toLocaleString(),  col: 'text-purple-400' },
                            { label: 'Shannon Entropy', val: `${r.entropy} bits/char`, col: 'text-cyan-400' },
                        ].map(({ label, val, col }) => (
                            <div key={label} className="bg-[#0B1120] border border-white/10 rounded-sm p-3">
                                <div className={LABEL}>{label}</div>
                                <div className={`text-sm font-mono font-bold ${col}`}>{val}</div>
                            </div>
                        ))}
                    </div>
                    <div>
                        <p className={LABEL}>Top Characters by Frequency</p>
                        <div className="flex flex-wrap gap-2 mt-1">
                            {r.top.map(([char, cnt]: [string, number]) => (
                                <div key={char} className="bg-[#0B1120] border border-white/10 rounded-sm px-2.5 py-1.5 flex items-center gap-2">
                                    <span className="text-sm font-mono text-red-400">{char === ' ' ? '⎵' : char === '\n' ? '↵' : char === '\t' ? '⇥' : char}</span>
                                    <span className="text-[10px] font-mono text-gray-500">{cnt}×</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <p className="text-[10px] font-mono text-gray-600">Shannon entropy close to 0 = highly repetitive. Close to 8 = random/encrypted data.</p>
                </>
            )}
            {input && <button type="button" onClick={() => setInput('')} className={BTN_GHOST}><RotateCcw className="w-3 h-3 inline mr-1" />Clear</button>}
        </div>
    );
}

// ── Tools Manifest ─────────────────────────────────────────────────────────

interface ToolEntry {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: LucideIcon;
    Component: () => JSX.Element;
}

const TOOLS: ToolEntry[] = [
    // ── Encoding ──────────────────────────────────────────────────────────
    { id: 'base64',   name: 'Base64 Encoder / Decoder',  description: 'Encode or decode Base64 strings. Supports full Unicode input.',                                           category: 'Encoding',  icon: Code2,        Component: Base64Tool },
    { id: 'url',      name: 'URL Encoder / Decoder',      description: 'Percent-encode and decode URL components using encodeURIComponent.',                                       category: 'Encoding',  icon: Binary,       Component: URLEncoderTool },
    { id: 'hex',      name: 'Hex ↔ ASCII Converter',      description: 'Convert plain text to hex bytes or decode hex back to ASCII text.',                                        category: 'Encoding',  icon: Code2,        Component: HexTool },
    { id: 'binary',   name: 'Binary ↔ Text Converter',    description: 'Convert text to 8-bit binary strings or decode binary back to text.',                                      category: 'Encoding',  icon: Binary,       Component: BinaryTool },
    { id: 'html',     name: 'HTML Entities Encoder',       description: 'Encode special chars as HTML entities or decode them. Useful for XSS analysis.',                          category: 'Encoding',  icon: Code2,        Component: HTMLEntitiesTool },
    // ── Cipher ────────────────────────────────────────────────────────────
    { id: 'rot13',    name: 'ROT13',                       description: 'Self-inverse Caesar cipher with shift 13. Live output as you type.',                                       category: 'Cipher',    icon: Shuffle,      Component: ROT13Tool },
    { id: 'caesar',   name: 'Caesar Cipher',               description: 'Shift-based substitution cipher with configurable shift (1–25).',                                         category: 'Cipher',    icon: Shuffle,      Component: CaesarTool },
    { id: 'vigenere', name: 'Vigenère Cipher',             description: 'Polyalphabetic substitution cipher using a repeating keyword.',                                            category: 'Cipher',    icon: Key,          Component: VigenereTool },
    { id: 'morse',    name: 'Morse Code',                  description: 'Encode text into International Morse Code or decode Morse back to text. Supports A–Z and 0–9.',           category: 'Cipher',    icon: Radio,        Component: MorseTool },
    { id: 'xor',      name: 'XOR Cipher',                  description: 'XOR input text with a key. Output shown as hex bytes. Self-inverse — apply key twice to decrypt.',        category: 'Cipher',    icon: Zap,          Component: XORTool },
    { id: 'atbash',   name: 'Atbash Cipher',               description: 'Reverse alphabet substitution: A↔Z, B↔Y, C↔X… Self-inverse, live output.',                              category: 'Cipher',    icon: RotateCcw,    Component: AtbashTool },
    // ── Hash ──────────────────────────────────────────────────────────────
    { id: 'hash',     name: 'Hash Generator',              description: 'Generate SHA-1, SHA-256, SHA-384, or SHA-512 hashes via the SubtleCrypto API.',                           category: 'Hash',      icon: Hash,         Component: HashTool },
    { id: 'jwt',      name: 'JWT Token Decoder',           description: 'Decode and inspect JWT header and payload. Runs entirely in browser — never transmitted.',                category: 'Hash',      icon: Lock,         Component: JWTTool },
    // ── Security ──────────────────────────────────────────────────────────
    { id: 'passgen',  name: 'Password Generator',          description: 'Generate cryptographically secure random passwords with configurable charset and length.',                category: 'Security',  icon: KeyRound,     Component: PasswordGenTool },
    { id: 'passcheck',name: 'Password Strength Checker',   description: 'Analyze password entropy, charset coverage, and estimated strength level.',                               category: 'Security',  icon: ShieldCheck,  Component: PasswordStrengthTool },
    // ── Converter ─────────────────────────────────────────────────────────
    { id: 'baseconv', name: 'Number Base Converter',       description: 'Convert numbers between Binary, Octal, Decimal, and Hexadecimal.',                                        category: 'Converter', icon: Calculator,   Component: BaseConverterTool },
    { id: 'timestamp',name: 'Unix Timestamp Converter',    description: 'Convert Unix timestamps to human-readable dates (UTC, ISO, local) and vice versa.',                      category: 'Converter', icon: Clock,        Component: TimestampTool },
    { id: 'uuid',     name: 'UUID v4 Generator',           description: 'Generate multiple RFC 4122 v4 UUIDs using the Web Crypto API. Bulk generation up to 20 at once.',        category: 'Converter', icon: Fingerprint,  Component: UUIDTool },
    { id: 'textcase', name: 'Text Case Converter',         description: 'Convert text to lowercase, UPPERCASE, Title Case, camelCase, PascalCase, snake_case, kebab-case, and SCREAMING_SNAKE.', category: 'Converter', icon: Type, Component: TextCaseTool },
    // ── Network ───────────────────────────────────────────────────────────
    { id: 'subnet',   name: 'IPv4 Subnet Calculator',      description: 'Calculate network address, broadcast, host range, and total hosts from CIDR notation.',                  category: 'Network',   icon: Network,      Component: SubnetTool },
    { id: 'ports',    name: 'Common Ports Reference',      description: `Searchable reference of ${PORTS.length} well-known TCP/UDP ports with service descriptions.`,            category: 'Network',   icon: Server,       Component: PortReferenceTool },
    // ── Text ──────────────────────────────────────────────────────────────
    { id: 'regex',    name: 'Regex Tester',                description: 'Test regular expressions with live match highlighting, group capture display, and flag controls.',        category: 'Text',      icon: Search,       Component: RegexTool },
    { id: 'string',   name: 'String Inspector',            description: 'Analyze text: char/word/line count, byte size, unique chars, Shannon entropy, and frequency analysis.',   category: 'Text',      icon: FileText,     Component: StringInspectorTool },
];

const CATEGORIES = ['All', 'Encoding', 'Cipher', 'Hash', 'Security', 'Converter', 'Network', 'Text'];

const CAT_COLOR: Record<string, string> = {
    Encoding: 'text-blue-400 border-blue-500/30 bg-blue-500/10',
    Cipher:   'text-yellow-400 border-yellow-500/30 bg-yellow-500/10',
    Hash:     'text-purple-400 border-purple-500/30 bg-purple-500/10',
    Security: 'text-red-400 border-red-500/30 bg-red-500/10',
    Converter:'text-emerald-400 border-emerald-500/30 bg-emerald-500/10',
    Network:  'text-cyan-400 border-cyan-500/30 bg-cyan-500/10',
    Text:     'text-orange-400 border-orange-500/30 bg-orange-500/10',
};

// ── Page ───────────────────────────────────────────────────────────────────

export default function PlaygroundLearningTools() {
    const [activeId, setActiveId] = useState<string | null>(null);
    const [cat, setCat] = useState('All');

    const visible = TOOLS.filter(t => cat === 'All' || t.category === cat);

    return (
        <div className="pt-32 pb-20">
            <div className="container-custom">

                {/* Hero */}
                <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
                    <div className="w-20 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mb-8 rounded-sm" />
                    <div className="inline-flex p-4 rounded-sm border border-red-500/20 bg-[#0f172a] mb-6">
                        <Wrench className="w-12 h-12 text-red-500" />
                    </div>
                    <h1 className="text-5xl lg:text-7xl font-mono font-black mb-6 uppercase tracking-tighter">
                        <span className="text-white">Learning </span>
                        <span className="text-red-500">Tools</span>
                    </h1>
                    <p className="text-lg text-gray-400 font-mono max-w-2xl mx-auto">
                        {TOOLS.length} client-side utilities for encoding, ciphers, hashing, and network analysis.
                        All processing happens in your browser — no data is ever sent to a server.
                    </p>
                </motion.div>

                {/* Stats */}
                <motion.div className="flex flex-wrap justify-center gap-4 mb-12"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                    {[
                        { icon: Wrench, value: `${TOOLS.length}`, label: 'Tools' },
                        { icon: List, value: `${CATEGORIES.length - 1}`, label: 'Categories' },
                        { icon: Shield, value: '100%', label: 'Client-Side' },
                    ].map(({ icon: Icon, value, label }) => (
                        <div key={label} className="flex items-center gap-3 px-5 py-3 rounded-sm border border-white/10 bg-[#0B1120]">
                            <Icon className="w-4 h-4 text-red-500" />
                            <span className="text-base font-mono font-bold text-white uppercase tracking-tighter">{value}</span>
                            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-500">{label}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2 mb-8">
                    {CATEGORIES.map(c => (
                        <button key={c} onClick={() => { setCat(c); setActiveId(null); }}
                            className={`px-4 py-2 rounded-sm text-xs font-mono font-bold uppercase tracking-wider transition-all border ${cat === c ? 'bg-red-500/20 text-red-500 border-red-500/50' : 'bg-[#0f172a] text-gray-400 border-white/10 hover:text-white hover:border-white/20'}`}>
                            {c}
                        </button>
                    ))}
                </div>

                {/* Tool Cards */}
                <motion.div className="space-y-3"
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
                    {visible.map((tool) => {
                        const Icon = tool.icon;
                        const isOpen = activeId === tool.id;
                        return (
                            <div key={tool.id} className="rounded-sm border border-white/10 bg-[#0f172a] overflow-hidden">
                                <button
                                    onClick={() => setActiveId(isOpen ? null : tool.id)}
                                    className="w-full flex items-center justify-between p-5 text-left hover:brightness-110 transition-all"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-2.5 rounded-sm border border-white/10 bg-white/[0.04] flex-shrink-0">
                                            <Icon className="w-5 h-5 text-red-500" />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-3 flex-wrap mb-0.5">
                                                <h3 className="text-sm font-mono font-bold uppercase tracking-tight text-white">{tool.name}</h3>
                                                <span className={`text-[9px] font-mono font-bold px-2 py-0.5 rounded-sm border uppercase tracking-widest ${CAT_COLOR[tool.category]}`}>{tool.category}</span>
                                            </div>
                                            <p className="text-xs text-gray-500 font-mono">{tool.description}</p>
                                        </div>
                                    </div>
                                    {isOpen
                                        ? <ChevronUp className="w-4 h-4 text-red-500 flex-shrink-0 ml-4" />
                                        : <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0 ml-4 hover:text-red-400" />
                                    }
                                </button>

                                <AnimatePresence>
                                    {isOpen && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            transition={{ duration: 0.2, ease: 'easeInOut' }}
                                            className="overflow-hidden"
                                        >
                                            <div className="px-5 pb-6 pt-1 border-t border-white/5">
                                                <tool.Component />
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        );
                    })}
                </motion.div>

            </div>
        </div>
    );
}
