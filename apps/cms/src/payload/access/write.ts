import type { Access } from 'payload'
import { allowRoles } from './roles'

// Write access baseline: editors+ can write; admin/crown for sensitive collections.
export const writeEditorPlus: Access = allowRoles(['editor', 'admin', 'crown'])
export const writeOfficerPlus: Access = allowRoles(['officer', 'admin', 'crown'])
export const writeAdminPlus: Access = allowRoles(['admin', 'crown'])
