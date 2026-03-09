import type { CollectionConfig } from 'payload'
import { readByVisibility } from '../access/visibility'
import { writeEditorPlus } from '../access/write'
import { slugField, statusField, visibilityField, scheduledPublishFields } from './_fields'

export const Pages: CollectionConfig = {
  slug: 'pages',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'status', 'visibility', 'updatedAt'] },
  access: {
    read: readByVisibility('visibility'),
    create: writeEditorPlus,
    update: writeEditorPlus,
    delete: writeEditorPlus,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    slugField(),
    statusField(),
    visibilityField(),
    {
      name: 'layout',
      type: 'blocks',
      blocks: [
        { slug: 'richText', fields: [{ name: 'content', type: 'richText', required: true }] },
        { slug: 'callout', fields: [{ name: 'title', type: 'text' }, { name: 'content', type: 'richText', required: true }] },
        { slug: 'quote', fields: [{ name: 'quote', type: 'textarea', required: true }, { name: 'attribution', type: 'text' }] },
        { slug: 'image', fields: [{ name: 'image', type: 'relationship', relationTo: 'media', required: true }, { name: 'caption', type: 'text' }] },
        { slug: 'documentLink', fields: [{ name: 'document', type: 'relationship', relationTo: 'documents', required: true }] },
        { slug: 'registerLink', fields: [{ name: 'registerEntry', type: 'relationship', relationTo: 'registerEntries', required: true }] },
      ],
    },
    { name: 'seo', type: 'group', fields: [{ name: 'title', type: 'text' }, { name: 'description', type: 'textarea' }, { name: 'canonical', type: 'text' }] },
    ...scheduledPublishFields(),
    { name: 'authors', type: 'relationship', relationTo: 'people', hasMany: true },
    { name: 'topics', type: 'relationship', relationTo: 'taxonomies', hasMany: true },
  ],
}
