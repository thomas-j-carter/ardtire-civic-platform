// apps/cms/src/payload/content-model.ts
// NOTE: This is the “normal” format for Payload: TypeScript collection/global configs.
// You can split these into separate files later (recommended). For now, everything is in one place.

import type { CollectionConfig, GlobalConfig } from 'payload'

// ------------------------------
// Shared helpers
// ------------------------------

type Visibility = 'public' | 'member' | 'confidential'
type Status = 'draft' | 'review' | 'published'
type DocStatus = 'draft' | 'review' | 'published' | 'sealed'
type InstrumentStatus = 'draft' | 'review' | 'ratified' | 'sealed'

const visibilityField = (overrides: Partial<any> = {}) => ({
  name: 'visibility',
  type: 'select',
  required: true,
  defaultValue: 'public',
  options: [
    { label: 'Public', value: 'public' },
    { label: 'Member', value: 'member' },
    { label: 'Confidential', value: 'confidential' },
  ],
  ...overrides,
})

const statusField = (overrides: Partial<any> = {}) => ({
  name: 'status',
  type: 'select',
  required: true,
  defaultValue: 'draft',
  options: [
    { label: 'Draft', value: 'draft' },
    { label: 'Review', value: 'review' },
    { label: 'Published', value: 'published' },
  ],
  ...overrides,
})

const slugField = (overrides: Partial<any> = {}) => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  admin: { position: 'sidebar' },
  ...overrides,
})

const scheduledPublishFields = () => [
  {
    name: 'publishedAt',
    type: 'date',
    admin: { position: 'sidebar' },
  },
  {
    name: 'scheduledPublishAt',
    type: 'date',
    admin: { position: 'sidebar' },
  },
]

// ------------------------------
// 1) Media
// ------------------------------

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    // Placeholder access policy; refine with Keycloak integration.
    read: () => true,
  },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'kind', 'sensitivity', 'updatedAt'],
  },
  upload: true,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'alt', type: 'text' }, // required for images later via conditional
    { name: 'caption', type: 'richText' },
    { name: 'credit', type: 'text' },
    {
      name: 'license',
      type: 'select',
      defaultValue: 'unknown',
      options: [
        { label: 'Public Domain', value: 'public-domain' },
        { label: 'CC BY', value: 'cc-by' },
        { label: 'CC BY-SA', value: 'cc-by-sa' },
        { label: 'Proprietary', value: 'proprietary' },
        { label: 'Unknown', value: 'unknown' },
      ],
    },
    {
      name: 'kind',
      type: 'select',
      required: true,
      defaultValue: 'image',
      options: [
        { label: 'Image', value: 'image' },
        { label: 'PDF', value: 'pdf' },
        { label: 'Audio', value: 'audio' },
        { label: 'Video', value: 'video' },
        { label: 'Other', value: 'other' },
      ],
    },
    {
      name: 'tags',
      type: 'array',
      fields: [{ name: 'tag', type: 'text', required: true }],
    },
    {
      name: 'sensitivity',
      type: 'select',
      required: true,
      defaultValue: 'public',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Member', value: 'member' },
        { label: 'Confidential', value: 'confidential' },
      ],
    },
    { name: 'checksum', type: 'text' },
  ],
}

// ------------------------------
// 2) Taxonomies
// ------------------------------

export const Taxonomies: CollectionConfig = {
  slug: 'taxonomies',
  admin: { useAsTitle: 'title', defaultColumns: ['type', 'title', 'slug', 'updatedAt'] },
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Topic', value: 'topic' },
        { label: 'Category', value: 'category' },
        { label: 'Series', value: 'series' },
        { label: 'Keyword', value: 'keyword' },
      ],
    },
    { name: 'title', type: 'text', required: true },
    slugField(),
    { name: 'description', type: 'richText' },
    {
      name: 'parent',
      type: 'relationship',
      relationTo: 'taxonomies',
    },
  ],
}

// ------------------------------
// 3) People
// ------------------------------

export const People: CollectionConfig = {
  slug: 'people',
  admin: { useAsTitle: 'displayName', defaultColumns: ['displayName', 'shortName', 'updatedAt'] },
  fields: [
    { name: 'displayName', type: 'text', required: true },
    { name: 'shortName', type: 'text' },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      options: [
        { label: 'Crown', value: 'crown' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Officer', value: 'officer' },
        { label: 'Moderator', value: 'moderator' },
      ],
    },
    { name: 'bio', type: 'richText' },
    { name: 'avatar', type: 'relationship', relationTo: 'media' },
    {
      name: 'externalRefs',
      type: 'json',
      admin: { description: 'External IDs (Keycloak sub, Decidim user ID, etc.)' },
    },
  ],
}

// ------------------------------
// 4) siteSettings (Global singleton)
// ------------------------------

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Ardtire Society' },
    { name: 'domainFamily', type: 'text', required: true, defaultValue: 'ardtire.org' },
    {
      name: 'navigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        visibilityField({ required: true, defaultValue: 'public' }),
        { name: 'order', type: 'number', required: true, defaultValue: 0 },
      ],
    },
    {
      name: 'footer',
      type: 'array',
      fields: [
        { name: 'groupLabel', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
            visibilityField({ required: true, defaultValue: 'public' }),
          ],
        },
      ],
    },
    {
      name: 'seoDefaults',
      type: 'group',
      fields: [
        { name: 'titleTemplate', type: 'text', defaultValue: '%s — Ardtire Society' },
        { name: 'description', type: 'textarea' },
        { name: 'socialImage', type: 'relationship', relationTo: 'media' },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        { name: 'matomoSiteId', type: 'text' },
        { name: 'enabled', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'branding',
      type: 'group',
      fields: [
        { name: 'primaryColor', type: 'text' },
        { name: 'accentColor', type: 'text' },
        { name: 'notes', type: 'textarea' },
      ],
    },
  ],
}

// ------------------------------
// 5) Pages
// ------------------------------

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'status', 'visibility', 'updatedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    statusField(),
    visibilityField(),
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        {
          slug: 'richText',
          fields: [{ name: 'content', type: 'richText', required: true }],
        },
        {
          slug: 'callout',
          fields: [
            { name: 'title', type: 'text' },
            { name: 'content', type: 'richText', required: true },
          ],
        },
        {
          slug: 'quote',
          fields: [
            { name: 'quote', type: 'textarea', required: true },
            { name: 'attribution', type: 'text' },
          ],
        },
        {
          slug: 'image',
          fields: [
            { name: 'image', type: 'relationship', relationTo: 'media', required: true },
            { name: 'caption', type: 'text' },
          ],
        },
        {
          slug: 'documentLink',
          fields: [{ name: 'document', type: 'relationship', relationTo: 'documents', required: true }],
        },
        {
          slug: 'registerLink',
          fields: [{ name: 'registerEntry', type: 'relationship', relationTo: 'registerEntries', required: true }],
        },
      ],
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'description', type: 'textarea' },
        { name: 'canonical', type: 'text' },
      ],
    },
    ...scheduledPublishFields(),
    { name: 'authors', type: 'relationship', relationTo: 'people', hasMany: true },
    { name: 'topics', type: 'relationship', relationTo: 'taxonomies', hasMany: true },
  ],
}

// ------------------------------
// 6) Articles
// ------------------------------

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: { useAsTitle: 'title', defaultColumns: ['type', 'title', 'status', 'visibility', 'publishedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      name: 'type',
      type: 'select',
      required: true,
      defaultValue: 'essay',
      options: [
        { label: 'Essay', value: 'essay' },
        { label: 'Position Paper', value: 'position-paper' },
        { label: 'Announcement', value: 'announcement' },
        { label: 'Bulletin', value: 'bulletin' },
      ],
    },
    { name: 'deck', type: 'textarea' },
    statusField(),
    visibilityField(),
    { name: 'heroImage', type: 'relationship', relationTo: 'media' },
    {
      name: 'body',
      type: 'richText',
      required: true,
    },
    {
      name: 'attachments',
      type: 'array',
      fields: [
        { name: 'asset', type: 'relationship', relationTo: 'media', required: true },
        { name: 'label', type: 'text' },
      ],
    },
    { name: 'authors', type: 'relationship', relationTo: 'people', hasMany: true },
    { name: 'topics', type: 'relationship', relationTo: 'taxonomies', hasMany: true },
    ...scheduledPublishFields(),
  ],
}

// ------------------------------
// 7) Documents
// ------------------------------

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: { useAsTitle: 'title', defaultColumns: ['docType', 'title', 'status', 'classification', 'updatedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'slug', type: 'text', unique: true },
    {
      name: 'docType',
      type: 'select',
      required: true,
      options: [
        { label: 'Founding Instrument', value: 'founding-instrument' },
        { label: 'Policy', value: 'policy' },
        { label: 'Minutes', value: 'minutes' },
        { label: 'Report', value: 'report' },
        { label: 'Legal', value: 'legal' },
        { label: 'Archive', value: 'archive' },
      ],
    },
    {
      name: 'classification',
      type: 'select',
      required: true,
      defaultValue: 'public',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Member', value: 'member' },
        { label: 'Confidential', value: 'confidential' },
        { label: 'Secret', value: 'secret' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Review', value: 'review' },
        { label: 'Published', value: 'published' },
        { label: 'Sealed', value: 'sealed' },
      ],
    },
    {
      name: 'file',
      type: 'relationship',
      relationTo: 'media',
      required: true,
    },
    { name: 'textExtract', type: 'textarea' },
    { name: 'effectiveDate', type: 'date' },
    { name: 'supersedes', type: 'relationship', relationTo: 'documents' },
    { name: 'supersededBy', type: 'relationship', relationTo: 'documents' },
    { name: 'topics', type: 'relationship', relationTo: 'taxonomies', hasMany: true },
    { name: 'authority', type: 'relationship', relationTo: 'people' },
    { name: 'versionLabel', type: 'text' },
    { name: 'immutableAfterPublish', type: 'checkbox', defaultValue: true },
  ],
}

// ------------------------------
// 8) Register Entries
// ------------------------------

export const RegisterEntries: CollectionConfig = {
  slug: 'registerEntries',
  admin: { useAsTitle: 'title', defaultColumns: ['entryType', 'title', 'visibility', 'timestamp', 'updatedAt'] },
  fields: [
    {
      name: 'entryType',
      type: 'select',
      required: true,
      options: [
        { label: 'Founding Notice', value: 'founding-notice' },
        { label: 'Governance Outcome', value: 'governance-outcome' },
        { label: 'Instrument Sealed', value: 'instrument-sealed' },
        { label: 'Policy Issued', value: 'policy-issued' },
        { label: 'Membership Act', value: 'membership-act' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'timestamp', type: 'date', required: true },
    visibilityField(),
    { name: 'title', type: 'text' },
    { name: 'summary', type: 'textarea' },
    {
      name: 'references',
      type: 'array',
      fields: [
        {
          name: 'kind',
          type: 'select',
          required: true,
          options: [
            { label: 'Decidim', value: 'decidim' },
            { label: 'Document', value: 'document' },
            { label: 'Membership', value: 'membership' },
            { label: 'Internal', value: 'internal' },
          ],
        },
        { name: 'ref', type: 'text', required: true },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'authorityRole',
      type: 'select',
      options: [
        { label: 'Crown', value: 'crown' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Officer', value: 'officer' },
      ],
    },
    { name: 'authorityPerson', type: 'relationship', relationTo: 'people' },
    { name: 'relatedDocument', type: 'relationship', relationTo: 'documents' },
    { name: 'relatedArticle', type: 'relationship', relationTo: 'articles' },
    { name: 'auditMeta', type: 'json' },
  ],
}

// ------------------------------
// 9) Member Profiles (Keycloak sub is canonical link)
// ------------------------------

export const MemberProfiles: CollectionConfig = {
  slug: 'memberProfiles',
  admin: { useAsTitle: 'displayName', defaultColumns: ['displayName', 'tier', 'standing', 'updatedAt'] },
  fields: [
    { name: 'keycloakSub', type: 'text', required: true, unique: true },
    { name: 'displayName', type: 'text' },
    { name: 'email', type: 'email' },
    {
      name: 'tier',
      type: 'select',
      required: true,
      defaultValue: 'associate',
      options: [
        { label: 'Associate', value: 'associate' },
        { label: 'Member', value: 'member' },
        { label: 'Founding Member', value: 'founding-member' },
        { label: 'Officer', value: 'officer' },
      ],
    },
    {
      name: 'standing',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'classificationClearance',
      type: 'select',
      required: true,
      defaultValue: 'member',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Member', value: 'member' },
        { label: 'Confidential', value: 'confidential' },
        { label: 'Secret', value: 'secret' },
      ],
    },
    { name: 'joinedAt', type: 'date' },
    {
      name: 'badges',
      type: 'array',
      fields: [{ name: 'badge', type: 'text', required: true }],
    },
    {
      name: 'directoryVisibility',
      type: 'select',
      defaultValue: 'hidden',
      options: [
        { label: 'Hidden', value: 'hidden' },
        { label: 'Members Only', value: 'members-only' },
        { label: 'Opt-in', value: 'opt-in' },
      ],
    },
    {
      name: 'notes',
      type: 'textarea',
      admin: { description: 'Admin-only notes' },
    },
  ],
}

// ------------------------------
// 10) Membership Applications
// ------------------------------

export const MembershipApplications: CollectionConfig = {
  slug: 'membershipApplications',
  admin: { useAsTitle: 'applicantEmail', defaultColumns: ['applicantEmail', 'status', 'updatedAt'] },
  fields: [
    { name: 'applicantEmail', type: 'email', required: true },
    { name: 'applicantName', type: 'text', required: true },
    { name: 'motivation', type: 'richText', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'submitted',
      options: [
        { label: 'Submitted', value: 'submitted' },
        { label: 'Under Review', value: 'under-review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Withdrawn', value: 'withdrawn' },
      ],
    },
    { name: 'reviewNotes', type: 'textarea' },
    { name: 'decisionAt', type: 'date' },
    { name: 'createdProfile', type: 'relationship', relationTo: 'memberProfiles' },
  ],
}

// ------------------------------
// 11) Governance Process Catalog (Decidim mapping)
// ------------------------------

export const GovernanceProcessCatalog: CollectionConfig = {
  slug: 'governanceProcessCatalog',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    visibilityField({ defaultValue: 'member' }),
    { name: 'decidimProcessId', type: 'text', required: true },
    { name: 'description', type: 'richText' },
    {
      name: 'phases',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'start', type: 'date' },
        { name: 'end', type: 'date' },
      ],
    },
    { name: 'eligibilityPolicy', type: 'json' },
    { name: 'registerOnOutcome', type: 'checkbox', defaultValue: true },
  ],
}

// ------------------------------
// 12) Governance Outcome Mirror
// ------------------------------

export const GovernanceOutcomeMirror: CollectionConfig = {
  slug: 'governanceOutcomeMirror',
  admin: { useAsTitle: 'title', defaultColumns: ['kind', 'title', 'passed', 'effectiveDate'] },
  fields: [
    { name: 'decidimOutcomeId', type: 'text', required: true, unique: true },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Proposal', value: 'proposal' },
        { label: 'Vote', value: 'vote' },
        { label: 'Consultation', value: 'consultation' },
      ],
    },
    { name: 'title', type: 'text', required: true },
    { name: 'resultSummary', type: 'textarea' },
    { name: 'passed', type: 'checkbox', defaultValue: false },
    { name: 'effectiveDate', type: 'date' },
    { name: 'registerEntry', type: 'relationship', relationTo: 'registerEntries' },
  ],
}

// ------------------------------
// 13) Constitutional Instruments (Drafting workspace)
// ------------------------------

export const ConstitutionalInstruments: CollectionConfig = {
  slug: 'constitutionalInstruments',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'status', 'classification', 'updatedAt'] },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    {
      name: 'classification',
      type: 'select',
      required: true,
      defaultValue: 'confidential',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Member', value: 'member' },
        { label: 'Confidential', value: 'confidential' },
        { label: 'Secret', value: 'secret' },
      ],
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'draft',
      options: [
        { label: 'Draft', value: 'draft' },
        { label: 'Review', value: 'review' },
        { label: 'Ratified', value: 'ratified' },
        { label: 'Sealed', value: 'sealed' },
      ],
    },
    { name: 'body', type: 'richText', required: true },
    {
      name: 'changeLog',
      type: 'array',
      fields: [
        { name: 'timestamp', type: 'date', required: true },
        { name: 'authorPerson', type: 'relationship', relationTo: 'people' },
        { name: 'authorProfile', type: 'relationship', relationTo: 'memberProfiles' },
        { name: 'note', type: 'text', required: true },
      ],
    },
    { name: 'sealedDocument', type: 'relationship', relationTo: 'documents' },
    { name: 'sealRegisterEntry', type: 'relationship', relationTo: 'registerEntries' },
  ],
}

// ------------------------------
// Export bundle for Payload config consumption
// ------------------------------

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