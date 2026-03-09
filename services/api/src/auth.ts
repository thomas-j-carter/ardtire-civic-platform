import { createRemoteJWKSet, jwtVerify } from 'jose'

export function issuer() {
return process.env.OIDC_ISSUER ?? '[http://localhost:8090/realms/ardtire](http://localhost:8090/realms/ardtire)'
}

const jwks = createRemoteJWKSet(new URL(`${issuer()}/protocol/openid-connect/certs`))

export async function verifyAccessToken(token: string) {
const { payload } = await jwtVerify(token, jwks, { issuer: issuer() })
return payload as any
}
