const PREFIX = 'plothole_xp_';

export function getUserXP(userId) {
  if (!userId) return 0;
  try {
    const raw = localStorage.getItem(PREFIX + userId);
    if (raw == null) return 0;
    const n = parseInt(raw, 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  } catch (_) {
    return 0;
  }
}

export function addXP(userId, amount = 10) {
  if (!userId || amount <= 0) return getUserXP(userId);
  const current = getUserXP(userId);
  const next = current + amount;
  try {
    localStorage.setItem(PREFIX + userId, String(next));
  } catch (_) {}
  return next;
}
