export type NavVisibility = 'public' | 'member' | 'admin'

export type NavItem = {
  label: string
  href?: string
  description?: string
  visibility?: NavVisibility
  children?: NavItem[]
}

export function visibleTo(item: NavItem, mode: NavVisibility) {
  const v = item.visibility ?? 'public'
  if (v === 'public') return true
  if (v === 'member') return mode === 'member' || mode === 'admin'
  if (v === 'admin') return mode === 'admin'
  return false
}

function withDefined<T extends object>(base: T, extra: Partial<T>): T {
  // Build object without assigning undefined to optional props
  const out: any = { ...base }
  for (const [k, v] of Object.entries(extra)) {
    if (v !== undefined) out[k] = v
  }
  return out
}

export function filterNav(items: NavItem[], mode: NavVisibility): NavItem[] {
  const filtered = items
    .filter((i) => visibleTo(i, mode))
    .map((i) => {
      const nextChildren = i.children ? filterNav(i.children, mode) : undefined

      const base: NavItem = { label: i.label }
      const withMeta = withDefined(base, {
        href: i.href,
        description: i.description,
        visibility: i.visibility,
      } as any) as NavItem

      return nextChildren && nextChildren.length > 0
        ? withDefined(withMeta, { children: nextChildren } as any)
        : withMeta
    })

  // keep items that have href or (non-empty) children
  return filtered.filter((i) => {
    if ('children' in i && i.children) return i.children.length > 0 || i.href !== undefined
    return i.href !== undefined || true
  })
}
