import { createFileRoute } from '@tanstack/solid-router'
import { getIssuer, getClientId, getRedirectBase } from '@ardtire/auth'
import { apiFetch } from '../../lib/platformApi'

export const Route = createFileRoute('/auth/callback')({
  beforeLoad: async () => {
    const url = new URL(window.location.href)
    const code = url.searchParams.get('code')
    const state = url.searchParams.get('state')

    const expectedState = sessionStorage.getItem('oidc_state')
    const verifier = sessionStorage.getItem('pkce_verifier')

    if (!code || !state || !expectedState || state !== expectedState || !verifier) {
      window.location.href = '/'
      return
    }

    const tokenUrl = `${getIssuer()}/protocol/openid-connect/token`
    const redirectUri = `${getRedirectBase('portal')}/auth/callback`

    const body = new URLSearchParams()
    body.set('grant_type', 'authorization_code')
    body.set('client_id', getClientId('portal'))
    body.set('code', code)
    body.set('redirect_uri', redirectUri)
    body.set('code_verifier', verifier)

    const res = await fetch(tokenUrl, {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body,
    })

    if (!res.ok) {
      window.location.href = '/'
      return
    }

    const json = await res.json()
    const accessToken = json.access_token as string | undefined
    if (!accessToken) {
      window.location.href = '/'
      return
    }

    const setRes = await apiFetch('/auth/session', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ accessToken }),
    })

    if (!setRes.ok) {
      window.location.href = '/'
      return
    }

    window.location.href = '/'
  },
  component: () => null,
})
