import { createFileRoute } from '@tanstack/solid-router'
import { buildAuthorizeUrl } from '@ardtire/auth'
import { randomString, sha256Base64Url } from '../../lib/pkce'

export const Route = createFileRoute('/auth/login')({
  beforeLoad: async () => {
    const state = randomString(16)
    const verifier = randomString(32)
    const challenge = await sha256Base64Url(verifier)

    sessionStorage.setItem('pkce_verifier', verifier)
    sessionStorage.setItem('oidc_state', state)

    window.location.href = buildAuthorizeUrl('admin', state, challenge)
  },
  component: () => null,
})
