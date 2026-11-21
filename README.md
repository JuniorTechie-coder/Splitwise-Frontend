# Splitwise Frontend

A Next.js frontend for a Splitwise-style expense-sharing application. This repository contains the user-facing registration, login, and basic dashboard flows, and communicates with the companion Express API.

**Backend repository:** [Splitwise Backend](https://github.com/JuniorTechie-coder/spliteiwse-backend)

## Overview

The frontend is built with Next.js App Router, React, and TypeScript. It provides account registration and login forms, basic client-side form validation, loading and error states, and a dashboard entry point that requests the authenticated user's profile from the backend.

The project is part of a full-stack expense-sharing application. Expense and group business logic is handled by the backend API.

## Current features

- **Registration UI:** collect a user's name, email, password, and password confirmation.
- **Login UI:** authenticate using email and password.
- **Form feedback:** basic client-side checks, request loading states, and API error messages.
- **Password visibility:** toggle password visibility on the authentication forms.
- **API integration:** send authentication requests to the backend through the Next.js API rewrite.
- **Dashboard foundation:** request the current user's profile and provide a logout action.

> The dashboard is currently a basic authenticated-user view. Full group, expense, and balance management screens are not yet implemented in this frontend.

## Technology stack

| Area | Technologies |
|---|---|
| Framework | Next.js 16 (App Router) |
| UI library | React 19 |
| Language | TypeScript |
| Styling | Tailwind CSS 4 |
| Linting | ESLint 9 |

## Application flow

1. A new user opens the registration page and submits their details.
2. The frontend sends the registration request to the backend API.
3. An existing user signs in through the login page.
4. The backend authenticates the user and sets the HTTP-only access-token cookie.
5. The dashboard requests the current user's profile from the backend.
6. The user can log out through the dashboard, which calls the backend logout endpoint.

Authentication is handled by the backend. The frontend sends requests with `credentials: "include"` so browser cookies can be included.

## Backend integration

The Next.js configuration rewrites requests beginning with `/api/` to the local backend server:

```text
Frontend request:  /api/auth/login
Backend target:    http://localhost:5000/api/auth/login
```

The rewrite target is currently configured for local development at `http://localhost:5000`. If your backend runs on a different host or port, update `next.config.ts` accordingly.

## Getting started

### Prerequisites

- Node.js
- npm
- The companion [Splitwise Backend](https://github.com/JuniorTechie-coder/spliteiwse-backend) running locally

### 1. Clone the repository

```bash
git clone https://github.com/JuniorTechie-coder/Splitwise-Frontend.git
cd Splitwise-Frontend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the backend

Follow the setup instructions in the [backend README](https://github.com/JuniorTechie-coder/spliteiwse-backend#readme). By default, the frontend rewrite expects the backend at:

```text
http://localhost:5000
```

### 4. Start the frontend

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Available scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Next.js development server |
| `npm run build` | Build the application for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |

## Project structure

The application uses the Next.js App Router. Key routes include:

```text
app/
├── page.tsx
├── layout.tsx
├── login/
│   └── page.tsx
├── register/
│   └── page.tsx
└── dashboard/
    └── page.tsx

next.config.ts
```

## Project status

The registration and login interfaces and basic dashboard/API integration are in place. The broader product UI for creating groups, recording expenses, viewing balances, and managing settlements remains under development.

For backend capabilities and implementation details—including PostgreSQL transactions, concurrency handling, and idempotent write operations—see the [Splitwise Backend repository](https://github.com/JuniorTechie-coder/spliteiwse-backend).
