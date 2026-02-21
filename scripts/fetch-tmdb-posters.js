/**
 * Fetches TMDB poster paths for all movies and writes src/data/tmdbPosters.json.
 *
 * 1. Get a free API key: https://www.themoviedb.org/settings/api
 * 2. Run: TMDB_API_KEY=your_key node scripts/fetch-tmdb-posters.js
 *
 * Requires: Node 18+ (for fetch)
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const API_KEY = process.env.TMDB_API_KEY;
const OUT_PATH = path.join(__dirname, '../src/data/tmdbPosters.json');

if (!API_KEY) {
  console.error('Set TMDB_API_KEY. Get a free key at https://www.themoviedb.org/settings/api');
  process.exit(1);
}

// Read current movie titles from movieData (rawCases)
const movieDataPath = path.join(__dirname, '../src/data/movieData.js');
const content = fs.readFileSync(movieDataPath, 'utf8');
const titleMatches = content.matchAll(/title:\s*["']([^"']+)["']/g);
const titles = [...new Set([...titleMatches].map((m) => m[1]))];

async function searchMovie(title) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(title)}`;
  const res = await fetch(url);
  if (!res.ok) return null;
  const data = await res.json();
  const first = data.results?.[0];
  return first?.poster_path || null;
}

const posters = {};
for (const title of titles) {
  const posterPath = await searchMovie(title);
  if (posterPath) {
    posters[title] = posterPath.startsWith('/') ? posterPath : `/${posterPath}`;
    console.log('OK:', title);
  } else {
    console.log('--:', title, '(no poster)');
  }
  await new Promise((r) => setTimeout(r, 250)); // rate limit
}

fs.writeFileSync(OUT_PATH, JSON.stringify(posters, null, 2), 'utf8');
console.log('\nWrote', OUT_PATH);
