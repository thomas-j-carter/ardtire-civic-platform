import type { Access } from 'payload'
import type { ArdtireRole, RequestUser } from '../types/auth'

export function getUser(req: any): RequestUser | null {
  // Payload typically attaches req.user when auth is enabled.
  // For Keycloak integration later, we will map OIDC claims into req.user.
  const u = req?.user
  if (!u) return null
  const roles = Array.isArray(u.roles) ? u.roles : Array.isArray(u?.realm_access?.roles) ? u.realm_access.roles : []
  return {
    sub: u.sub ?? u.id ?? u.keycloakSub,
    email: u.email,
    preferred_username: u.preferred_username ?? u.username,
    roles,
    tier: u.tier,
    clearance: u.clearance,
  }
}

export function hasAnyRole(user: RequestUser | null, required: ArdtireRole[]): boolean {
  if (!user) return false
  const roles = user.roles ?? []
  return required.some((r) => roles.includes(r))
}

export const allowRoles = (roles: ArdtireRole[]): Access =>
  ({ req }) => hasAnyRole(getUser(req), roles)

export const denyAll: Access = () => false
export const allowAll: Access = () => true
