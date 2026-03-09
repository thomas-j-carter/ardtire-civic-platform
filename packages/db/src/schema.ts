import { pgTable, text, timestamp, uuid, jsonb, integer } from 'drizzle-orm/pg-core'
import { sql } from 'drizzle-orm'

export const auditEvent = pgTable('audit_event', {
  id: uuid('id').primaryKey().defaultRandom(),
  ts: timestamp('ts', { withTimezone: true }).notNull().defaultNow(),
  actorSub: text('actor_sub'), // Keycloak subject (nullable for system events)
  actorRoles: text('actor_roles').array(),
  action: text('action').notNull(), // e.g., REGISTER_CREATE
  targetType: text('target_type'), // e.g., register_entry
  targetId: uuid('target_id'),
  meta: jsonb('meta').notNull().default(sql`'{}'::jsonb`),
})

export const registerEntry = pgTable('register_entry', {
  id: uuid('id').primaryKey().defaultRandom(),
  timestamp: timestamp('timestamp', { withTimezone: true }).notNull().defaultNow(),
  type: text('type').notNull(),
  visibility: text('visibility').notNull(), // public | member | confidential
  title: text('title'),
  summary: text('summary'),
  references: jsonb('references').notNull().default(sql`'[]'::jsonb`),
  authorityRole: text('authority_role'),
  authoritySubject: text('authority_subject'),
  auditHash: text('audit_hash'),
  auditSignature: text('audit_signature'),

  // Cursor pagination helper (monotonic enough for now)
  seq: integer('seq').notNull().default(sql`nextval('register_entry_seq')`),
})
