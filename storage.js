// localStorage-based storage (works on any hosting: Vercel, Netlify, etc.)
const PREFIX = 'cps_';

export function loadData(key) {
  try {
    const raw = localStorage.getItem(PREFIX + key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function saveData(key, value) {
  try {
    localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error:', e);
  }
}

export function removeData(key) {
  try {
    localStorage.removeItem(PREFIX + key);
  } catch {}
}
