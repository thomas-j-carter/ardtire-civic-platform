import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const app = new Hono()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Resolve OpenAPI spec path from repo root
const OPENAPI_PATH = path.resolve(__dirname, '../../../openapi/ardtire-platform.openapi.yaml')

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

const port = Number(process.env.API_PORT ?? '8080')
serve({ fetch: app.fetch, port })

// eslint-disable-next-line no-console
console.log(`[api] listening on http://localhost:${port}`)
