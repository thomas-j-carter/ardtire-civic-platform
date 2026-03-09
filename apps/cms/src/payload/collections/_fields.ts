/**
 * Payload v3 uses discriminated unions for Field types.
 * If `type` gets widened to `string`, TS assumes the wrong union member.
 * These helpers force literal `type` values and then return `any` to keep ergonomics.
 */

export const slugField = (overrides: Record<string, any> = {}) =>
  ({
    name: 'slug',
    type: 'text' as const,
    required: true,
    unique: true,
    admin: { position: 'sidebar' as const },
    ...overrides,
  }) as any

export const visibilityField = (overrides: Record<string, any> = {}) =>
  ({
    name: 'visibility',
    type: 'select' as const,
    required: true,
    defaultValue: 'public',
    options: [
      { label: 'Public', value: 'public' },
      { label: 'Member', value: 'member' },
      { label: 'Confidential', value: 'confidential' },
      { label: 'Secret', value: 'secret' },
    ],
    ...overrides,
  }) as any

export const statusField = (overrides: Record<string, any> = {}) =>
  ({
    name: 'status',
    type: 'select' as const,
    required: true,
    defaultValue: 'draft',
    options: [
      { label: 'Draft', value: 'draft' },
      { label: 'Review', value: 'review' },
      { label: 'Published', value: 'published' },
    ],
    ...overrides,
  }) as any

export const scheduledPublishFields = () =>
  ([
    { name: 'publishedAt', type: 'date' as const, admin: { position: 'sidebar' as const } },
    { name: 'scheduledPublishAt', type: 'date' as const, admin: { position: 'sidebar' as const } },
  ]) as any
