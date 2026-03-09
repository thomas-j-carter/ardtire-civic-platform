import type { CollectionConfig } from 'payload'
import { readByVisibility } from '../access/visibility'
import { writeOfficerPlus } from '../access/write'
import { slugField, visibilityField } from './_fields'

export const GovernanceProcessCatalog: CollectionConfig = {
  slug: 'governanceProcessCatalog',
  admin: { useAsTitle: 'title', defaultColumns: ['title', 'slug', 'updatedAt'] },
  access: {
    read: readByVisibility('visibility'),
    create: writeOfficerPlus,
    update: writeOfficerPlus,
    delete: writeOfficerPlus,
  },
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
