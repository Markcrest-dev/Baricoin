# Baricoin 🪙

Baricoin is a premium, full-stack platform for trading cryptocurrencies, gift cards, and managing digital assets. This repository follows a monorepo structure, containing the backend API, a modern web dashboard, and a cross-platform mobile application.

## 🏗️ Architecture Overview

The Baricoin ecosystem consists of three main components:

- **[Backend API](./backend)**: Built with **NestJS**, **Prisma**, and **SQLite**. Handles authentication, trading logic, and database management.
- **[Web Dashboard](./web)**: A high-performance **React** application built with **Vite**, **Tailwind CSS**, and **Zustand** for state management.
- **[Mobile App](./mobile)**: A cross-platform **React Native** application powered by **Expo**, featuring a seamless user experience across iOS and Android.

## 🚀 Quick Start

To get the entire platform up and running locally, follow these steps in order:

### 1. Start the Backend
Navigate to the backend directory and initialize the server:
```bash
cd backend
npm install
npx prisma generate
npm run start:dev
```

### 2. Start the Web Client
In a new terminal, launch the web application:
```bash
cd web
npm install
npm run dev
```

### 3. Start the Mobile App
In another terminal, start the Expo development server:
```bash
cd mobile
npm install
npm run start
```

## 🛠️ Technology Stack

| Component | Key Technologies |
| :--- | :--- |
| **Backend** | NestJS, Prisma ORM, SQLite, Passport.js (JWT) |
| **Web** | React 19, Vite, Tailwind CSS 4, Zustand, Axios |
| **Mobile** | React Native, Expo, NativeWind, Expo Router |

## 📂 Project Structure

```text
Baricoin/
├── backend/    # NestJS API & Database
├── web/        # React Web Application
├── mobile/     # Expo Mobile Application
└── ...         # Project documentation and configuration
```

## 📄 License

Proprietary - Baricoin Platform
