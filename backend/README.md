# Hotel Today Specials - Backend (Phase 1)

Backend REST API for managing a hotel's "Today's Specials" dishes, built with **Node.js**, **Express.js**, **TypeScript**, **Prisma ORM**, and **MySQL**.

This is Phase 1 of the project — backend and database layer only. No frontend is included.

## Project Overview

Hotel staff can manage today's special dishes through a clean REST API. Each special dish has:

- Title
- Dish Name
- Price
- Image (stored as binary `LONGBLOB`, transferred as base64 over the API)
- Video (stored as binary `LONGBLOB`, transferred as base64 over the API)
- Is Active flag

The project follows a clean layered architecture:

```
Route -> Controller -> Service -> Prisma Client -> MySQL
```

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Prisma ORM
- MySQL

## Folder Structure

```
backend/
│
├── prisma/
│   ├── schema.prisma
│   └── migrations/
│
├── prisma.config.ts
│
├── src/
│   ├── config/
│   │     prisma.ts
│   │
│   ├── controllers/
│   │     todaySpecial.controller.ts
│   │
│   ├── routes/
│   │     todaySpecial.routes.ts
│   │
│   ├── services/
│   │     todaySpecial.service.ts
│   │
│   ├── middlewares/
│   │     validateTodaySpecial.middleware.ts
│   │     notFound.middleware.ts
│   │     errorHandler.middleware.ts
│   │
│   ├── utils/
│   │     ApiError.ts
│   │     apiResponse.ts
│   │     asyncHandler.ts
│   │     serializeTodaySpecial.ts
│   │
│   ├── types/
│   │     todaySpecial.types.ts
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── .env.example
├── .gitignore
├── nodemon.json
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

```bash
cd backend
npm install
```

## Environment Setup

Create a `.env` file in the `backend/` directory (an `.env` already exists for local development, `.env.example` is provided as a template):

```
DATABASE_URL="mysql://root:logi2002@localhost/hotel_today_specials"
PORT=5000
```

Make sure a MySQL server is running and that the `hotel_today_specials` database exists (Prisma migrate will create the tables, but the database itself must exist, or you can let MySQL create it beforehand).

### Prisma 7 notes

Prisma 7 no longer reads the datasource URL directly out of `schema.prisma`. Instead:

- `prisma.config.ts` (project root) supplies `DATABASE_URL` to the Prisma **CLI** (`migrate`, `generate`, `studio`) — it loads `.env` itself via `dotenv/config`.
- `src/config/prisma.ts` constructs the **runtime** client using a driver adapter (`@prisma/adapter-mariadb`, which speaks the MySQL wire protocol) built from `process.env.DATABASE_URL`. Plain `new PrismaClient()` with no adapter is no longer supported.

Both places read the same `DATABASE_URL` from `.env`, so you only maintain it in one place.

## Prisma Migration

Run the initial migration to create the `today_specials` table:

```bash
npx prisma migrate dev
```

(In production, use `npx prisma migrate deploy` instead.)

## Generate Prisma Client

```bash
npx prisma generate
```

## Run Development Server

```bash
npm run dev
```

The server starts on `http://localhost:5000` (or the `PORT` set in `.env`).

## Build & Run in Production

```bash
npm run build
npm run start
```

## API Endpoints

Base URL: `/api/today-specials`

| Method | Endpoint                  | Description                |
| ------ | ------------------------- | --------------------------- |
| GET    | `/api/today-specials`     | Get all today's specials    |
| GET    | `/api/today-specials/:id` | Get a single special by id  |
| POST   | `/api/today-specials`     | Create a new special        |
| PUT    | `/api/today-specials/:id` | Update an existing special  |
| DELETE | `/api/today-specials/:id` | Delete a special            |

### Request Body (POST / PUT)

`image` and `video` must be sent as **base64-encoded strings** in the JSON body (they are stored as `LONGBLOB` in MySQL).

```json
{
  "title": "Chef's Special",
  "dishName": "Butter Chicken",
  "price": 249.99,
  "image": "<base64-encoded-image>",
  "video": "<base64-encoded-video>",
  "isActive": true
}
```

For `PUT`, all fields are optional but at least one must be provided.

### Success Response Format

```json
{
  "success": true,
  "message": "Today's special created successfully",
  "data": {}
}
```

### Error Response Format

```json
{
  "success": false,
  "message": "Dish not found"
}
```

## Available Scripts

| Script                    | Description                              |
| ------------------------- | ----------------------------------------- |
| `npm run dev`              | Start the dev server with nodemon + ts-node |
| `npm run build`            | Compile TypeScript to `dist/`             |
| `npm run start`             | Run the compiled production build         |
| `npm run prisma:migrate`   | Run Prisma migrations                     |
| `npm run prisma:generate`  | Generate the Prisma Client                |
| `npm run prisma:studio`    | Open Prisma Studio                        |
