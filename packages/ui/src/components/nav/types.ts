export type NavVisibility = 'public' | 'member' | 'admin' | 'internal'

export type NavItem = {
  label: string
  href?: string
  description?: string
  visibility?: NavVisibility
  children?: NavItem[]
}

// Normalize items so we never set optional props to `undefined` under exactOptionalPropertyTypes.
export function normalizeNavItems(items: NavItem[]): NavItem[] {
  return items.map((it) => {
    const base: NavItem = {
      label: it.label,
      ...(it.href ? { href: it.href } : {}),
      ...(it.description ? { description: it.description } : {}),
      ...(it.visibility ? { visibility: it.visibility } : {}),
      ...(it.children && it.children.length > 0 ? { children: normalizeNavItems(it.children) } : {}),
    }
    return base
  })
}
