import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'

import { collections, globals } from './payload'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

export default buildConfig({
  serverURL: process.env.CMS_SERVER_URL ?? 'http://localhost:3003',

  // Auth will be introduced in Step 18C (dev Users first, then Keycloak OIDC).
  // For now, we just compile the config and collections.
  collections,
  globals,

  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL },
  }),

  upload: {
    limits: { fileSize: 50 * 1024 * 1024 },
  },

  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
})
