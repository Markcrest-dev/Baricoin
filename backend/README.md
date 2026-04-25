# Baricoin Backend 🚀

The core API for the Baricoin platform, built with **NestJS** and **Prisma ORM**.

## 🛠️ Tech Stack
- **Framework**: NestJS (v11)
- **Database**: SQLite (via Prisma)
- **Authentication**: JWT & Passport.js
- **ORM**: Prisma

## ⚙️ Installation

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up your environment variables:
   Create a `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

3. Initialize the database:
   ```bash
   npx prisma db push
   npx prisma generate
   ```

## 🏃 Running the Server

```bash
# Development mode
npm run start:dev

# Production mode
npm run start:prod
```

## 🏗️ Database Schema
The database includes the following models:
- **User**: Core user data and authentication.
- **Wallet**: Multi-currency wallet support.
- **Transaction**: Ledger for all platform activities.
- **Referral**: Referral tracking and reward system.

## 📁 Source Overview
- `src/auth`: JWT-based authentication system.
- `src/user`: User profile management.
- `src/wallet`: Balance management and multi-currency logic.
- `src/transaction`: Transaction history and status tracking.

## 📄 License
Proprietary - Baricoin Platform
