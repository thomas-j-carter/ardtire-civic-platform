import type { NavItem } from './types'

export const NAV_PUBLIC: NavItem[] = [
  {
    label: 'About',
    children: [
      { label: 'Mission & Purpose', href: '/about' },
      { label: 'Values', href: '/about#values' },
      { label: 'Structure', href: '/about#structure' },
      { label: 'Conduct & Standards', href: '/about#conduct' },
    ],
  },
  {
    label: 'Ideas',
    children: [
      { label: 'Essays', href: '/ideas' },
      { label: 'Papers', href: '/ideas/papers' },
      { label: 'Archives', href: '/ideas/archive' },
      { label: 'Editorial Policy', href: '/ideas/editorial' },
    ],
  },
  {
    label: 'Register',
    children: [
      { label: 'Latest Entries', href: '/register' },
      { label: 'By Type', href: '/register#types' },
      { label: 'By Year', href: '/register#years' },
      { label: 'Transparency Notes', href: '/register#notes' },
    ],
  },
  {
    label: 'Governance',
    children: [
      { label: 'How Decisions Are Made', href: '/governance' },
      { label: 'Public Outcomes', href: '/governance/outcomes' },
      { label: 'Processes', href: '/governance/processes' },
      { label: 'Meetings', href: '/governance/meetings' },
    ],
  },
  {
    label: 'Membership',
    children: [
      { label: 'Overview', href: '/membership' },
      { label: 'Tiers & Standing', href: '/membership#tiers' },
      { label: 'Apply', href: '/membership/apply' },
      { label: 'FAQ', href: '/membership/faq' },
    ],
  },
  {
    label: 'Documents',
    children: [
      { label: 'Foundational Instruments', href: '/documents' },
      { label: 'Charter & Policies', href: '/documents/policies' },
      { label: 'Publications Index', href: '/documents/index' },
      { label: 'Version History', href: '/documents/history' },
    ],
  },
]

export const NAV_MEMBER: NavItem[] = [
  { label: 'Dashboard', href: '/', visibility: 'member' },
  {
    label: 'Participate',
    visibility: 'member',
    children: [
      { label: 'Chamber', href: '/participate', visibility: 'member' },
      { label: 'Proposals', href: '/participate/proposals', visibility: 'member' },
      { label: 'Meetings', href: '/participate/meetings', visibility: 'member' },
    ],
  },
  {
    label: 'Library',
    visibility: 'member',
    children: [
      { label: 'Tiered Content', href: '/library', visibility: 'member' },
      { label: 'Reading Lists', href: '/library/lists', visibility: 'member' },
    ],
  },
  { label: 'Register', href: '/register', visibility: 'member' },
  { label: 'My Membership', href: '/membership', visibility: 'member' },
]

export const NAV_ADMIN: NavItem[] = [
  { label: 'Admin Home', href: '/', visibility: 'admin' },
  {
    label: 'Administration',
    visibility: 'admin',
    children: [
      { label: 'Membership Queue', href: '/admin/members', visibility: 'admin' },
      { label: 'Moderation', href: '/admin/moderation', visibility: 'admin' },
      { label: 'Governance Config', href: '/admin/governance', visibility: 'admin' },
      { label: 'Audit Log', href: '/admin/audit', visibility: 'admin' },
      { label: 'Publishing (CMS)', href: '/admin/cms', visibility: 'admin' }
    ],
  },
  { label: 'Register', href: '/register', visibility: 'admin' },
]
