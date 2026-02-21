# Plothole API

Backend for auth (signup, login, session).

## Setup

```bash
npm install
```

## Run

- **Development** (with auto-restart): `npm run dev`
- **Production**: `npm start`

Runs on port **3001** by default. Set `PORT` to change.

From the project root you can use:

- `npm run server` — runs the API in dev mode
- `npm run server:start` — runs the API once

## Endpoints

- `POST /api/auth/signup` — `{ username, password }` → `{ user, token }`
- `POST /api/auth/login` — `{ username, password }` → `{ user, token }`
- `GET /api/auth/me` — `Authorization: Bearer <token>` → `{ user }`

User data is stored in `server/data/users.json` (created on first signup).
