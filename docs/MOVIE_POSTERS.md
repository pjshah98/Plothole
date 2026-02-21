# Using online movie posters (TMDB)

Posters can come from:

1. **Local files** in `public/` – use `image: "/f1.jpg"` in `movieData.js`.
2. **TMDB (The Movie Database)** – no API key needed to *display*; we store only the poster path and use `https://image.tmdb.org/t/p/w500{path}`.
3. **Fallback** – when a movie has no TMDB path (or the image fails to load), the app shows a deterministic placeholder image so every poster is visible.

## Get real posters for all movies (recommended)

Run the script once with your free TMDB API key to fill `tmdbPosters.json` with poster paths for every movie:

```bash
TMDB_API_KEY=your_key node scripts/fetch-tmdb-posters.js
```

Get a key at [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api). The script updates `src/data/tmdbPosters.json`; refresh the app to see real posters everywhere.

## Option A: Add poster paths by hand

1. Open [themoviedb.org](https://www.themoviedb.org/), search for the movie.
2. Open the movie page → right‑click the poster → “Copy image address” (or inspect and copy the path part after `t/p/w500`).
3. In `src/data/tmdbPosters.json`, add: `"Movie Title": "/path.jpg"`.
4. Ensure the title matches exactly the `title` in `src/data/movieData.js`.

## Option B: Fetch all posters with the TMDB API (recommended)

1. Get a free API key: [TMDB Settings → API](https://www.themoviedb.org/settings/api).
2. Run from the project root:
   ```bash
   TMDB_API_KEY=your_key node scripts/fetch-tmdb-posters.js
   ```
3. The script updates `src/data/tmdbPosters.json` with poster paths for every movie in `movieData.js`.

The app prefers: local `image` → `tmdbPosterPath` → placeholder. If a poster URL fails to load, a placeholder with the movie title is shown.
