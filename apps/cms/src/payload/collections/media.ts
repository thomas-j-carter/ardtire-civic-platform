import type { CollectionConfig } from 'payload'
import { readByVisibility } from '../access/visibility'
import { writeEditorPlus } from '../access/write'

export const Media: CollectionConfig = {
  slug: 'media',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'kind', 'sensitivity', 'updatedAt'] },
  upload: true,
  access: {
    read: readByVisibility('sensitivity'),
    create: writeEditorPlus,
    update: writeEditorPlus,
    delete: writeEditorPlus,
  },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'alt', type: 'text' },
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
        { label: 'Secret', value: 'secret' },
      ],
    },
    { name: 'checksum', type: 'text' },
  ],
}
