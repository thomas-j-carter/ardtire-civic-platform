import type { Access } from 'payload'
import type { Visibility } from '../types/auth'
import { getUser, hasAnyRole } from './roles'

const VIS_ORDER: Record<Visibility, number> = {
  public: 0,
  member: 1,
  confidential: 2,
  secret: 3,
}

// Placeholder ABAC clearance mapping.
// Later, we’ll derive clearance/tier from Keycloak attributes (or platform DB).
function userClearanceLevel(user: any): number {
  const c = String(user?.clearance ?? user?.classificationClearance ?? 'public') as Visibility
  return VIS_ORDER[c] ?? 0
}

export const readByVisibility = (fieldName: string = 'visibility'): Access => {
  return ({ req }) => {
    const user = getUser(req)

    // Public can read only public docs
    if (!user) return { [fieldName]: { equals: 'public' } }

    // Privileged roles can read all
    if (hasAnyRole(user, ['crown', 'admin', 'editor', 'officer'])) return true

    // Member can read up to their clearance
    const max = userClearanceLevel(user)
    const allowed = Object.entries(VIS_ORDER)
      .filter(([, n]) => n <= max)
      .map(([k]) => k)

    return { [fieldName]: { in: allowed } }
  }
}
