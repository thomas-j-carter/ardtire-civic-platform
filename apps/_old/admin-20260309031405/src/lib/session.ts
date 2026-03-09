export const SESSION_COOKIE = 'ardtire_session'

export function setSessionCookie(headers: Headers, token: string) {
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  headers.append(
    'Set-Cookie',
    `${SESSION_COOKIE}=${encodeURIComponent(token)}; Path=/; HttpOnly; SameSite=Lax${secure}`,
  )
}

export function clearSessionCookie(headers: Headers) {
  headers.append(
    'Set-Cookie',
    `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
  )
}

export function readSessionCookie(req: Request): string | null {
  const cookie = req.headers.get('cookie') ?? ''
  const parts = cookie.split(';').map((p) => p.trim())
  const hit = parts.find((p) => p.startsWith(`${SESSION_COOKIE}=`))
  if (!hit) return null
  return decodeURIComponent(hit.substring(`${SESSION_COOKIE}=`.length))
}
