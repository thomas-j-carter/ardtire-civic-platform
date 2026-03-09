import 'dotenv/config'
import express from 'express'
import payload from 'payload'

const app = express()

async function main() {
  await payload.init({
    secret: process.env.PAYLOAD_SECRET ?? 'dev_payload_secret_change_me',
    express: app,
  })

  const port = Number(process.env.CMS_PORT ?? '3003')
  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`[cms] listening on http://localhost:${port}`)
  })
}

main().catch((err) => {
  // eslint-disable-next-line no-console
  console.error(err)
  process.exit(1)
})
