/**
 * Fetches 1000+ movies from TMDB and writes src/data/tmdbMovies.json.
 * Each movie has: id, title, description, genre, tmdbPosterPath
 *
 * Run: TMDB_API_KEY=your_key node scripts/fetch-tmdb-movies.js
 *
 * Requires: Node 18+ (fetch). Fetches 50 pages (1000 movies); ~30–60 seconds.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.TMDB_API_KEY;
const OUT_PATH = path.join(__dirname, '../src/data/tmdbMovies.json');
const TARGET_COUNT = 1100;
const PAGE_SIZE = 20;
const PAGES = Math.ceil(TARGET_COUNT / PAGE_SIZE); // 55 pages for 1000+

if (!API_KEY) {
  console.error('Set TMDB_API_KEY. Get a free key at https://www.themoviedb.org/settings/api');
  process.exit(1);
}

async function fetchJson(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}: ${url}`);
  return res.json();
}

async function main() {
  console.log('Fetching genre list...');
  const genreRes = await fetchJson(
    `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en`
  );
  const genreMap = Object.fromEntries(
    (genreRes.genres || []).map((g) => [g.id, g.name.toLowerCase().replace(/\s+/g, '-')])
  );

  const movies = [];
  const seenIds = new Set();

  for (let page = 1; page <= PAGES; page++) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=${page}`;
    const data = await fetchJson(url);
    const results = data.results || [];

    for (const m of results) {
      if (!m.id || !m.title || seenIds.has(m.id)) continue;
      seenIds.add(m.id);

      const genreIds = m.genre_ids || [];
      const primaryGenre = genreIds.length ? genreMap[genreIds[0]] : 'drama';
      const overview = (m.overview || '').trim() || 'No overview available.';
      const posterPath = m.poster_path ? (m.poster_path.startsWith('/') ? m.poster_path : `/${m.poster_path}`) : null;
      const releaseDate = m.release_date || '';
      const year = releaseDate ? parseInt(releaseDate.slice(0, 4), 10) : null;

      movies.push({
        id: String(m.id),
        title: m.title,
        description: overview.slice(0, 500),
        genre: primaryGenre || 'drama',
        tmdbPosterPath: posterPath,
        year,
      });
    }

    console.log(`Page ${page}/${PAGES} — ${movies.length} movies so far`);
    if (page < PAGES) await new Promise((r) => setTimeout(r, 250));
  }

  fs.writeFileSync(OUT_PATH, JSON.stringify(movies, null, 0), 'utf8');
  console.log(`\nWrote ${movies.length} movies to ${OUT_PATH}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
