/**
 * Format genre for display: "action" → "Action", "science-fiction" → "Science Fiction".
 * Handles stored values that might be uppercase or mixed case.
 */
export function formatGenre(genre) {
  if (!genre || typeof genre !== 'string') return '';
  return genre
    .toLowerCase()
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
