# Plothole

A community site for spotting plot holes in movies and TV. Browse cases, submit your findings, vote and comment on others’ investigations, and earn XP to climb the ranks.

## Try it

- **Live site** — If the frontend is deployed, the link is in this repo's About → Website. You can browse cases and the UI; **login and signup will not work** unless the API is also deployed (this repo only deploys the frontend by default).
- **Run locally** — Clone the repo and follow [Run locally](#run-locally) below (two terminals: API + frontend). This gives the full experience, including login, signup, and authenticated features.

## Features

- **Browse cases** — Dozens of movies with search and genre filters
- **Submit plot holes** — Describe inconsistencies (requires account)
- **Vote & comment** — Upvote/downvote submissions and join discussions
- **XP & ranks** — Earn XP per submission; unlock ranks from New Recruit to Master Sleuth
- **Online posters** — Movie posters via TMDB (optional script to fetch all)
- **Auth** — Sign up / log in with the backend API (JWT, bcrypt)

## Tech stack

- **Frontend:** React 19, Vite, React Router, Tailwind CSS 4
- **Backend:** Node.js, Express, JWT, bcrypt, file-based storage (users + optional submissions)

## Run locally

### 1. Install dependencies

```bash
npm install
cd server && npm install && cd ..
```

### 2. Start the API (terminal 1)

```bash
npm run server
```

Runs the auth API at [http://localhost:3001](http://localhost:3001).

### 3. Start the app (terminal 2)

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

Vite proxies `/api` to the backend, so login/signup work without CORS issues.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server |
| `npm run build` | Production build |
| `npm run preview` | Preview production build |
| `npm run server` | Start API in dev (with watch) |
| `npm run server:start` | Start API once (no watch) |

## Movie catalog (1000+)

The app loads movies from `src/data/tmdbMovies.json` (1066 popular movies from TMDB). To refresh or refetch:

```bash
TMDB_API_KEY=your_key node scripts/fetch-tmdb-movies.js
```

Six featured movies (F1, Superman, Interstellar, Inception, Oppenheimer, The Hangover) use your local posters and appear first; the rest come from the TMDB export with poster paths included.

## Project structure

```
├── src/
│   ├── api/          # Auth API client
│   ├── components/   # Layout, CaseCard, FlawCard, DifficultyTag
│   ├── context/      # AuthContext
│   ├── data/         # movieData, tmdbPosters.json
│   ├── pages/        # Home, AllCases, CasePage, Login, Signup, About, NotFound
│   └── utils/        # moviePoster, caseStorage, xpStorage
├── server/           # Express auth API (signup, login, me)
├── scripts/          # fetch-tmdb-posters.js
└── docs/             # MOVIE_POSTERS.md
```

## License

MIT
