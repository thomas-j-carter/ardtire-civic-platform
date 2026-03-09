import type { CollectionConfig } from 'payload'
import { allowAll } from '../access/roles'
import { writeEditorPlus } from '../access/write'
import { slugField } from './_fields'

export const Taxonomies: CollectionConfig = {
  slug: 'taxonomies',
  admin: { useAsTitle: 'title', defaultColumns: ['type', 'title', 'slug', 'updatedAt'] },
  access: {
    read: allowAll,
    create: writeEditorPlus,
    update: writeEditorPlus,
    delete: writeEditorPlus,
  },
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
    { name: 'parent', type: 'relationship', relationTo: 'taxonomies' },
  ],
}
