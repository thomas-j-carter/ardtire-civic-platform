import { createRemoteJWKSet, jwtVerify } from 'jose'

export function issuer() {
  return process.env.OIDC_ISSUER ?? 'http://localhost:8090/realms/ardtire'
}

function allowedClients(): Set<string> {
  const raw = process.env.OIDC_ALLOWED_CLIENTS ?? 'portal,admin,public'
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  )
}

const jwks = createRemoteJWKSet(new URL(`${issuer()}/protocol/openid-connect/certs`))

export async function verifyAccessToken(token: string) {
  // Verify signature, issuer, and standard claims (exp is checked by jwtVerify).
  const { payload } = await jwtVerify(token, jwks, { issuer: issuer() })

  // Enforce client binding:
  // Keycloak tokens commonly include `azp` (authorized party) representing the client_id.
  const azp = typeof payload.azp === 'string' ? payload.azp : null
  const aud = payload.aud

  const allowed = allowedClients()

  // Accept if azp is allowed OR any string aud entry is allowed.
  const audList =
    typeof aud === 'string' ? [aud] : Array.isArray(aud) ? aud.filter((x): x is string => typeof x === 'string') : []

  const ok = (azp && allowed.has(azp)) || audList.some((a) => allowed.has(a))
  if (!ok) {
    throw new Error('token_client_not_allowed')
  }

  return payload as any
}
