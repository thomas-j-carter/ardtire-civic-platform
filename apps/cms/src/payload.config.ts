import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'

import { collections, globals } from './payload/index'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.CMS_SERVER_URL ?? 'http://localhost:3003',
  admin: {
    user: undefined, // We will use Keycloak/OIDC later; for now Payload uses its own Users collection (added next step).
  },
  collections,
  globals,
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  // Local dev upload storage:
  upload: {
    limits: {
      fileSize: 50 * 1024 * 1024, // 50MB dev default
    },
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
