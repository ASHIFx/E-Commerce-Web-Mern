# ShopNest E-Commerce

## Overview

This repository contains a full-stack e-commerce application for learning and demo purposes. It is built with:

- `BACKEND/` — Node.js, Express, MongoDB, JWT auth, product management, orders, Razorpay payment support, and admin analytics.
- `FRONTED/` — React, Vite, Redux Toolkit, Tailwind CSS, shopping cart, checkout, profile, and admin dashboard.

## Features

- User registration, login, and profile view
- Product browsing, search, and product detail pages
- Cart management and checkout flow
- Order creation with fallback payment behavior if Razorpay keys are unavailable
- Admin analytics and order status update capabilities
- Protected routes for authenticated users and admin users

## Prerequisites

- Node.js 18+ or later
- npm 10+ (or compatible)
- MongoDB instance or Atlas cluster

## Setup

### Backend

1. Open the backend folder:
   ```bash
   cd BACKEND
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file with the values below.
4. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend

1. Open the frontend folder:
   ```bash
   cd FRONTED
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend app:
   ```bash
   npm run dev
   ```

## Environment Variables

Create `BACKEND/.env` with at least the following values:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/shopnest
JWT_SECRET=your_jwt_secret
FRONTEND_URL=http://localhost:5173
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
EMAIL_USER=...
BREVO_API_KEY=...
RAZORPAY_KEY_ID=...
RAZORPAY_KEY_SECRET=...
```

- `JWT_SECRET` is required for authentication.
- `RAZORPAY_KEY_ID` and `RAZORPAY_KEY_SECRET` are optional. If they are missing, the checkout flow uses a bypass mode for testing.

## Default Admin Credentials

Use these credentials when seeding or testing admin access:

- Email: `admin@shopnest.com`
- Password: `Admin@123`

## Project Structure

### Backend

- `BACKEND/server.js` — App startup and database connection.
- `BACKEND/src/app.js` — Express app configuration.
- `BACKEND/src/routes/` — API route definitions.
- `BACKEND/src/controllers/` — Route handlers and business logic.
- `BACKEND/src/model/` — Mongoose schemas.
- `BACKEND/src/config/` — Configuration and database setup.
- `BACKEND/seed.js` — Seed script to populate sample data.

### Frontend

- `FRONTED/src/App.jsx` — React router and main app layout.
- `FRONTED/src/pages/` — Feature pages like Home, Shop, Cart, Checkout, Login, Register, Profile, and admin views.
- `FRONTED/src/components/` — Shared UI components like Navbar, ProductCard, CartItem, and Footer.
- `FRONTED/src/api/` — Axios setup and API helpers.
- `FRONTED/src/context/` — Authentication context.
- `FRONTED/src/redux/` — Redux store and cart slice.

## Common Commands

### Backend

```bash
cd BACKEND
npm run dev
npm run seed
```

### Frontend

```bash
cd FRONTED
npm run dev
npm run build
npm run preview
npm run lint
```

## Notes

- The frontend stores the access token in `localStorage` and attaches it to API requests.
- The backend uses `JWT_SECRET` to sign tokens and protect routes.
- If you want to run the app locally, start backend first, then frontend.
- The admin routes require the user role to be `admin`.

## License

This repository is licensed under the Apache License 2.0.

Apache 2.0 is a permissive open-source license that allows others to use, modify, and distribute the project while preserving contributor attribution and patent protections.

For full details, see the `LICENSE` file in the repository root.
