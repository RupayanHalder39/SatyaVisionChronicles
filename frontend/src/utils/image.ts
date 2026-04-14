const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
const API_ORIGIN = new URL(API_BASE_URL).origin;

export function resolveImageUrl(path?: string | null) {
  if (!path) return undefined;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  if (path.startsWith('/static')) return `${API_ORIGIN}${path}`;
  return path;
}
