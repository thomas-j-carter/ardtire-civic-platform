import type { CollectionConfig } from 'payload'
import { allowAll } from '../access/roles'
import { writeEditorPlus } from '../access/write'

export const People: CollectionConfig = {
  slug: 'people',
  admin: { useAsTitle: 'displayName', defaultColumns: ['displayName', 'shortName', 'updatedAt'] },
  access: {
    read: allowAll,
    create: writeEditorPlus,
    update: writeEditorPlus,
    delete: writeEditorPlus,
  },
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
    { name: 'externalRefs', type: 'json' },
  ],
}
