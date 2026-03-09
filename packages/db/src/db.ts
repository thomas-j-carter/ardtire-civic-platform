import { drizzle } from 'drizzle-orm/node-postgres'
import pg from 'pg'

export function createDb() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is required')
  const pool = new pg.Pool({ connectionString: url })
  return drizzle(pool)
}
