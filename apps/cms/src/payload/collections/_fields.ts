export const slugField = (overrides: Partial<any> = {}) => ({
  name: 'slug',
  type: 'text',
  required: true,
  unique: true,
  admin: { position: 'sidebar' },
  ...overrides,
})

export const visibilityField = (overrides: Partial<any> = {}) => ({
  name: 'visibility',
  type: 'select',
  required: true,
  defaultValue: 'public',
  options: [
    { label: 'Public', value: 'public' },
    { label: 'Member', value: 'member' },
    { label: 'Confidential', value: 'confidential' },
    { label: 'Secret', value: 'secret' },
  ],
  ...overrides,
})

export const statusField = (overrides: Partial<any> = {}) => ({
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

export const scheduledPublishFields = () => [
  { name: 'publishedAt', type: 'date', admin: { position: 'sidebar' } },
  { name: 'scheduledPublishAt', type: 'date', admin: { position: 'sidebar' } },
]
