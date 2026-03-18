# Neverland Studio

*A Full-Stack Cybersecurity Portfolio Platform*

[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Laravel](https://img.shields.io/badge/Laravel-11-FF2D20?style=flat-square&logo=laravel&logoColor=white)](https://laravel.com)
[![PHP](https://img.shields.io/badge/PHP-8.2%2B-777BB4?style=flat-square&logo=php&logoColor=white)](https://www.php.net)
[![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)

## Overview

Neverland Studio is a professional portfolio platform for a Cyber Security & IT company. It features a React 19 front-end SPA with 70+ pages, an interactive CTF playground with real-time scoring, and a Laravel 11 REST API with comprehensive security hardening.

## Key Features

- 🎨 **Modern UI** - React 19 SPA with animated transitions & custom cursor
- 🔐 **CTF Platform** - Interactive cybersecurity challenges with real-time leaderboard
- 📊 **Dashboard** - Analytics and project showcase
- 🔒 **Security-First** - Brute force protection, rate limiting, account lockout
- 📱 **Responsive** - Mobile-friendly design with TailwindCSS
- ⚡ **Performance** - Optimized queries, caching strategy, indexed databases
- 🗄️ **API** - RESTful API with token authentication (Sanctum)

## Tech Stack

### Backend
- **Laravel 11** - Backend framework
- **PHP 8.2+** - Server language
- **MySQL 8.0** - Database
- **Laravel Sanctum** - API authentication

### Frontend
- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite 7** - Build tool
- **TailwindCSS 3.4** - Styling
- **React Router** - Routing

### Infrastructure
- **Docker** - Containerization
- **Apache 2.4 + ModSecurity** - Web server with WAF
- **Git** - Version control

## Project Structure

```
.
├── backend/              # Laravel API
│   ├── app/              # Application logic
│   ├── config/           # Configuration files
│   ├── database/         # Migrations & seeders
│   ├── routes/           # API routes
│   └── storage/          # Logs & cache
├── src/                  # React frontend
│   ├── components/       # Reusable components
│   ├── pages/            # Route-based pages
│   ├── services/         # API services
│   └── styles/           # Styling
├── public/               # Static assets
├── config/               # Shared configuration
├── docs/                 # Documentation
│   ├── backend/          # Backend setup & deployment
│   ├── deployment/       # Deployment guides
│   └── security/         # Security documentation
├── docker/               # Docker setup
└── docker-compose.vm.yml # Development environment
```

## Prerequisites

- **Backend**: PHP 8.2+, Composer, MySQL 8.0
- **Frontend**: Node.js 18+, npm or yarn
- **Docker** (optional): Docker & Docker Compose for containerized setup

## Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/MuhammadIsakiPrananda1/portofolio-neverland-studio.git
cd portofolio-neverland-studio
```

### 2. Backend Setup
```bash
# Naviagate to backend
cd backend

# Install dependencies
composer install

# Generate app key
php artisan key:generate

# Run migrations & seeders
php artisan migrate --seed

# Back to root
cd ..
```

### 3. Frontend Setup
```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

### 4. Environment Configuration
```bash
# Copy template
cp .env.example .env

# Edit .env with your local values
nano .env
```

## Environment Variables (.env)

```env
# App Config
APP_NAME="Neverland Studio API"
APP_ENV=local
APP_DEBUG=true
APP_URL=http://localhost:8000

# Database
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=neverland_portfolio
DB_USERNAME=root
DB_PASSWORD=password

# Authentication
SANCTUM_STATEFUL_DOMAINS=localhost:3000

# Other configs
MAIL_DRIVER=log
CACHE_DRIVER=file
SESSION_DRIVER=file
```

See `.env.example` for complete configuration reference.

## Running Locally

### Option 1: Docker (Recommended)
```bash
docker-compose -f docker-compose.vm.yml up -d
# Backend: http://localhost:8001
# Frontend: http://localhost:5173
```

### Option 2: Manual Setup
```bash
# Terminal 1: Backend
cd backend
php artisan serve    # http://localhost:8000

# Terminal 2: Frontend
npm run dev          # http://localhost:5173
```

## Building for Production

### Backend
```bash
cd backend
composer install --no-dev
php artisan migrate --force
php artisan config:cache
php artisan route:cache
```

### Frontend
```bash
npm run build
# Output: dist/
```

## API Documentation

API endpoints are available at `/api/v1/`:

- **Authentication**: `POST /auth/login`, `POST /auth/logout`
- **Challenges**: `GET /challenges`, `POST /challenges/{id}/submit`
- **Users**: `GET /users/{id}`, `PUT /users/{id}`
- **Leaderboard**: `GET /leaderboard`

See `docs/` for complete API documentation.

## Security Features

- ✅ Account lockout after 5 failed logins (15 min lock)
- ✅ Rate limiting (login: 5/5min, CTF: 10/min, API: 100/hour)
- ✅ Transaction-safe challenge submission
- ✅ Bcrypt password hashing
- ✅ Email verification requirement
- ✅ Account suspension enforcement
- ✅ Comprehensive audit logging
- ✅ Protection against common vulnerabilities

## Documentation

Detailed documentation available in `/docs/`:

- **[Backend Setup](docs/backend/)** - Installation, migrations, deployment
- **[Deployment Guide](docs/deployment/)** - Production deployment steps
- **[Security Documentation](docs/security/)** - Security policies & hardening
- **[CTF Platform](docs/ctf/)** - Challenge system & scoring
- **[Development](docs/DEVELOPMENT.md)** - Development guidelines

## Troubleshooting

### Backend won't start
```bash
cd backend
php artisan cache:clear
php artisan config:cache
php artisan serve
```

### Frontend build errors
```bash
rm -rf node_modules
npm install
npm run build
```

### Database connection issues
- Check `.env` database credentials
- Ensure MySQL is running
- Run: `php artisan tinker` to test connection

See `SUPPORT.md` for more help.

## Contributing

Contributions are welcome! Please see [CONTRIBUTING.md](CONTRIBUTING.md) for details.

## License

This project is licensed under the MIT License - see [LICENSE](LICENSE) for details.

## Support

For issues, questions, or suggestions:
- **Issues**: GitHub Issues  
- **Email**: support@neverlandstudio.com
- **Documentation**: See `SUPPORT.md`

---

**Last Updated**: March 2026  
**Version**: 1.0.0  
**Status**: Production Ready ✅
