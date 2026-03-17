<div align="center">

# 🛡️ Security Policy

**We take the security of Neverland Studio and our users seriously.**

</div>

---

## 🚨 Reporting a Vulnerability

If you discover a security vulnerability in Neverland Studio, **please do not open a public GitHub issue**.

Instead, please report it responsibly by emailing:

📧 **Arlianto032@gmail.com**

Include as much detail as possible to help us reproduce and fix the issue quickly. We appreciate responsible disclosure and will credit you publicly (with your permission) once the fix is released.

---

## ⏱️ Response Timeline

| Stage | Timeframe |
|-------|-----------|
| **Initial acknowledgement** | 24–48 hours |
| **Severity assessment** | 3–5 business days |
| **Fix development & verification** | 1–2 weeks |
| **Public disclosure** | After the fix is released |

---

## ✅ Supported Versions

| Version | Supported | Status |
|---------|-----------|--------|
| **1.5.x (latest)** | ✅ Yes | Fully Supported |
| **1.4.x** | ✅ Yes | Fully Supported |
| **1.3.x** | ⚠️ Limited | Critical fixes only |
| **< 1.3** | ❌ No | End of Life |

---

## 🎯 Scope

### 🔍 In Scope
The following vulnerability types are in scope:
- Authentication bypass
- Authorization bypass (privilege escalation)
- SQL Injection
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Remote Code Execution (RCE)
- Local / Remote File Inclusion
- Sensitive data exposure
- Server-Side Request Forgery (SSRF)
- Insecure Direct Object References (IDOR)
- Denial of Service (application-level)

### ⛔ Out of Scope
The following are **not** in scope:
- Social engineering attacks
- Physical attacks against infrastructure
- Issues in third-party services or dependencies (report to them directly)
- Already publicly disclosed / known vulnerabilities
- Automated scanner results without proof of exploitability

---

## 🔐 Security Best Practices

### 💻 For Developers

1. **Input Validation**
   - Validate all user input on the server side using FormRequests.
   - Use prepared statements (Eloquent ORM) for all database queries — never raw SQL.
   - Sanitize output to prevent XSS.

2. **Authentication**
   - Use strong password hashing (`bcrypt` / `argon2`).
   - Implement rate limiting on auth endpoints.
   - Enforce **2FA** for admin accounts.

3. **Authorization**
   - Use Role-Based Access Control (Spatie Permission) on all protected routes.
   - Validate permissions at every API endpoint.
   - Never trust client-provided IDs without ownership verification.

4. **Data Protection**
   - Encrypt sensitive data at rest.
   - Use HTTPS everywhere (enforce in production).
   - Never log sensitive information (passwords, tokens, PII).

5. **Dependencies**
   - Keep Composer and npm packages up to date.
   - Review dependency audit reports regularly:
     ```bash
     npm audit
     composer audit
     ```

### 👤 For Users

1. Use a **strong, unique password** for your account.
2. Enable **Two-Factor Authentication (2FA)** in your account settings.
3. **Do not share** your API tokens or session cookies.
4. **Log out** of shared or public devices after use.
5. Report any suspicious activity immediately.

---

## 🛡️ Installed Security Features

This application implements the following major security measures:

| Feature | Implementation |
|---------|---------------|
| **Authentication** | Laravel Sanctum (token-based) |
| **2FA** | Google Authenticator (TOTP) |
| **Role & Permission** | Spatie Permission (RBAC) |
| **Activity Audit** | Spatie Activitylog |
| **CSRF Protection** | Laravel built-in CSRF middleware |
| **Rate Limiting** | Laravel rate limiter on core API routes |
| **XSS Protection** | React's built-in escaping + CSP headers |
| **SQL Injection** | Eloquent ORM with prepared statements |

<div align="center">
<br/>
<b>Thank you for helping keep Neverland Studio secure! 🔒</b>
</div>
