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

export function filterNav(items: NavItem[], mode: NavVisibility): NavItem[] {
  return items
    .filter((i) => visibleTo(i, mode))
    .map((i) => {
      const children = i.children ? filterNav(i.children, mode) : undefined
      // IMPORTANT: with exactOptionalPropertyTypes, do not set children: undefined
      return children
        ? { ...i, children }
        : { label: i.label, href: i.href, description: i.description, visibility: i.visibility }
    })
    .filter((i) => (i.children ? i.children.length > 0 || i.href : true))
}
