import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { verifyAccessToken } from './auth'

const app = new Hono()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const OPENAPI_PATH = path.resolve(__dirname, '../../../openapi/ardtire-platform.openapi.yaml')

const SESSION_COOKIE = 'ardtire_session'

function cors(origin: string | null) {
  const raw =
    process.env.CORS_ALLOWED_ORIGINS ?? 'http://localhost:3000,http://localhost:3001,http://localhost:3002'
  const allowed = new Set(
    raw
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean),
  )
  if (!origin || !allowed.has(origin)) return null
  return origin
}

function setCookie(headers: Headers, value: string) {
  // For localhost dev across ports: cookie works on host=localhost.
  const secure = process.env.NODE_ENV === 'production' ? '; Secure' : ''
  headers.append(
    'Set-Cookie',
    `${SESSION_COOKIE}=${encodeURIComponent(value)}; Path=/; HttpOnly; SameSite=Lax${secure}`,
  )
}

function clearCookie(headers: Headers) {
  headers.append('Set-Cookie', `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`)
}

function readCookie(req: Request): string | null {
  const cookie = req.headers.get('cookie') ?? ''
  const parts = cookie.split(';').map((p) => p.trim())
  const hit = parts.find((p) => p.startsWith(`${SESSION_COOKIE}=`))
  if (!hit) return null
  return decodeURIComponent(hit.substring(`${SESSION_COOKIE}=`.length))
}

app.options('*', (c) => {
  const origin = cors(c.req.header('origin') ?? null)
  if (origin) {
    c.header('Access-Control-Allow-Origin', origin)
    c.header('Access-Control-Allow-Credentials', 'true')
    c.header('Access-Control-Allow-Headers', 'content-type')
    c.header('Access-Control-Allow-Methods', 'GET,POST,DELETE,OPTIONS')
    c.header('Vary', 'Origin')
  }
  return c.body(null, 204)
})

app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    service: 'api',
    time: new Date().toISOString(),
  })
})

app.get('/openapi.yaml', (c) => {
  if (!fs.existsSync(OPENAPI_PATH)) {
    return c.text('OpenAPI spec not found', 500)
  }
  const yaml = fs.readFileSync(OPENAPI_PATH, 'utf8')
  c.header('content-type', 'application/yaml; charset=utf-8')
  return c.body(yaml)
})

// POST /auth/session: set HttpOnly cookie from access token (dev scaffold)
app.post('/auth/session', async (c) => {
  const origin = cors(c.req.header('origin') ?? null)
  if (origin) {
    c.header('Access-Control-Allow-Origin', origin)
    c.header('Access-Control-Allow-Credentials', 'true')
    c.header('Vary', 'Origin')
  }

  const body = await c.req.json().catch(() => null)
  const accessToken = body?.accessToken
  if (!accessToken || typeof accessToken !== 'string') return c.json({ error: 'bad_request' }, 400)

  const headers = new Headers()
  setCookie(headers, accessToken)
  return new Response(null, { status: 204, headers })
})

app.delete('/auth/session', (c) => {
  const origin = cors(c.req.header('origin') ?? null)
  if (origin) {
    c.header('Access-Control-Allow-Origin', origin)
    c.header('Access-Control-Allow-Credentials', 'true')
    c.header('Vary', 'Origin')
  }

  const headers = new Headers()
  clearCookie(headers)
  return new Response(null, { status: 204, headers })
})

// GET /auth/whoami: reads cookie, decodes JWT claims (no signature verify yet: scaffold)
app.get('/auth/whoami', async (c) => {
const origin = cors(c.req.header('origin') ?? null)
if (origin) {
c.header('Access-Control-Allow-Origin', origin)
c.header('Access-Control-Allow-Credentials', 'true')
c.header('Vary', 'Origin')
}

const token = readCookie(c.req.raw)
if (!token) return c.json({ error: 'unauthorized' }, 401)

let claims: any
try {
claims = await verifyAccessToken(token)
} catch {
return c.json({ error: 'unauthorized' }, 401)
}

const roles = (claims?.realm_access?.roles ?? []).filter((r: string) =>
['crown', 'admin', 'editor', 'officer', 'founding-member', 'member', 'associate', 'public'].includes(r),
)

return c.json({
sub: claims.sub,
preferred_username: claims.preferred_username ?? null,
email: claims.email ?? null,
roles,
})
})

const port = Number(process.env.API_PORT ?? '8080')
serve({ fetch: app.fetch, port })
console.log(`[api] listening on http://localhost:${port}`)
