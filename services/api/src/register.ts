import type { createRegisterEntry as _c, listRegisterEntries as _l } from '@ardtire/db'
export { listRegisterEntries, createRegisterEntry } from '@ardtire/db'

export type WhoAmI = { sub: string; roles: string[] } | null
