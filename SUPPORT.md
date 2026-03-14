<div align="center">

# Support

**Need help with Neverland Studio? We've got you covered.**

</div>

---

## Getting Support

### Email
- **Address:** Arlianto032@gmail.com
- **Response time:** 24–48 business hours

### GitHub Issues
- Open an issue at [GitHub Repository](https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2/issues)
- Use the correct template: **Bug Report** or **Feature Request**

### Documentation

| File | Contents |
|---|---|
| [README.md](README.md) | Full project overview, setup, API reference |
| [INSTALL.md](INSTALL.md) | Step-by-step installation guide (Docker + manual) |
| [CONTRIBUTING.md](CONTRIBUTING.md) | How to contribute code |
| [SECURITY.md](SECURITY.md) | Vulnerability reporting policy |
| [CHANGELOG.md](CHANGELOG.md) | Version history and upgrade guides |

---

## Frequently Asked Questions

<details>
<summary><strong>How do I run this project?</strong></summary>

The fastest way is with Docker:

```bash
git clone https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2.git
cd portfolio-neverland-studio
docker network create app-network
cp .env.example .env
docker-compose up -d --build
```

Visit **http://localhost:5173** (dev frontend) once containers are up.
See [INSTALL.md](INSTALL.md) for the full guide.

</details>

<details>
<summary><strong>What are the system requirements?</strong></summary>

| Component | Minimum | Recommended |
|---|---|---|
| Node.js | 22.x | 24.x (LTS) |
| PHP | 8.2 | 8.3+ |
| Composer | 2.x | latest |
| MySQL / MariaDB | 8.4 | 8.4+ |
| Docker | 24.x | 25.x+ |
| RAM | 4 GB | 8 GB+ |

</details>

<details>
<summary><strong>How do I report a bug?</strong></summary>

1. Check [existing issues](https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2/issues) first to avoid duplicates.
2. Open a new issue with:
   - **Steps to reproduce** — exact sequence to trigger the bug
   - **Expected behavior** — what should have happened
   - **Actual behavior** — what actually happened
   - **Environment** — OS, browser, Node.js version, PHP version
   - **Screenshots or video** — if applicable

</details>

<details>
<summary><strong>How do I report a security vulnerability?</strong></summary>

**Do not open a public issue.** Email **Arlianto032@gmail.com** directly with details.

We will acknowledge within 48 hours and aim to release a fix within 1–2 weeks. Full policy: [SECURITY.md](SECURITY.md).

</details>

<details>
<summary><strong>Is this project free to use?</strong></summary>

Yes. Neverland Studio is open source under the [MIT License](LICENSE). You are free to use, modify, and distribute it with attribution.

</details>

<details>
<summary><strong>How can I contribute?</strong></summary>

Read [CONTRIBUTING.md](CONTRIBUTING.md) for the full workflow. The short version:

1. Fork the repository
2. Create a branch: `git checkout -b feature/YourFeature`
3. Commit and push your changes
4. Open a Pull Request against `main`

</details>

<details>
<summary><strong>The real-time dashboard is not updating. What do I do?</strong></summary>

1. Confirm Laravel Reverb is running:
   ```bash
   cd backend && php artisan reverb:start
   ```

2. Verify `.env` values match on both frontend and backend:
   ```bash
   # backend/.env must have:
   BROADCAST_CONNECTION=reverb
   REVERB_APP_KEY=your_key
   REVERB_HOST=localhost
   REVERB_PORT=8080

   # .env (frontend) must have:
   VITE_REVERB_APP_KEY=your_key
   VITE_REVERB_HOST=localhost
   VITE_REVERB_PORT=8080
   ```

3. Clear config cache: `php artisan config:clear`

</details>

<details>
<summary><strong>The VM Playground requires login. Is that intended?</strong></summary>

Yes. Container provisioning requires authentication to prevent abuse of server resources. Log in or create an account, then you can start a free 1-hour VM session.

</details>

<details>
<summary><strong>My VM session expired. How do I continue accessing the server?</strong></summary>

After your 1-hour free session ends, you can connect directly to the VPS via OpenVPN:

1. Go to `/playground/ovpn`
2. Download `neverland-vpn.ovpn`
3. Connect:
   ```bash
   sudo apt install openvpn -y
   sudo openvpn --config neverland-vpn.ovpn
   ```
4. Verify connection: `curl -s ifconfig.me`

The VPN IP rotates every hour. Re-download the config after rotation to get the updated IP.

</details>

<details>
<summary><strong>The VPN config download is not working.</strong></summary>

1. Make sure the backend is running: `docker ps | grep neverland-backend`
2. Check that `VPS_IP` is set in `backend/.env`
3. Confirm `VPN_CA_CERT` and `VPN_TLS_AUTH_KEY` are populated with valid OpenVPN credentials
4. Try the URL directly: `http://localhost:8001/api/v1/vm/vpn-config/download`

</details>

<details>
<summary><strong>How do I connect via OpenVPN?</strong></summary>

```bash
# 1. Install OpenVPN
sudo apt install openvpn -y

# 2. Download the config from /playground/ovpn, then connect:
sudo openvpn --config neverland-vpn.ovpn

# 3. Verify VPN IP
curl -s ifconfig.me

# 4. Test gateway
ping 10.10.0.1
```

The config uses **AES-256-GCM** encryption, **SHA-512** HMAC auth, and **TLS 1.3** minimum.

</details>

---

## Useful Resources

| Resource | Link |
|---|---|
| Live Website | [portfolio.neverlandstudio.my.id](https://portfolio.neverlandstudio.my.id) |
| GitHub | [@MuhammadIsakiPrananda](https://github.com/MuhammadIsakiPrananda) |
| React Docs | [react.dev](https://react.dev) |
| Laravel Docs | [laravel.com/docs](https://laravel.com/docs) |
| TypeScript Docs | [typescriptlang.org/docs](https://www.typescriptlang.org/docs/) |
| Tailwind CSS Docs | [tailwindcss.com/docs](https://tailwindcss.com/docs) |
| Framer Motion Docs | [framer.com/motion](https://www.framer.com/motion/) |
| Docker Docs | [docs.docker.com](https://docs.docker.com) |

---

<div align="center">

Thank you for using **Neverland Studio**

</div>
