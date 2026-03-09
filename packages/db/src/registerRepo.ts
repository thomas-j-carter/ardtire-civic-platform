import { desc, lt } from 'drizzle-orm'
import { createDb } from './db.js'
import { auditEvent, registerEntry } from './schema.js'

type WhoAmI = { sub: string; roles: string[] } | null

export async function listRegisterEntries(cursor?: string | null, limit = 25) {
  const db = createDb()
  const lim = Math.max(1, Math.min(100, limit))
  const cursorNum = cursor ? Number(cursor) : null

  const rows = await db
    .select()
    .from(registerEntry)
    .where(cursorNum ? lt(registerEntry.seq, cursorNum) : undefined)
    .orderBy(desc(registerEntry.seq))
    .limit(lim + 1)

  const hasMore = rows.length > lim
  const items = hasMore ? rows.slice(0, lim) : rows
  const nextCursor = hasMore ? String(items[items.length - 1]!.seq) : null

  return {
    items: items.map((r) => ({
      id: r.id,
      timestamp: r.timestamp,
      type: r.type,
      visibility: r.visibility,
      title: r.title ?? null,
      summary: r.summary ?? null,
      references: (r.references as any) ?? [],
      authority: r.authorityRole
        ? { role: r.authorityRole, subject: r.authoritySubject ?? null }
        : null,
      audit:
        r.auditHash || r.auditSignature ? { hash: r.auditHash ?? null, signature: r.auditSignature ?? null } : null,
    })),
    nextCursor,
  }
}

export async function createRegisterEntry(input: any, actor: WhoAmI) {
  const roles = actor?.roles ?? []
  const privileged = roles.includes('admin') || roles.includes('crown')
  if (!privileged) {
    const e = new Error('forbidden')
    ;(e as any).status = 403
    throw e
  }

  const db = createDb()

  const type = String(input?.type ?? '')
  const visibility = String(input?.visibility ?? '')
  const title = input?.title == null ? null : String(input.title)
  const summary = input?.summary == null ? null : String(input.summary)
  const references = Array.isArray(input?.references) ? input.references : []

  if (!type || !visibility) {
    const e = new Error('bad_request')
    ;(e as any).status = 400
    throw e
  }

  const [row] = await db
    .insert(registerEntry)
    .values({
      type,
      visibility,
      title,
      summary,
      references: references as any,
      authorityRole: roles.includes('crown') ? 'crown' : 'admin',
      authoritySubject: actor?.sub ?? null,
    })
    .returning()

  await db.insert(auditEvent).values({
    actorSub: actor?.sub ?? null,
    actorRoles: roles,
    action: 'REGISTER_CREATE',
    targetType: 'register_entry',
    targetId: row!.id,
    meta: { visibility, type },
  } as any)

  return {
    id: row!.id,
    timestamp: row!.timestamp,
    type: row!.type,
    visibility: row!.visibility,
    title: row!.title ?? null,
    summary: row!.summary ?? null,
    references: (row!.references as any) ?? [],
    authority: row!.authorityRole ? { role: row!.authorityRole, subject: row!.authoritySubject ?? null } : null,
    audit: null,
  }
}
