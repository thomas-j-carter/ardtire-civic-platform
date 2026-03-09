export type ArdtireRole =
  | 'crown'
  | 'admin'
  | 'editor'
  | 'officer'
  | 'founding-member'
  | 'member'
  | 'associate'
  | 'public'

export type Visibility = 'public' | 'member' | 'confidential' | 'secret'

export type RequestUser = {
  sub?: string
  email?: string
  preferred_username?: string
  roles?: string[]
  tier?: string
  clearance?: string
}
