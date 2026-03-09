import type { CollectionConfig } from 'payload'
import { readByVisibility } from '../access/visibility'
import { writeOfficerPlus } from '../access/write'

export const Documents: CollectionConfig = {
  slug: 'documents',
  admin: { useAsTitle: 'title', defaultColumns: ['docType', 'title', 'status', 'classification', 'updatedAt'] },
  access: {
    read: readByVisibility('classification'),
    create: writeOfficerPlus,
    update: writeOfficerPlus,
    delete: writeOfficerPlus,
  },
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
    { name: 'file', type: 'relationship', relationTo: 'media', required: true },
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
