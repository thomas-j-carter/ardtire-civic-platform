import { decodeJwt } from 'jose'

export type ArdtireRole =
  | 'crown'
  | 'admin'
  | 'editor'
  | 'officer'
  | 'founding-member'
  | 'member'
  | 'associate'
  | 'public'

export type AuthClaims = {
  sub: string
  preferred_username?: string
  email?: string
  realm_access?: { roles?: string[] }
  acr?: string
  auth_time?: number
  exp?: number
  iat?: number
}

export function getIssuer(): string {
  return process.env.OIDC_ISSUER ?? 'http://localhost:8090/realms/ardtire'
}

export function getClientId(kind: 'portal' | 'admin'): string {
  if (kind === 'portal') return process.env.OIDC_CLIENT_ID_PORTAL ?? 'portal'
  return process.env.OIDC_CLIENT_ID_ADMIN ?? 'admin'
}

export function getRedirectBase(kind: 'portal' | 'admin'): string {
  if (kind === 'portal') return process.env.OIDC_REDIRECT_BASE_PORTAL ?? 'http://localhost:3001'
  return process.env.OIDC_REDIRECT_BASE_ADMIN ?? 'http://localhost:3002'
}

export function buildAuthorizeUrl(kind: 'portal' | 'admin', state: string, codeChallenge: string) {
  const issuer = getIssuer()
  const clientId = getClientId(kind)
  const redirectUri = `${getRedirectBase(kind)}/auth/callback`
  const u = new URL(`${issuer}/protocol/openid-connect/auth`)
  u.searchParams.set('client_id', clientId)
  u.searchParams.set('redirect_uri', redirectUri)
  u.searchParams.set('response_type', 'code')
  u.searchParams.set('scope', 'openid profile email')
  u.searchParams.set('state', state)
  u.searchParams.set('code_challenge', codeChallenge)
  u.searchParams.set('code_challenge_method', 'S256')
  return u.toString()
}

export function buildLogoutUrl(kind: 'portal' | 'admin') {
  const issuer = getIssuer()
  const redirectUri = `${getRedirectBase(kind)}/`
  const u = new URL(`${issuer}/protocol/openid-connect/logout`)
  u.searchParams.set('post_logout_redirect_uri', redirectUri)
  return u.toString()
}

export function decodeClaims(accessToken: string): AuthClaims {
  return decodeJwt(accessToken) as AuthClaims
}

export function extractRealmRoles(claims: AuthClaims): ArdtireRole[] {
  const roles = claims?.realm_access?.roles ?? []
  const allowed: ArdtireRole[] = [
    'crown',
    'admin',
    'editor',
    'officer',
    'founding-member',
    'member',
    'associate',
    'public',
  ]
  return roles.filter((r): r is ArdtireRole => allowed.includes(r as any))
}

export function hasAnyRole(roles: ArdtireRole[], required: ArdtireRole[]) {
  return required.some((r) => roles.includes(r))
}
