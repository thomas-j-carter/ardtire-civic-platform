import type { CollectionConfig } from 'payload'
import { readByVisibility } from '../access/visibility'
import { writeAdminPlus } from '../access/write'

export const RegisterEntries: CollectionConfig = {
  slug: 'registerEntries',
  admin: { useAsTitle: 'title', defaultColumns: ['entryType', 'title', 'visibility', 'timestamp', 'updatedAt'] },
  access: {
    read: readByVisibility('visibility'),
    // Strict: only admin/crown can create register entries in CMS.
    // (Your Platform API also supports this; later we’ll unify.)
    create: writeAdminPlus,
    update: writeAdminPlus,
    delete: writeAdminPlus,
  },
  fields: [
    {
      name: 'entryType',
      type: 'select',
      required: true,
      options: [
        { label: 'Founding Notice', value: 'founding-notice' },
        { label: 'Governance Outcome', value: 'governance-outcome' },
        { label: 'Instrument Sealed', value: 'instrument-sealed' },
        { label: 'Policy Issued', value: 'policy-issued' },
        { label: 'Membership Act', value: 'membership-act' },
        { label: 'Other', value: 'other' },
      ],
    },
    { name: 'timestamp', type: 'date', required: true },
    {
      name: 'visibility',
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
    { name: 'title', type: 'text' },
    { name: 'summary', type: 'textarea' },
    {
      name: 'references',
      type: 'array',
      fields: [
        {
          name: 'kind',
          type: 'select',
          required: true,
          options: [
            { label: 'Decidim', value: 'decidim' },
            { label: 'Document', value: 'document' },
            { label: 'Membership', value: 'membership' },
            { label: 'Internal', value: 'internal' },
          ],
        },
        { name: 'ref', type: 'text', required: true },
        { name: 'label', type: 'text' },
      ],
    },
    {
      name: 'authorityRole',
      type: 'select',
      options: [
        { label: 'Crown', value: 'crown' },
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Officer', value: 'officer' },
      ],
    },
    { name: 'authorityPerson', type: 'relationship', relationTo: 'people' },
    { name: 'relatedDocument', type: 'relationship', relationTo: 'documents' },
    { name: 'relatedArticle', type: 'relationship', relationTo: 'articles' },
    { name: 'auditMeta', type: 'json' },
  ],
}
