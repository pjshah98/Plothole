/**
 * Resolve the image URL for a movie.
 * - If movie.image is a local path (starts with /), use it as-is.
 * - If movie.tmdbPosterPath is set, use TMDB's CDN (no API key needed for displaying).
 * - If movie.image is already a full URL (http/https), use it.
 * - Otherwise use a deterministic placeholder image (picsum.photos) so every movie shows something.
 *
 * When a TMDB or placeholder image fails to load, use getPlaceholderUrl() in onError.
 */
const TMDB_POSTER_BASE = 'https://image.tmdb.org/t/p/w500';

// Deterministic placeholder: same movie always gets same image. Avoids placehold.co which can be blocked/slow.
function getPicsumUrl(seed, width = 300, height = 450) {
  const s = encodeURIComponent(String(seed));
  return `https://picsum.photos/seed/${s}/${width}/${height}`;
}

export function getMovieImageUrl(movie) {
  if (!movie) return getPicsumUrl('poster');

  const img = movie.image;
  const tmdbPath = movie.tmdbPosterPath;

  // Local file (e.g. /f1.jpg, /interstellar.webp)
  if (img && typeof img === 'string' && img.startsWith('/')) {
    return img;
  }

  // TMDB poster path (e.g. /kqjL17yufvn9OVLyXYpvtyrFfak.jpg)
  if (tmdbPath && typeof tmdbPath === 'string') {
    const path = tmdbPath.startsWith('/') ? tmdbPath : `/${tmdbPath}`;
    return `${TMDB_POSTER_BASE}${path}`;
  }

  // Already a full URL (e.g. external or legacy placeholder)
  if (img && (img.startsWith('http://') || img.startsWith('https://'))) {
    return img;
  }

  // Fallback: deterministic image per movie so every poster is visible
  const seed = (movie.id || movie.title || 'poster').toString();
  return getPicsumUrl(seed);
}

/** Placeholder when a poster image fails to load (e.g. TMDB 404). Also deterministic by title. */
export function getPlaceholderUrl(title) {
  return getPicsumUrl(title || 'poster');
}
