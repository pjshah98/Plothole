/**
 * Movie catalog: loaded from TMDB bulk export (1000+ movies).
 * To refresh: TMDB_API_KEY=your_key node scripts/fetch-tmdb-movies.js
 */
import tmdbMovies from './tmdbMovies.json';

// Optional: prepend a few featured cases with local posters (keep your custom F1, etc.)
const localFeatured = [
  {
    id: 'f1',
    title: 'F1',
    description: "In the 1990s, Sonny Hayes was Formula 1's most promising driver until an accident on the track nearly ended his career. Thirty years later, the owner of a struggling Formula 1 team convinces Sonny to return to racing and become the best in the world.",
    image: '/f1.jpg',
    genre: 'drama',
    difficulty: 'medium',
  },
  {
    id: 'superman-local',
    title: 'Superman',
    description: 'New movie of Superman.',
    image: '/supes.jpg',
    genre: 'action',
  },
  {
    id: 'interstellar-local',
    title: 'Interstellar',
    description: 'A sci-fi journey through space and time.',
    image: '/interstellar.webp',
    genre: 'sci-fi',
  },
  {
    id: 'inception-local',
    title: 'Inception',
    description: "A mind-bending thriller where dreams are the battlefield.",
    image: '/inception.jpg',
    genre: 'sci-fi',
    difficulty: 'hard',
  },
  {
    id: 'oppenheimer-local',
    title: 'Oppenheimer',
    description: 'A powerful drama about the father of the atomic bomb.',
    image: '/oppenheimer.jpg',
    genre: 'drama',
  },
  {
    id: 'hangover-local',
    title: 'The Hangover',
    description: 'Three groomsmen lose their soon-to-be-wed buddy during their Vegas bachelor party and must retrace their steps.',
    image: '/hangover.jpg',
    genre: 'comedy',
  },
];

// Avoid duplicate TMDB titles we're featuring locally (by title)
const featuredTitles = new Set(localFeatured.map((m) => m.title));
const fromTmdb = Array.isArray(tmdbMovies)
  ? tmdbMovies.filter((m) => !featuredTitles.has(m.title))
  : [];

export const allCases = [...localFeatured, ...fromTmdb];
