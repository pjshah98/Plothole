/**
 * Movie catalog: loaded from TMDB bulk export (1000+ movies).
 * To refresh: TMDB_API_KEY=your_key node scripts/fetch-tmdb-movies.js
 *
 * The 6 featured movies use local poster images but take title, description, and genre from the API (tmdbMovies).
 */
import tmdbMovies from './tmdbMovies.json';

// Featured movies: we keep these IDs and local poster paths, but use API data for title/description/genre
const featuredLocalPosters = [
  { title: 'F1', image: '/f1.jpg', id: 'f1', difficulty: 'medium' },
  { title: 'Superman', image: '/supes.jpg', id: 'superman-local' },
  { title: 'Interstellar', image: '/interstellar.webp', id: 'interstellar-local' },
  { title: 'Inception', image: '/inception.jpg', id: 'inception-local', difficulty: 'hard' },
  { title: 'Oppenheimer', image: '/oppenheimer.jpg', id: 'oppenheimer-local' },
  { title: 'The Hangover', image: '/hangover.jpg', id: 'hangover-local' },
];

const tmdbList = Array.isArray(tmdbMovies) ? tmdbMovies : [];

function findInTmdb(title) {
  const lower = title.toLowerCase();
  return tmdbList.find((m) => m.title.toLowerCase() === lower);
}

// Merge featured entries: API data + local image (and optional difficulty)
const featuredWithApiData = featuredLocalPosters.map((feat) => {
  const fromApi = findInTmdb(feat.title);
  if (fromApi) {
    return {
      ...fromApi,
      id: feat.id,
      image: feat.image,
      ...(feat.difficulty && { difficulty: feat.difficulty }),
    };
  }
  // Not in API (e.g. F1): keep minimal fallback with local image
  return {
    id: feat.id,
    title: feat.title,
    description: 'No overview available from the catalog.',
    genre: 'drama',
    image: feat.image,
    ...(feat.difficulty && { difficulty: feat.difficulty }),
  };
});

const featuredTitles = new Set(featuredWithApiData.map((m) => m.title));
const fromTmdb = tmdbList.filter((m) => !featuredTitles.has(m.title));

export const allCases = [...featuredWithApiData, ...fromTmdb];
