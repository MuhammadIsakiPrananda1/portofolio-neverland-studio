# GITHUB UPLOAD & GIT SETUP GUIDE

**IMPORTANT**: Sebelum upload ke GitHub, pastikan semua sensitive data sudah di-remove dari .env dan tidak ada credential tertinggal di files.

## Prerequisites

Anda memerlukan salah satu dari:
1. **GitHub CLI** (Recommended)
2. **SSH Key** (Secure)
3. **Personal Access Token (PAT)** (If HTTPS)

## Step 1: Create GitHub Repository

### Via GitHub Web Interface
1. Go to https://github.com/new
2. Enter Repository Name: `portofolio-neverland-studio`
3. Description: `A Full-Stack Cybersecurity Portfolio Platform`
4. Choose: **Public** (untuk portfolio) atau **Private** 
5. Click "Create repository"
6. **Do NOT** initialize with README (kita sudah punya)

### Expected Output:
```
Quick setup — if you've done this kind of thing before

…or create a new repository on the command line

git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/portofolio-neverland-studio.git
git push -u origin main
```

## Step 2: Setup Local Git (First Time Only)

```bash
# Navigate to project root
cd /var/www/portfolio-neverland-studio

# Configure git (jika belum global)
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# Check if initialized
git status
# Jika error "not a git repository", lanjut ke Step 3
```

## Step 3: Initialize Git Repository

```bash
cd /var/www/portfolio-neverland-studio

# Initialize git
git init

# Verify .gitignore is proper
cat .gitignore | grep -E "\.env|node_modules|vendor|dist" 
# Should show these are ignored

# Create initial commit dengan structure
git add -A
git commit -m "Initial commit: project structure refactored and production-ready"

# Verify commit
git log --oneline -1
```

**Expected Output:**
```
[main (root-commit) abc1234] Initial commit: project structure refactored...
 XX files changed, XXXX insertions(+)
```

## Step 4: Setup Remote & First Push (Choose ONE method)

### METHOD 1: SSH (Most Secure - Recommended)

#### 4.1 Generate SSH Key (if not exists)
```bash
# Check if SSH key exists
ls ~/.ssh/id_rsa

# If doesn't exist, generate new
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"
# Press Enter untuk semua prompts (use default location & no passphrase)

# Copy public key
cat ~/.ssh/id_rsa.pub
```

#### 4.2 Add SSH Key to GitHub
1. Go to https://github.com/settings/keys
2. Click "New SSH key"
3. Paste public key dari `~/.ssh/id_rsa.pub`
4. Title: "Local Development Server"
5. Click "Add SSH key"

#### 4.3 Test SSH Connection
```bash
ssh -T git@github.com
# Should show: "Hi YOUR_USERNAME! You've successfully authenticated..."
```

#### 4.4 Add Remote & Push (SSH)
```bash
cd /var/www/portfolio-neverland-studio

# Add remote
git remote add origin git@github.com:YOUR_USERNAME/portofolio-neverland-studio.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main
git push -u origin main

# Expected: Uploading commit objects: 100% | Branch 'main' pushed
```

---

### METHOD 2: GitHub CLI (Easiest)

```bash
# Install GitHub CLI (if not installed)
# macOS: brew install gh
# Ubuntu: sudo apt install gh
# Windows: choco install gh

# Authenticate
gh auth login
# Choose: GitHub.com
# Choose: HTTPS or SSH
# Approve in browser when asked

# Create repository
cd /var/www/portfolio-neverland-studio
gh repo create portofolio-neverland-studio --source=. --remote=origin --push --public
# atau --private jika ingin private

# Done! Repository created and pushed in one command
```

---

### METHOD 3: HTTPS with Personal Access Token (If SSH not available)

#### 3.1 Generate Personal Access Token (PAT)
1. Go to https://github.com/settings/tokens
2. Click "Generate new token" → "Generate new token (classic)"
3. Name: `portfolio-neverland-studio-setup`
4. Expiration: 90 days (or longer)
5. Scopes: ✓ repo, ✓ workflow, ✓ user
6. Click "Generate token"
7. **COPY TOKEN IMMEDIATELY** (won't show again!)

#### 3.2 Configure Git Credentials
```bash
# Store token locally (NOT in files!)
git config --global credential.helper store

# Or use cache (temporary)
git config --global credential.helper 'cache --timeout=3600'
```

#### 3.3 Add Remote & Push (HTTPS)
```bash
cd /var/www/portfolio-neverland-studio

# Add remote dengan HTTPS
git remote add origin https://github.com/YOUR_USERNAME/portofolio-neverland-studio.git

# Push ke GitHub
git branch -M main
git push -u origin main

# When asked for password, paste your Personal Access Token
# (NOT your GitHub password!)
```

---

## Step 5: Create Development Branch

```bash
# Create development branch
git checkout -b development
git push -u origin development

# Back to main
git checkout main

# Verify branches
git branch -a
# Should show:
# * main
#   remotes/origin/main
#   remotes/origin/development
```

## Step 6: Protect Main Branch (Optional pero Recommended)

1. Go to repository Settings
2. Click "Branches" (left sidebar)
3. Click "Add rule" under "Branch protection rules"
4. Rule name: `main`
5. Enable:
   - ✓ Require a pull request before merging
   - ✓ Require approvals (1)
   - ✓ Require status checks to pass
6. Click "Create"

**Result**: Hanya bisa merge ke main via pull request, prevent accidental pushes.

## Step 7: Verify Upload Success

```bash
# Check remote
git remote -v
# Should show:
# origin  [URL] (fetch)
# origin  [URL] (push)

# Check branches
git branch -a
# Should show local and remote branches

# Verify files on GitHub
open https://github.com/YOUR_USERNAME/portofolio-neverland-studio
# or
echo "Visit: https://github.com/YOUR_USERNAME/portofolio-neverland-studio"
```

## Step 8: Add Initial Release Tag (v1.0.0)

```bash
git tag -a v1.0.0 -m "Version 1.0.0 - First Release"
git push origin v1.0.0

# Verify on GitHub:
# Go to Releases section - should show v1.0.0
```

## Step 9: Future Commits Workflow

### For Development
```bash
# Work on development branch
git checkout development

# Make changes...

# Stage changes
git add .

# Commit with meaningful message
git commit -m "feat: add new CTF challenge system"
# or
git commit -m "fix: resolve login rate limiting issue"
# or
git commit -m "docs: update API documentation"

# Push
git push origin development

# When ready to release, create Pull Request on GitHub to merge to main
```

### For Production Ready
```bash
# Make PR to main for review
# After approval, merge on GitHub (via PR)

# Pull changes locally
git checkout main
git pull origin main

# Create release tag
git tag -a v1.1.0 -m "Version 1.1.0 - New features and fixes"
git push origin v1.1.0

# GitHub will automatically create Release from tag
```

## Important Commit Message Conventions

Use standard commit format:

```
type(scope): subject

Optional body

Optional footer
```

**Types:**
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `style:` - Code style (no functional change)
- `refactor:` - Code refactoring
- `perf:` - Performance improvement
- `test:` - Test additions
- `chore:` - Maintenance

**Examples:**
```bash
git commit -m "feat(ctf): add new challenge submission system"
git commit -m "fix(auth): resolve account lockout timeout issue"
git commit -m "docs(readme): update installation instructions"
git commit -m "chore(backend): upgrade Laravel dependencies"
```

## Troubleshooting

### Error: "fatal: not a git repository"
```bash
cd /var/www/portfolio-neverland-studio
git init
git add .
git commit -m "Initial commit"
```

### Error: "rejected...update not fast-forward"
```bash
git pull origin main --rebase
git push origin main
```

### Error: "Permission denied (publickey)"
```bash
# SSH key issue - regenerate or check:
ssh-keygen -t rsa -b 4096 -C "your.email@example.com"
# Add new public key to GitHub settings
```

### Accidentally committed sensitive file
```bash
# Remove from git history (but keep local)
git rm --cached .env backend/.env
git commit -m "Remove sensitive .env files"
git push

# Or rewrite history (DANGEROUS - only if not pushed yet)
git rm --cached .env
git reset HEAD~1
```

### Want to change remote URL
```bash
# View current
git remote -v

# Remove and re-add
git remote remove origin
git remote add origin NEW_URL
```

## Final Checklist

- [ ] GitHub account created
- [ ] Repository created on GitHub
- [ ] SSH key added to GitHub (or PAT generated)
- [ ] Local git initialized with initial commit
- [ ] Remote added and verified (`git remote -v`)
- [ ] First push completed successfully
- [ ] Development branch created
- [ ] Main branch protection enabled (optional)
- [ ] Release v1.0.0 tagged
- [ ] All files visible on GitHub.com
- [ ] No `.env` files exposed on GitHub
- [ ] README.md displays correctly
- [ ] Can clone repository: `git clone https://github.com/YOUR_USERNAME/portofolio-neverland-studio.git`

## Next Steps

1. **GitHub Pages** (optional): Setup automatic deployment from main branch
2. **GitHub Actions** (optional): Setup CI/CD pipeline for tests
3. **Releases**: Create release notes in GitHub Releases tab
4. **Collaborators**: Add team members in Settings → Collaborators
5. **Issues Template**: Add issue templates in `.github/ISSUE_TEMPLATE/`
6. **PR Template**: Add PR template in `.github/PULL_REQUEST_TEMPLATE.md`

---

**Remember**: 
- ✅ Always verify .gitignore before first push
- ✅ Never commit .env files
- ✅ Never commit node_modules or vendor
- ✅ Keep sensitive tokens out of code
- ✅ Write meaningful commit messages
