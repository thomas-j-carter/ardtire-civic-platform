import type { CollectionConfig, GlobalConfig } from 'payload'

import { Media } from './collections/media'
import { Taxonomies } from './collections/taxonomies'
import { People } from './collections/people'
import { Pages } from './collections/pages'
import { Articles } from './collections/articles'
import { Documents } from './collections/documents'
import { RegisterEntries } from './collections/registerEntries'
import { MemberProfiles } from './collections/memberProfiles'
import { MembershipApplications } from './collections/membershipApplications'
import { GovernanceProcessCatalog } from './collections/governanceProcessCatalog'
import { GovernanceOutcomeMirror } from './collections/governanceOutcomeMirror'
import { ConstitutionalInstruments } from './collections/constitutionalInstruments'

import { SiteSettings } from './globals/siteSettings'

export const collections: CollectionConfig[] = [
  Media,
  Taxonomies,
  People,
  Pages,
  Articles,
  Documents,
  RegisterEntries,
  MemberProfiles,
  MembershipApplications,
  GovernanceProcessCatalog,
  GovernanceOutcomeMirror,
  ConstitutionalInstruments,
]

export const globals: GlobalConfig[] = [SiteSettings]
