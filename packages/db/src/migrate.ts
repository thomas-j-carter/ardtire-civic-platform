import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import { drizzle } from 'drizzle-orm/node-postgres'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is required')

  const pool = new pg.Pool({ connectionString: url })
  const db = drizzle(pool)

  // migrations folder is packages/db/drizzle
  const migrationsFolder = path.resolve(__dirname, '../drizzle')
  await migrate(db, { migrationsFolder })

  await pool.end()
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
