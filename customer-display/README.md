# Cage Nayagam - Customer Display (Phase 3)

A full-screen, display-only digital menu board that cycles through today's **active** specials. Runs as a completely separate React app from the admin dashboard, on its own port, sharing the same backend and MySQL database.

## Tech Stack

- React 19 (functional components + hooks)
- Axios
- Vite
- Plain CSS (no UI framework)

## Folder Structure

```
customer-display/
├── public/
│   └── hotel-logo.svg
├── src/
│   ├── components/
│   │     DishCarousel.jsx
│   │     DishCard.jsx
│   │     Loading.jsx
│   │     EmptyState.jsx
│   │     ErrorState.jsx
│   │
│   ├── services/
│   │     api.js
│   │     todaySpecialService.js
│   │
│   ├── utils/
│   │     constants.js
│   │     mediaUtils.js
│   │
│   ├── styles/
│   │     App.css
│   │     DishCard.css
│   │     Carousel.css
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
cd customer-display
npm install
```

## Environment Setup

```
VITE_API_BASE_URL=http://localhost:5000/api
VITE_HOTEL_NAME=Cage Nayagam
VITE_SLIDE_DURATION_MS=10000
VITE_REFRESH_INTERVAL_MS=30000
```

The backend (`../backend`) must be running on the URL above.

## Run Development Server

```bash
npm run dev
```

Opens on `http://localhost:5174` — a separate port from the admin dashboard (`http://localhost:5173`). Both apps talk to the same backend/database; this app never writes any data.

## Build & Preview

```bash
npm run build
npm run preview
```

## How It Works

- **Data source**: `services/todaySpecialService.js` calls `GET /api/today-specials/active`, a backend endpoint added specifically for this app that returns only `isActive: true` dishes, newest first. Inactive dishes are filtered out server-side and never reach this app.
- **Carousel**: `components/DishCarousel.jsx` shows one dish at a time, advancing every `VITE_SLIDE_DURATION_MS` (default 10s) and looping back to the first dish after the last. Each slide remounts a fresh `DishCard` (keyed by dish id), which both triggers the CSS fade-in and guarantees any playing video is torn down when the slide changes.
- **Auto-refresh**: `App.jsx` polls `GET /api/today-specials/active` every `VITE_REFRESH_INTERVAL_MS` (default 30s) so admin changes (add/edit/delete/toggle active) show up on the display without a manual reload. A background refresh failure does not interrupt the current display — it just logs to the console and keeps showing the last known-good dishes; only a failure on the very first load shows the full error screen.
- **Media**: like the admin app, `image`/`video` come back from the API as base64 strings with no stored MIME type, so `utils/mediaUtils.js` sniffs the real MIME type from the binary file signature before building a `data:` URL. If both image and video are present, the video is rendered (autoplay, muted, loop, inline) as the primary media, per spec.
- **States**: `Loading`, `EmptyState` ("No Today's Special Available"), and `ErrorState` (with a Retry button) are plain full-screen components with no navigation, forms, or editing controls anywhere in this app.
