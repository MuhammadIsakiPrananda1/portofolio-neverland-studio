# PROJECT STRUCTURE REFERENCE

## Root Directory Contents

```
portfolio-neverland-studio/
├── backend/                  # Laravel 11 REST API
│   ├── app/                  # Application code
│   │   ├── Console/          # CLI commands
│   │   ├── Http/             # Controllers, middleware, requests
│   │   ├── Models/           # Eloquent models
│   │   ├── Services/         # Business logic
│   │   ├── Repositories/     # Data access layer
│   │   ├── Helpers/          # Helper functions
│   │   └── DTOs/             # Data Transfer Objects
│   ├── config/               # Configuration files (app.php, auth.php, etc)
│   ├── database/
│   │   ├── migrations/       # Database schema changes
│   │   └── seeders/          # Database seeders
│   ├── routes/               # API routes (api.php, web.php, etc)
│   ├── storage/              # Logs, cache, uploads (gitignored)
│   ├── bootstrap/            # Application bootstrap
│   ├── resources/            # Views and assets
│   ├── public/               # Static entry point
│   ├── vendor/               # PHP dependencies (gitignored)
│   ├── .env                  # Environment variables (gitignored)
│   ├── .env.example          # Environment template
│   ├── composer.json         # PHP dependencies manifest
│   ├── package.json          # Node scripts (if any)
│   └── artisan               # Artisan CLI tool
│
├── src/                      # React 19 Frontend (Vite)
│   ├── components/           # Reusable UI components
│   ├── pages/                # Route-based pages (70+)
│   ├── hooks/                # Custom React hooks
│   ├── services/             # API service layer
│   ├── contexts/             # React contexts
│   ├── utils/                # Utility functions
│   ├── styles/               # Global styles
│   ├── assets/               # Images, icons, fonts
│   ├── main.tsx              # React entry point
│   ├── App.tsx               # Root component
│   └── vite-env.d.ts         # Vite types
│
├── public/                   # Static public assets
│   ├── robots.txt            # SEO robots file
│   ├── sitemap.xml           # SEO sitemap
│   └── index.html            # Entry HTML template
│
├── config/                   # Shared configuration
│   └── [shared configs]
│
├── docs/                     # Documentation (organized)
│   ├── API.md                # API documentation
│   ├── ARCHITECTURE.md       # Architecture overview
│   ├── AUTHENTICATION.md     # Auth documentation
│   ├── DEVELOPMENT.md        # Development guide
│   ├── CTF.md                # CTF system guide
│   ├── backend/              # Backend-specific docs
│   │   ├── BACKEND_FIXES_COMPLETE.md
│   │   ├── MIGRATION_TESTING_GUIDE.md
│   │   ├── SECURITY_HARDENING_CHECKLIST.md
│   │   └── [other backend docs]
│   ├── deployment/           # Deployment docs
│   │   ├── DEPLOYMENT_GUIDE.md
│   │   ├── PRODUCTION_HARDENING.md
│   │   └── QUICK_REFERENCE_DEPLOYMENT_CARD.md
│   ├── ctf/                  # CTF platform docs
│   │   ├── CTF_HUB_USAGE_GUIDE.md
│   │   └── COMPLETE_CTF_CHALLENGE_LIST.md
│   └── security/             # Security docs
│       └── SECURITY_AUDIT.md
│
├── docker/                   # Docker configurations
│   └── [Docker files]
│
├── dist/                     # Built frontend (gitignored)
│   └── [Built static files from npm run build]
│
├── node_modules/             # Frontend dependencies (gitignored)
│
├── .env                      # Environment variables for frontend (gitignored)
├── .env.example              # Frontend .env template
├── .gitignore                # Git ignore rules (comprehensive)
├── .php-cs-fixer.php         # PHP code formatter config
│
├── README.md                 # Project overview (IMPORTANT - Keep current!)
├── CHANGELOG.md              # Version history
├── INSTALL.md                # Installation guide
├── CONTRIBUTING.md           # Contribution guidelines
├── CODE_OF_CONDUCT.md        # Community code of conduct
├── SECURITY.md               # Security policies
├── SUPPORT.md                # Support information
│
├── composer.json             # PHP dependencies manifest (root level)
├── composerlock              # PHP dependencies lock (gitignored)
├── package.json              # Frontend build config (root level)
├── package-lock.json         # Frontend dependencies lock (gitignored)
├── vite.config.ts            # Vite configuration
├── postcss.config.js         # PostCSS configuration
├── tailwind.config.js        # Tailwind CSS configuration
├── tsconfig.json             # TypeScript configuration
├── docker-compose.vm.yml     # Docker compose for development
│
└── eslint.config.js          # ESLint configuration
```

## Key Patterns

### Backend Structure
- **Models**: Located in `backend/app/Models/` - Represent database tables
- **Controllers**: Located in `backend/app/Http/Controllers/` - Handle business logic
- **Routes**: Located in `backend/routes/api.php` - Define API endpoints
- **Migrations**: Located in `backend/database/migrations/` - Database schema
- **Config**: Located in `backend/config/` - Application configuration

### Frontend Structure
- **Pages**: Located in `src/pages/` - Route-based components (70+ pages)
- **Components**: Located in `src/components/` - Reusable UI pieces
- **Services**: Located in `src/services/` - API calls and external integrations
- **Hooks**: Located in `src/hooks/` - Custom React logic

## Important Notes

1. **.env files** - Never commit! Use .env.example as template
2. **/vendor** - Not committed, run `composer install`
3. **/node_modules** - Not committed, run `npm install`
4. **/dist** - Build output, not committed
5. **/storage** - Runtime files (logs, cache), mostly gitignored
6. **Documentation** - Keep in `/docs` organized by category

## File Size Reference

- `backend/` = ~92MB (includes vendor/)
- `src/` = ~4MB (frontend code)
- `docs/` = ~200KB (documentation)
- `node_modules/` = ~347MB (not committed)
- `.gitignore` excludes all large auto-generated files

## Setting Up Locally

1. Backend: `cd backend && composer install && php artisan migrate`
2. Frontend: `npm install && npm run dev`
3. See [INSTALL.md](../INSTALL.md) for detailed steps
