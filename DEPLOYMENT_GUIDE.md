# 🚀 BrieflyLearn Deployment Guide

## 📋 Table of Contents
1. [System Overview](#system-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development Setup](#local-development-setup)
4. [Backend Setup (Laravel)](#backend-setup-laravel)
5. [Frontend Setup (Next.js)](#frontend-setup-nextjs)
6. [Database Setup](#database-setup)
7. [Production Deployment](#production-deployment)
8. [Environment Variables](#environment-variables)
9. [Troubleshooting](#troubleshooting)

---

## 🎯 System Overview

**BrieflyLearn** is a personal development learning platform with:
- **Frontend**: Next.js 15.4.4 + React 19 + TypeScript + Tailwind CSS
- **Backend**: Laravel 11 + Filament Admin Panel
- **Database**: MySQL 8.0
- **Theme**: Claude Orange (#f97316) + Minimalist Luxury Design

### Project Structure
```
/Users/panapat/brieflylearn/
├── fitness-lms/              # Next.js Frontend (Port 3000)
├── fitness-lms-admin/        # Laravel Backend (Port 8001)
└── DEPLOYMENT_GUIDE.md       # This file
```

---

## ✅ Prerequisites

### Required Software
- **Node.js**: v18+ or v20+ (LTS recommended)
- **PHP**: 8.2+
- **Composer**: 2.x
- **MySQL**: 8.0+
- **Git**: Latest version

### Installation Commands
```bash
# Check versions
node --version        # Should be v18+ or v20+
php --version         # Should be 8.2+
composer --version    # Should be 2.x
mysql --version       # Should be 8.0+

# Install if missing (macOS)
brew install node@20
brew install php@8.2
brew install composer
brew install mysql
```

---

## 💻 Local Development Setup

### Step 1: Clone Repositories (if needed)
```bash
# Frontend is already at:
cd /Users/panapat/brieflylearn/fitness-lms

# Backend is already at:
cd /Users/panapat/brieflylearn/fitness-lms-admin
```

---

## 🔧 Backend Setup (Laravel)

### 1. Navigate to Backend Directory
```bash
cd /Users/panapat/brieflylearn/fitness-lms-admin
```

### 2. Install Dependencies
```bash
composer install
```

### 3. Configure Environment Variables
```bash
# Copy .env.example if .env doesn't exist
cp .env.example .env

# Edit .env file
nano .env
```

**Required .env Settings:**
```env
APP_NAME="BrieflyLearn Admin"
APP_ENV=local
APP_KEY=base64:XZrGMNtU61yVUESmcCw8/BFtZAWMFjZPRcaVusxh0Fo=
APP_DEBUG=true
APP_URL=http://localhost:8001

# Database Configuration
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=fitness_lms
DB_USERNAME=fitness_user
DB_PASSWORD=fitness_pass_2024

# CORS Configuration (Important for Frontend)
FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000

# Session Configuration
SESSION_DRIVER=file
SESSION_LIFETIME=1440

# Queue Configuration
QUEUE_CONNECTION=database

# Cache Configuration
CACHE_STORE=database
```

### 4. Generate Application Key (if needed)
```bash
php artisan key:generate
```

### 5. Run Database Migrations
```bash
# Create database first (if not exists)
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS fitness_lms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"

# Create database user
mysql -u root -p -e "CREATE USER IF NOT EXISTS 'fitness_user'@'localhost' IDENTIFIED BY 'fitness_pass_2024';"
mysql -u root -p -e "GRANT ALL PRIVILEGES ON fitness_lms.* TO 'fitness_user'@'localhost';"
mysql -u root -p -e "FLUSH PRIVILEGES;"

# Run migrations
php artisan migrate:fresh --seed
```

### 6. Create Admin User (for Filament)
```bash
php artisan make:filament-user

# Follow prompts:
# Name: Admin
# Email: admin@brieflylearn.com
# Password: (your secure password)
```

### 7. Start Backend Server
```bash
# Option 1: Laravel Built-in Server (Recommended for Dev)
php artisan serve --host=0.0.0.0 --port=8001

# Option 2: PHP Built-in Server
php -S localhost:8001 -t public/

# Backend will be available at: http://localhost:8001
# Admin panel: http://localhost:8001/admin
```

### 8. Test Backend API
```bash
# Test API health
curl http://localhost:8001/api/v1/courses

# Should return JSON with courses data
```

---

## ⚡ Frontend Setup (Next.js)

### 1. Navigate to Frontend Directory
```bash
cd /Users/panapat/brieflylearn/fitness-lms
```

### 2. Install Dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Configure Environment Variables
```bash
# Create .env.local if it doesn't exist
touch .env.local

# Edit .env.local
nano .env.local
```

**Required .env.local Settings:**
```env
# 🌐 Application Settings
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1
NODE_ENV=development

# 🐳 Database Configuration (if using Docker)
DATABASE_URL="mysql://fitness_user:fitness_pass_2024@localhost:3306/fitness_lms"
DB_HOST=localhost
DB_PORT=3306
DB_NAME=fitness_lms
DB_USER=fitness_user
DB_PASSWORD=fitness_pass_2024

# 🔐 JWT Secret
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### 4. Start Frontend Dev Server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev

# Frontend will be available at: http://localhost:3000
```

### 5. Test Frontend
Open browser:
- Homepage: http://localhost:3000
- Courses: http://localhost:3000/courses
- Garden: http://localhost:3000/garden

---

## 🗄️ Database Setup

### Option 1: Local MySQL Installation

```bash
# Start MySQL service (macOS)
brew services start mysql

# Login to MySQL
mysql -u root -p

# Create database and user
CREATE DATABASE fitness_lms CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'fitness_user'@'localhost' IDENTIFIED BY 'fitness_pass_2024';
GRANT ALL PRIVILEGES ON fitness_lms.* TO 'fitness_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;
```

### Option 2: Docker MySQL (if you prefer)

```yaml
# docker-compose.yml
version: '3.8'
services:
  mysql:
    image: mysql:8.0
    container_name: brieflylearn_mysql
    ports:
      - "3306:3306"
    environment:
      MYSQL_ROOT_PASSWORD: fitness_admin_2024
      MYSQL_DATABASE: fitness_lms
      MYSQL_USER: fitness_user
      MYSQL_PASSWORD: fitness_pass_2024
    volumes:
      - mysql_data:/var/lib/mysql

volumes:
  mysql_data:
```

```bash
# Start Docker MySQL
docker-compose up -d

# Check status
docker ps
```

---

## 🌍 Production Deployment

### Backend Deployment (Railway/Vercel/DigitalOcean)

#### Option 1: Railway (Recommended)

1. **Connect GitHub Repository**
   ```bash
   cd /Users/panapat/brieflylearn/fitness-lms-admin
   git remote add origin https://github.com/YOUR_USERNAME/brieflylearn-backend.git
   git push -u origin main
   ```

2. **Deploy to Railway**
   - Go to https://railway.app
   - Click "New Project" → "Deploy from GitHub"
   - Select `brieflylearn-backend` repository
   - Railway will auto-detect Laravel

3. **Add Environment Variables** (in Railway Dashboard)
   ```env
   APP_NAME="BrieflyLearn Admin"
   APP_ENV=production
   APP_KEY=(generate new key with: php artisan key:generate --show)
   APP_DEBUG=false
   APP_URL=https://your-backend.up.railway.app

   DB_CONNECTION=mysql
   DB_HOST=(Railway provides this)
   DB_PORT=(Railway provides this)
   DB_DATABASE=(Railway provides this)
   DB_USERNAME=(Railway provides this)
   DB_PASSWORD=(Railway provides this)

   FRONTEND_URL=https://your-frontend.vercel.app
   SANCTUM_STATEFUL_DOMAINS=your-frontend.vercel.app
   ```

4. **Run Migrations** (in Railway Terminal)
   ```bash
   php artisan migrate:fresh --seed --force
   php artisan make:filament-user
   ```

#### Option 2: Traditional VPS (DigitalOcean/AWS)

```bash
# SSH into server
ssh root@your-server-ip

# Install dependencies
apt update && apt upgrade -y
apt install -y php8.2 php8.2-fpm php8.2-mysql php8.2-xml php8.2-mbstring composer nginx mysql-server

# Clone repository
cd /var/www
git clone https://github.com/YOUR_USERNAME/brieflylearn-backend.git
cd brieflylearn-backend

# Install dependencies
composer install --no-dev --optimize-autoloader

# Configure .env
cp .env.example .env
nano .env  # Set production values

# Run migrations
php artisan migrate:fresh --seed --force
php artisan key:generate
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
chown -R www-data:www-data /var/www/brieflylearn-backend
chmod -R 755 /var/www/brieflylearn-backend
chmod -R 775 /var/www/brieflylearn-backend/storage
chmod -R 775 /var/www/brieflylearn-backend/bootstrap/cache
```

### Frontend Deployment (Vercel)

1. **Connect GitHub Repository**
   ```bash
   cd /Users/panapat/brieflylearn/fitness-lms
   git remote add origin https://github.com/YOUR_USERNAME/brieflylearn-frontend.git
   git push -u origin main
   ```

2. **Deploy to Vercel**
   - Go to https://vercel.com
   - Click "New Project" → Import from GitHub
   - Select `brieflylearn-frontend` repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables** (in Vercel Dashboard)
   ```env
   NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
   NEXT_PUBLIC_API_URL=https://your-backend.up.railway.app/api/v1
   NODE_ENV=production
   ```

4. **Deploy**
   - Vercel will automatically build and deploy
   - Custom domain: Add your domain in Vercel settings

---

## 🔑 Environment Variables Reference

### Frontend (.env.local)
| Variable | Description | Example |
|----------|-------------|---------|
| `NEXT_PUBLIC_APP_URL` | Frontend URL | `http://localhost:3000` |
| `NEXT_PUBLIC_API_URL` | Backend API URL | `http://localhost:8001/api/v1` |
| `NODE_ENV` | Environment | `development` or `production` |

### Backend (.env)
| Variable | Description | Example |
|----------|-------------|---------|
| `APP_URL` | Backend URL | `http://localhost:8001` |
| `DB_HOST` | Database Host | `127.0.0.1` |
| `DB_PORT` | Database Port | `3306` |
| `DB_DATABASE` | Database Name | `fitness_lms` |
| `DB_USERNAME` | Database User | `fitness_user` |
| `DB_PASSWORD` | Database Password | `fitness_pass_2024` |
| `FRONTEND_URL` | Frontend URL (for CORS) | `http://localhost:3000` |

---

## 🐛 Troubleshooting

### Common Issues

#### 1. **Backend: Port 8001 already in use**
```bash
# Find process using port 8001
lsof -ti:8001

# Kill process
kill -9 $(lsof -ti:8001)

# Or use different port
php artisan serve --port=8002
```

#### 2. **Frontend: API connection refused**
```bash
# Check if backend is running
curl http://localhost:8001/api/v1/courses

# Check .env.local has correct API_URL
cat .env.local | grep NEXT_PUBLIC_API_URL

# Should output: NEXT_PUBLIC_API_URL=http://localhost:8001/api/v1
```

#### 3. **Database connection failed**
```bash
# Check MySQL is running
brew services list | grep mysql

# Start MySQL if stopped
brew services start mysql

# Test connection
mysql -u fitness_user -p fitness_lms
# Password: fitness_pass_2024
```

#### 4. **CORS errors in browser console**
Update backend `.env`:
```env
FRONTEND_URL=http://localhost:3000
SANCTUM_STATEFUL_DOMAINS=localhost:3000
```

Then restart backend:
```bash
php artisan config:clear
php artisan serve --host=0.0.0.0 --port=8001
```

#### 5. **Next.js build errors**
```bash
# Clear Next.js cache
rm -rf .next

# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Rebuild
npm run build
```

---

## 📚 Additional Resources

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [Laravel 11 Docs](https://laravel.com/docs/11.x)
- [Filament Admin Panel](https://filamentphp.com/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)

### Deployment Platforms
- [Vercel](https://vercel.com/docs) - Frontend hosting
- [Railway](https://docs.railway.app) - Backend hosting
- [DigitalOcean](https://www.digitalocean.com/community/tutorials) - VPS hosting

---

## 🎉 Quick Start Commands

### Start Everything (Local Development)

**Terminal 1 - Backend:**
```bash
cd /Users/panapat/brieflylearn/fitness-lms-admin
php artisan serve --host=0.0.0.0 --port=8001
```

**Terminal 2 - Frontend:**
```bash
cd /Users/panapat/brieflylearn/fitness-lms
npm run dev
```

**Access:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:8001/api/v1
- Admin Panel: http://localhost:8001/admin

---

## 📝 Notes

1. **Backend Port**: Changed from 8003 to 8001 (standard Laravel port)
2. **Theme**: All pink colors replaced with Claude orange (#f97316)
3. **Branding**: Updated from "ExamMaster" to "BrieflyLearn"
4. **Content**: Changed from government exam prep to personal development

---

**Last Updated**: 2025-10-25
**Version**: 1.0.0
**Maintainer**: BrieflyLearn Team
