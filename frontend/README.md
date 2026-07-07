# Cage Nayagam - Hotel Today Specials (Frontend)

React admin dashboard for managing "Today's Specials" dishes at **Cage Nayagam**. Talks to the Express/Prisma/MySQL backend in `../backend`.

## Tech Stack

- React 19 (functional components + hooks)
- React Router DOM 7
- Axios
- Vite
- Plain CSS (Flexbox + Grid, no UI framework)

## Folder Structure

```
frontend/
├── public/
│   └── hotel-logo.svg
├── src/
│   ├── components/
│   │     Navbar.jsx / Navbar.css
│   │     DishCard.jsx / DishCard.css
│   │     DishForm.jsx / DishForm.css
│   │     ProtectedRoute.jsx
│   │     Loader.jsx / Loader.css
│   │     Toast.jsx / Toast.css
│   │
│   ├── pages/
│   │     Login.jsx / Login.css
│   │     Dashboard.jsx / Dashboard.css
│   │     AddDish.jsx / AddDish.css
│   │     EditDish.jsx / EditDish.css
│   │     ManageDish.jsx / ManageDish.css
│   │     NotFound.jsx / NotFound.css
│   │
│   ├── services/
│   │     api.js
│   │     authService.js
│   │     dishService.js
│   │
│   ├── hooks/
│   │     useAuth.js
│   │
│   ├── utils/
│   │     constants.js
│   │     validators.js
│   │     fileHelpers.js
│   │     format.js
│   │
│   ├── styles/
│   │     variables.css
│   │     global.css
│   │
│   ├── App.jsx
│   └── main.jsx
│
├── index.html
├── vite.config.js
├── .env / .env.example
├── .gitignore
├── package.json
└── README.md
```

## Installation

```bash
cd frontend
npm install
```

## Environment Setup

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_HOTEL_NAME=Cage Nayagam
```

Make sure the backend (`../backend`) is running on the URL above, and that at least one user exists — use `POST /api/auth/create-user` once (e.g. via curl/Postman) to create your first login.

## Run Development Server

```bash
npm run dev
```

Opens on `http://localhost:5173`.

## Build & Preview

```bash
npm run build
npm run preview
```

## Authentication

There is no JWT — `services/authService.js` calls `POST /api/auth/login` and stores the returned user object in `localStorage`. `hooks/useAuth.js` exposes `{ user, isAuthenticated, login, logout }`. `components/ProtectedRoute.jsx` redirects to `/login` when not authenticated and renders the shared `Navbar` + page content otherwise.

## Media Handling

The backend stores `image`/`video` as raw `LONGBLOB` bytes and expects/returns them as base64 strings over JSON (no multipart upload). `utils/fileHelpers.js` handles both directions:

- `fileToBase64(file)` — converts a selected `<input type="file">` into the base64 string sent to the API.
- `detectMimeType(base64)` / `toDataUrl(base64, category)` — since the API doesn't store a MIME type alongside the bytes, the actual image/video format is sniffed from the binary file signature (magic bytes) on the frontend so previews (`<img>`/`<video>` data URLs) render with a real, working MIME type.

A dish only needs **one** of image or video (validated client-side in `utils/validators.js` and server-side in the backend), matching the Add Dish page's "image OR video" requirement.

## Routes

| Path                | Page         | Access     |
| ------------------- | ------------ | ---------- |
| `/login`             | Login        | Public     |
| `/`                  | Dashboard    | Protected  |
| `/add-dish`          | Add Dish     | Protected  |
| `/manage-dish`       | Manage Dish  | Protected  |
| `/edit-dish/:id`     | Edit Dish    | Protected  |
| `*`                  | Not Found    | Public     |
