# Hotel Today Specials - Backend

Backend REST API for managing a hotel's "Today's Specials" dishes, built with **Node.js**, **Express.js**, **TypeScript**, **Mongoose**, and **MongoDB (Atlas)**. Phase 2 adds simple username/password authentication used by the React frontend (see `../frontend`).

## Project Overview

Hotel staff can manage today's special dishes through a clean REST API. Each special dish has:

- Title
- Dish Name
- Price
- Image (stored as binary, transferred as base64 over the API) — optional
- Video (stored as binary, transferred as base64 over the API) — optional, but **at least one of image or video is required**
- Is Active flag

A `User` collection backs simple login/create-user endpoints for the admin dashboard. There is no JWT/session middleware — the frontend keeps the logged-in state in `localStorage` and the dish CRUD endpoints remain open, matching the "simple session-based or localStorage login" requirement.

The project follows a clean layered architecture:

```
Route -> Controller -> Service -> Mongoose Model -> MongoDB
```

## Tech Stack

- Node.js
- Express.js
- TypeScript
- Mongoose
- MongoDB (Atlas)

## Folder Structure

```
backend/
│
├── src/
│   ├── config/
│   │     db.ts
│   │
│   ├── models/
│   │     TodaySpecial.model.ts
│   │     User.model.ts
│   │
│   ├── controllers/
│   │     todaySpecial.controller.ts
│   │     auth.controller.ts
│   │
│   ├── routes/
│   │     todaySpecial.routes.ts
│   │     auth.routes.ts
│   │
│   ├── services/
│   │     todaySpecial.service.ts
│   │     auth.service.ts
│   │
│   ├── middlewares/
│   │     validateTodaySpecial.middleware.ts
│   │     validateAuth.middleware.ts
│   │     notFound.middleware.ts
│   │     errorHandler.middleware.ts
│   │
│   ├── utils/
│   │     ApiError.ts
│   │     apiResponse.ts
│   │     asyncHandler.ts
│   │     serializeTodaySpecial.ts
│   │     serializeUser.ts
│   │
│   ├── types/
│   │     todaySpecial.types.ts
│   │     user.types.ts
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
MONGODB_URI="mongodb+srv://<user>:<password>@<cluster>.mongodb.net/hotel_today_specials?retryWrites=true&w=majority"
PORT=5000
```

`MONGODB_URI` can point at a MongoDB Atlas cluster (as above) or a local `mongodb://localhost:27017/hotel_today_specials` instance — no other config is needed. Mongoose connects using this single URI; there's no separate CLI config or migration step, since MongoDB collections are created on first write.

## Database Connection

`src/config/db.ts` exports `connectDB()`, which is called once in `src/server.ts` before the HTTP server starts listening. If `MONGODB_URI` is missing, startup fails fast with a clear error instead of the app booting into a broken state.

## Run Development Server

```bash
npm run dev
```

The server starts on `http://localhost:5000` (or the `PORT` set in `.env`), connecting to MongoDB first.

## Build & Run in Production

```bash
npm run build
npm run start
```

## API Endpoints

Base URL: `/api/today-specials`

| Method | Endpoint                    | Description                                          |
| ------ | ---------------------------- | ------------------------------------------------------- |
| GET    | `/api/today-specials`       | Get all today's specials                             |
| GET    | `/api/today-specials/active` | Get only active specials, newest first (customer display) |
| GET    | `/api/today-specials/:id`   | Get a single special by id                           |
| POST   | `/api/today-specials`       | Create a new special                                 |
| PUT    | `/api/today-specials/:id` | Update an existing special  |
| DELETE | `/api/today-specials/:id` | Delete a special            |

`:id` must be a valid MongoDB `ObjectId` (a 24-character hex string) — an invalid id returns `400 Invalid id parameter` before touching the database.

### Request Body (POST / PUT)

`image` and `video` must be sent as **base64-encoded strings** in the JSON body (they are stored as binary `Buffer` fields in MongoDB). Both are optional individually, but a `POST` must include at least one of them.

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

## Authentication Endpoints

Base URL: `/api/auth`

| Method | Endpoint            | Description                                              |
| ------ | --------------------- | ------------------------------------------------------------ |
| GET    | `/api/auth/status`   | Read-only check: `{ isFirstTimeSetup: boolean }`         |
| POST   | `/api/auth/login`    | First-run admin bootstrap, then username/password check |

`GET /api/auth/status` is a read-only helper for the frontend — it reports whether the `users` collection is currently empty (`isFirstTimeSetup: true`) so the Login page can show a first-time-setup banner. It does not create or modify anything.

There is a single login/auth-mutation endpoint — no separate registration API. `POST /api/auth/login` implements first-time-setup logic:

1. If the `users` collection is empty, the submitted `username`/`password` is hashed and inserted as the first (and only) admin account, and the request succeeds as a login.
2. If the `users` collection already has an account, the submitted credentials are checked against it (bcrypt compare). A mismatch on username or password returns `401` with `"Invalid username or password"`.

No new accounts can be created after the first one exists — there's intentionally no way to add more users via the API.

```json
{
  "username": "admin",
  "password": "secret123"
}
```

Passwords are hashed with `bcryptjs` before being stored; the API never returns the password field. There is no JWT/session token — the frontend stores the returned user object in `localStorage` and treats its presence as "logged in".

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
