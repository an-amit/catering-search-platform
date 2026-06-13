# Catering Search 

A small catering search platform with a backend API and a frontend interface.

## Overview

This repository contains two parts:

- `backendApi/`: Express API using MongoDB and Mongoose.
- `frontend/`: Next.js 16 frontend using React 19 and Tailwind.

## Prerequisites

- Node.js 18 or newer.
- npm or pnpm installed.
- A MongoDB database connection string.

## Environment

The backend reads environment variables from `backendApi/.env`.
Create or update this file with:

```env
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
DB_NAME=cateringdb
ORIGIN=http://localhost:3000
```

If you use a local MongoDB instance, `MONGO_URI` should look like:

```env
MONGO_URI=mongodb://localhost:27017
```

## Backend Setup

### Using npm

```bash
cd backendApi
npm install
npm run dev
```

### Using pnpm

```bash
cd backendApi
pnpm install
pnpm dev
```

The backend listens by default on `http://localhost:5000`.

### Backend API routes

- `GET /api/caterers`
- `GET /api/caterers?search=term&minPrice=50&maxPrice=150`
- `GET /api/caterers/:id`
- `POST /api/caterers`

Example POST payload:

```json
{
  "name": "Gourmet Delights",
  "location": "Downtown",
  "pricePerPlate": 75.5,
  "cuisines": ["Italian", "French", "Mediterranean"],
  "rating": 4.8
}
```

## Frontend Setup

The frontend expects the backend API to be available at `http://localhost:5000` unless `NEXT_PUBLIC_API_URL` is set.

### Using npm

```bash
cd frontend
npm install
npm run dev
```

### Using pnpm

```bash
cd frontend
pnpm install
pnpm dev
```

Then open `http://localhost:3000` in your browser.

## Notes

- If you want to configure a custom API URL for the frontend, add a `.env` file in `frontend/` with:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000
```

- Ensure backend is running before using the frontend search page.

- If you encounter CORS issues, confirm `ORIGIN` in `backendApi/.env` matches the frontend URL.

## Troubleshooting

- `npm` workflow: use `npm install` / `npm run dev`.
- `pnpm` workflow: use `pnpm install` / `pnpm dev`.
- If MongoDB fails to connect, verify `MONGO_URI` and database access.
