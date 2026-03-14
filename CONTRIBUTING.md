<div align="center">

# 🤝 Contributing to Neverland Studio

**Thank you for considering contributing to the Neverland Studio portfolio project! We welcome contributions from developers of all skill levels.**

[![Code of Conduct](https://img.shields.io/badge/Code%20of%20Conduct-Read-blue?style=for-the-badge)](CODE_OF_CONDUCT.md)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-brightgreen.svg?style=for-the-badge)](http://makeapullrequest.com)

</div>

---

## 📜 Code of Conduct

By participating in this project, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md). Please read it before contributing to ensure a welcoming environment for everyone.

---

## 🛠️ How to Contribute

### 🐜 Reporting Bugs

Before submitting a bug report, please **search existing issues** to avoid duplicates. When creating a report, include:

| Field | Description |
|-------|-------------|
| **Title** | A clear, concise summary of the bug |
| **Description** | A detailed explanation of the issue |
| **Steps to Reproduce** | Exact steps to reproduce the behavior |
| **Expected Behavior** | What you expected to happen |
| **Actual Behavior** | What actually happened |
| **Environment** | OS, browser, Node.js version, PHP version |
| **Screenshots** | If applicable, add visual context |

### ✨ Requesting Features

1. Check existing issues to see if the feature has already been requested.
2. Open a new issue with the label `feature-request` and include:
   - **Title** — Feature name
   - **Description** — Detailed explanation of the feature
   - **Use Case** — Why this feature would be valuable
   - **Alternatives** — Any alternative solutions you considered

### 🔄 Submitting Pull Requests

1. **Fork** the repository.
2. **Create a branch** from `main`:
   ```bash
   git checkout -b feature/YourAmazingFeature
   # or for bug fixes:
   git checkout -b fix/YourBugFix
   ```
3. **Make your changes** following the code standards below.
4. **Commit** with a descriptive message:
   ```bash
   git commit -m 'Add: YourAmazingFeature'
   # Prefixes: Add, Fix, Update, Remove, Refactor, Docs, Style, Test
   ```
5. **Push** to your branch:
   ```bash
   git push origin feature/YourAmazingFeature
   ```
6. **Open a Pull Request** against the `main` branch.

---

## 💻 Code Standards

### ⚛️ Frontend (React / TypeScript)

```typescript
// Use functional components with typed props
interface Props {
  title: string;
  onClick?: () => void;
}

const MyComponent: React.FC<Props> = ({ title, onClick }) => {
  return (
    <div onClick={onClick} className="p-4 bg-primary text-white rounded-lg">
      {title}
    </div>
  );
};

export default MyComponent;
```

**Rules:**
- Always use **TypeScript** with strict mode enabled.
- Follow the **Atomic Design** pattern: `atoms` → `molecules` → `organisms` → `pages`.
- Use **Tailwind CSS** utility classes for styling.
- Add **Framer Motion** animations for interactive elements.
- Always handle loading, success, and error states in async UI.

### 🐘 Backend (Laravel)

```php
// Use controllers for business logic
public function index(Request $request): JsonResponse
{
    return response()->json([
        'data' => Service::paginate(15),
    ]);
}

// Validate using Form Requests
public function store(StoreProjectRequest $request): JsonResponse
{
    $project = Project::create($request->validated());
    return response()->json($project, 201);
}
```

**Rules:**
- Follow **PSR-12** coding standards.
- Use **Form Requests** for validation — never validate directly in controllers.
- Use Eloquent resources (`JsonResource`) to transform API responses.
- Write **PHPDoc** blocks for all public methods.
- Add middleware for authentication and authorization checks.

---

## ⚙️ Development Setup

See [INSTALL.md](INSTALL.md) for full setup instructions.

**Quick start:**
```bash
# Clone and install
git clone https://github.com/MuhammadIsakiPrananda/portfolio-neverland-studio-v2.git
cd portofolio-neverland-studio
npm install
cd backend && composer install

# Environment setup
cp .env.example .env
cd backend && cp .env.example .env && php artisan key:generate

# Start development
npm run dev        # Frontend in terminal 1
php artisan serve  # Backend in terminal 2
```

---

## 🔍 Review Process

1. A maintainer will review your PR within **1–3 business days**.
2. You may be asked to make changes — please respond to feedback promptly.
3. Once approved and tested, your PR will be merged into `main`.

---

## 🎯 Priority Areas

We especially welcome contributions in the following areas:

- 🐛 **Bug fixes** — Any reported and confirmed bugs.
- ⚡ **Performance** — Bundle size, query optimization, edge caching.
- 🔒 **Security** — Vulnerability fixes, hardening measures.
- 📖 **Documentation** — Improving guides, READMEs, and code comments.
- ✅ **Tests** — Unit and feature test coverage for the backend.
- 🎨 **UI Polish** — Animation, accessibility (a11y), responsive tweaks.

---

## 📬 Questions?

Open a GitHub Discussion or email us at **Arlianto032@gmail.com**.

<div align="center">
<i>Return to the <a href="README.md">Main Application</a> documentation.</i>
</div>
