import type { GlobalConfig } from 'payload'
import { allowAll } from '../access/roles'
import { writeAdminPlus } from '../access/write'
import { visibilityField } from '../collections/_fields'

export const SiteSettings: GlobalConfig = {
  slug: 'siteSettings',
  access: {
    read: allowAll,
    update: writeAdminPlus,
  },
  fields: [
    { name: 'siteName', type: 'text', required: true, defaultValue: 'Ardtire Society' },
    { name: 'domainFamily', type: 'text', required: true, defaultValue: 'ardtire.org' },
    {
      name: 'navigation',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        visibilityField({ required: true, defaultValue: 'public' }),
        { name: 'order', type: 'number', required: true, defaultValue: 0 },
      ],
    },
    {
      name: 'footer',
      type: 'array',
      fields: [
        { name: 'groupLabel', type: 'text', required: true },
        {
          name: 'links',
          type: 'array',
          fields: [
            { name: 'label', type: 'text', required: true },
            { name: 'href', type: 'text', required: true },
            visibilityField({ required: true, defaultValue: 'public' }),
          ],
        },
      ],
    },
    {
      name: 'seoDefaults',
      type: 'group',
      fields: [
        { name: 'titleTemplate', type: 'text', defaultValue: '%s — Ardtire Society' },
        { name: 'description', type: 'textarea' },
        { name: 'socialImage', type: 'relationship', relationTo: 'media' },
      ],
    },
    {
      name: 'analytics',
      type: 'group',
      fields: [
        { name: 'matomoSiteId', type: 'text' },
        { name: 'enabled', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'branding',
      type: 'group',
      fields: [
        { name: 'primaryColor', type: 'text' },
        { name: 'accentColor', type: 'text' },
        { name: 'notes', type: 'textarea' },
      ],
    },
  ],
}
