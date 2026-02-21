const PREFIX = 'plothole_case_';

export function getSubmissions(caseId) {
  try {
    const raw = localStorage.getItem(PREFIX + caseId);
    if (!raw) return [];
    const list = JSON.parse(raw);
    return Array.isArray(list) ? list : [];
  } catch (_) {
    return [];
  }
}

export function saveSubmissions(caseId, submissions) {
  try {
    localStorage.setItem(PREFIX + caseId, JSON.stringify(submissions));
  } catch (_) {}
}
