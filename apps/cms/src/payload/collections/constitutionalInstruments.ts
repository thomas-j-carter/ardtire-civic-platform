import type { CollectionConfig } from 'payload'
import { readByVisibility } from '../access/visibility'
import { writeOfficerPlus } from '../access/write'
import { slugField } from './_fields'

export const ConstitutionalInstruments: CollectionConfig = {
  slug: 'constitutionalInstruments',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'status', 'classification', 'updatedAt'] },
  access: {
    read: readByVisibility('classification'),
    create: writeOfficerPlus,
    update: writeOfficerPlus,
    delete: writeOfficerPlus,
  },
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
