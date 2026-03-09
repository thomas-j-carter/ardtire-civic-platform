import { decodeClaims, extractRealmRoles, hasAnyRole, type ArdtireRole } from '@ardtire/auth'
import { readSessionCookie } from './session'

const REQUIRED: ArdtireRole[] = ['admin','crown',]
  .filter(Boolean) as any

export function requireAuth(request: Request) {
  const token = readSessionCookie(request)
  if (!token) return { ok: false as const, reason: 'no_session' as const }

  const claims = decodeClaims(token)
  const roles = extractRealmRoles(claims)

  if (REQUIRED.length > 0 && !hasAnyRole(roles, REQUIRED)) {
    return { ok: false as const, reason: 'forbidden' as const }
  }

  return { ok: true as const, token, claims, roles }
}
