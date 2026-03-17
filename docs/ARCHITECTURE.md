# Architecture Overview

Neverland Studio is a full-stack monorepo with a **React + TypeScript** SPA (frontend) and a **Laravel 11** REST API (backend), connected over HTTP and WebSockets.

---

## High-Level Diagram

```
Browser
  │
  ├─── React SPA (Vite, port 5173 dev / Nginx prod)
  │       │
  │       ├── REST  ──►  Laravel API  (port 8001)
  │       │                   │
  │       └── WebSocket ──►   Laravel Echo / Pusher
  │
  └─── Public assets (public/)
```

---

## Frontend Structure (`src/`)

The frontend follows **Atomic Design** principles combined with a feature-grouped pages layout.

```
src/
├── App.tsx                 # Root component — router setup & providers
├── main.tsx                # Vite entry point
│
├── assets/                 # Static assets (images, fonts)
│
├── components/
│   ├── atoms/              # Smallest, indivisible UI elements
│   │   ├── Button/
│   │   ├── CustomCursor/   # Canvas-based animated cursor
│   │   ├── Input/
│   │   ├── Logo/
│   │   ├── ScrollToTop/
│   │   ├── SEO/
│   │   ├── SectionDivider/
│   │   ├── Switch/
│   │   ├── TextArea/
│   │   ├── Toast/
│   │   └── TypewriterText/
│   │
│   ├── molecules/          # Composed from atoms
│   │   ├── CertificationRoadmap/
│   │   ├── SectionTitle/
│   │   └── ServiceCard/
│   │
│   ├── organisms/          # Complex, self-contained sections
│   │   ├── AILiveChat/
│   │   ├── AuthModal/
│   │   ├── CartDrawer/
│   │   ├── ContactForm/
│   │   ├── FloatingButtons/
│   │   ├── FloatingCartButton/
│   │   ├── Footer/
│   │   ├── HeroSection/
│   │   ├── Navbar/
│   │   └── PolicyModal/
│   │
│   └── ui/                 # shadcn/ui primitives (auto-generated)
│       ├── badge.tsx
│       └── card.tsx
│
├── config/
│   ├── constants.ts        # Company info, routes enum, static data
│   ├── chatTemplates.ts    # AI chat prompt templates
│   ├── projects.ts         # Portfolio project data
│   ├── routes.config.tsx   # Lazy-loaded route → component mapping
│   ├── services.ts         # Service offering definitions
│   └── index.ts            # Barrel export
│
├── contexts/
│   ├── AuthContext.tsx      # Authentication state (Laravel Sanctum)
│   └── CartContext.tsx      # Shopping cart state
│
├── hooks/
│   ├── useApiCrud.ts        # Generic CRUD hook over apiClient
│   ├── useAutoScrollToBottom.ts
│   ├── useBodyScrollLock.ts
│   ├── useChatMessages.ts
│   ├── useRealtimeAnalytics.ts
│   ├── useSidebarState.ts
│   └── index.ts
│
├── layouts/
│   ├── MainLayout.tsx       # Public-facing layout (Navbar + Footer)
│   └── DashboardLayout.tsx  # Authenticated admin layout
│
├── lib/
│   ├── utils.ts             # cn() — Tailwind class merging utility
│   └── index.ts             # Barrel export
│
├── pages/
│   ├── public/              # Publicly accessible pages (Home, About, …)
│   ├── services/            # Individual service detail pages
│   ├── store/               # IT Services Store + Checkout
│   ├── Dashboard/           # Protected admin dashboard pages
│   ├── Playground/          # CTF & interactive security labs
│   ├── auth/                # Login / register pages
│   └── company/             # Corporate pages (Careers, CSR, …)
│
├── services/
│   ├── api.client.ts        # Axios instance + interceptors
│   ├── analytics.service.ts
│   ├── auth.service.ts      # Login / logout / me via Sanctum
│   ├── contact.service.ts
│   ├── dashboard.service.ts
│   └── settings.service.ts
│
├── styles/
│   └── globals.css          # Tailwind directives + global CSS
│
├── types/
│   └── index.ts             # Shared TypeScript interfaces & enums
│
└── utils/
    ├── animations.ts        # Framer Motion variants
    ├── echo.ts              # Laravel Echo / Pusher initialisation
    ├── errorHandling.ts     # Centralised error formatters
    ├── validators.ts        # Zod-free form validators
    └── index.ts
```

---

## Backend Structure (`backend/`)

Standard **Laravel 11** layout with a clean API-only configuration.

```
backend/
├── app/
│   ├── Console/Commands/    # Artisan commands (e.g. DatabaseCleanup)
│   ├── Contracts/           # Repository interfaces
│   ├── DTOs/                # Data Transfer Objects
│   ├── Events/              # Laravel Events (broadcast via Pusher)
│   ├── Helpers/             # Procedural helper functions
│   ├── Http/
│   │   ├── Controllers/Api/ # Resource controllers (one per domain)
│   │   ├── Middleware/      # Custom middleware
│   │   └── Requests/        # Form Request validation classes
│   └── Models/              # Eloquent models
│
├── config/                  # Laravel config files
├── database/
│   ├── migrations/
│   └── seeders/
├── routes/
│   ├── api.php              # All /api/v1/* routes
│   └── channels.php         # Broadcast channel authorisation
└── tests/                   # PHPUnit feature & unit tests
```

---

## Key Design Decisions

| Decision | Rationale |
|----------|-----------|
| Atomic Design for components | Enforces reusability; atoms are always stateless |
| Lazy-loaded routes | Keeps initial bundle small; each page is a separate chunk |
| Laravel Sanctum (cookie-based) | Stateful SPA auth without managing JWT expiry manually |
| Pusher / Laravel Echo | Real-time dashboard updates without polling |
| Vite path aliases (`@components`, `@pages`, …) | Prevents fragile relative imports across deep directories |
| Manual chunk splitting in Vite | Separates vendor libs (framer-motion, xterm, etc.) for better caching |

---

## Data Flow

```
User Action
  → React component (UI layer)
  → Custom Hook (e.g. useApiCrud)
  → Service module (e.g. dashboard.service.ts)
  → apiClient (Axios + interceptors)
  → Laravel Controller
  → Service / Repository
  → Eloquent Model / Database
  → JSON response
  → Zustand / Context state update
  → Re-render
```

---

## Further Reading

- [Development Setup](./DEVELOPMENT.md)
- [API Reference](./API.md)
- [Contributing Guide](../CONTRIBUTING.md)
