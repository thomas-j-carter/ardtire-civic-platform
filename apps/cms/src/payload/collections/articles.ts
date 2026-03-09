import type { CollectionConfig } from 'payload'
import { readByVisibility } from '../access/visibility'
import { writeEditorPlus } from '../access/write'
import { slugField, statusField, visibilityField, scheduledPublishFields } from './_fields'

export const Articles: CollectionConfig = {
  slug: 'articles',
  admin: { useAsTitle: 'title', defaultColumns: ['type', 'title', 'status', 'visibility', 'publishedAt'] },
  access: {
    read: readByVisibility('visibility'),
    create: writeEditorPlus,
    update: writeEditorPlus,
    delete: writeEditorPlus,
  },
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
    { name: 'body', type: 'richText', required: true },
    {
      name: 'attachments',
      type: 'array',
      fields: [{ name: 'asset', type: 'relationship', relationTo: 'media', required: true }, { name: 'label', type: 'text' }],
    },
    { name: 'authors', type: 'relationship', relationTo: 'people', hasMany: true },
    { name: 'topics', type: 'relationship', relationTo: 'taxonomies', hasMany: true },
    ...scheduledPublishFields(),
  ],
}
