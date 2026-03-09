import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import pg from 'pg'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

function migrationsDir() {
  return path.resolve(__dirname, '../drizzle')
}

function listSqlMigrations(dir: string) {
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.sql'))
    .sort((a, b) => a.localeCompare(b))
}

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is required')

  const pool = new pg.Pool({ connectionString: url })

  await pool.query(`
    create table if not exists schema_migrations (
      filename text primary key,
      applied_at timestamptz not null default now()
    );
  `)

  const dir = migrationsDir()
  if (!fs.existsSync(dir)) throw new Error(`migrations dir not found: ${dir}`)

  const files = listSqlMigrations(dir)
  for (const f of files) {
    const already = await pool.query('select 1 from schema_migrations where filename = $1', [f])
    if (already.rowCount && already.rowCount > 0) {
      continue
    }

    const full = path.join(dir, f)
    const sql = fs.readFileSync(full, 'utf8')

    console.log(`[migrate] applying ${f}`)
    await pool.query('begin')
    try {
      await pool.query(sql)
      await pool.query('insert into schema_migrations (filename) values ($1)', [f])
      await pool.query('commit')
    } catch (e) {
      await pool.query('rollback')
      throw e
    }
  }

  await pool.end()
  console.log('[migrate] done')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
