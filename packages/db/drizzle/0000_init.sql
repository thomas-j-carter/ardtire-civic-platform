-- Initial schema for audit_event and register_entry
-- Drizzle migrator will run raw SQL files in order.

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS audit_event (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ts timestamptz NOT NULL DEFAULT now(),
  actor_sub text,
  actor_roles text[],
  action text NOT NULL,
  target_type text,
  target_id uuid,
  meta jsonb NOT NULL DEFAULT '{}'::jsonb
);

CREATE SEQUENCE IF NOT EXISTS register_entry_seq;

CREATE TABLE IF NOT EXISTS register_entry (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "timestamp" timestamptz NOT NULL DEFAULT now(),
  type text NOT NULL,
  visibility text NOT NULL,
  title text,
  summary text,
  "references" jsonb NOT NULL DEFAULT '[]'::jsonb,
  authority_role text,
  authority_subject text,
  audit_hash text,
  audit_signature text,
  seq integer NOT NULL DEFAULT nextval('register_entry_seq')
);
