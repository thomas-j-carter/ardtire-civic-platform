import type { CollectionConfig } from 'payload'
import { allowRoles } from '../access/roles'
import { writeOfficerPlus } from '../access/write'

export const GovernanceOutcomeMirror: CollectionConfig = {
  slug: 'governanceOutcomeMirror',
  admin: { useAsTitle: 'title', defaultColumns: ['kind', 'title', 'passed', 'effectiveDate'] },
  access: {
    read: allowRoles(['officer', 'admin', 'crown', 'editor']),
    create: writeOfficerPlus,
    update: writeOfficerPlus,
    delete: writeOfficerPlus,
  },
  fields: [
    { name: 'decidimOutcomeId', type: 'text', required: true, unique: true },
    {
      name: 'kind',
      type: 'select',
      required: true,
      options: [
        { label: 'Proposal', value: 'proposal' },
        { label: 'Vote', value: 'vote' },
        { label: 'Consultation', value: 'consultation' },
      ],
    },
    { name: 'title', type: 'text', required: true },
    { name: 'resultSummary', type: 'textarea' },
    { name: 'passed', type: 'checkbox', defaultValue: false },
    { name: 'effectiveDate', type: 'date' },
    { name: 'registerEntry', type: 'relationship', relationTo: 'registerEntries' },
  ],
}
