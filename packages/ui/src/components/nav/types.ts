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
    .map((i) => ({
      ...i,
      children: i.children ? filterNav(i.children, mode) : undefined,
    }))
    .filter((i) => (i.children ? i.children.length > 0 || i.href : true))
}
