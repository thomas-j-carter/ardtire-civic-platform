export function platformApiBase() {
  return import.meta.env.VITE_PLATFORM_API_BASE || 'http://localhost:8080'
}
export async function apiFetch(path: string, init: RequestInit = {}) {
  const url = `${platformApiBase()}${path}`
  return fetch(url, { ...init, credentials: 'include' })
}
