import 'dotenv/config'
import pg from 'pg'

async function main() {
  const url = process.env.DATABASE_URL
  if (!url) throw new Error('DATABASE_URL is required')

  const pool = new pg.Pool({ connectionString: url })

  const { rows } = await pool.query('select count(*)::int as c from register_entry')
  const count = rows[0]?.c ?? 0
  if (count > 0) {
    console.log('[seed] register_entry already has rows; skipping seed')
    await pool.end()
    return
  }

  await pool.query(
    `insert into register_entry (type, visibility, title, summary, "references", authority_role, authority_subject)
     values ($1,$2,$3,$4,$5::jsonb,$6,$7)`,
    [
      'FOUNDING_NOTICE',
      'public',
      'Founding Notice',
      'The Ardtire Civic Platform register has been constituted for the recording of official acts.',
      JSON.stringify([{ kind: 'system', ref: 'seed:0001' }]),
      'admin',
      'seed',
    ],
  )

  await pool.query(
    `insert into audit_event (action, target_type, meta)
     values ($1,$2,$3::jsonb)`,
    ['REGISTER_SEED', 'register_entry', JSON.stringify({ seed: true })],
  )

  console.log('[seed] inserted initial register_entry + audit_event')
  await pool.end()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
