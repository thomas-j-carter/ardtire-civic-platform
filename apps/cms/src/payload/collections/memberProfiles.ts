import type { CollectionConfig } from 'payload'
import { allowRoles } from '../access/roles'
import { writeAdminPlus } from '../access/write'

export const MemberProfiles: CollectionConfig = {
  slug: 'memberProfiles',
  admin: { useAsTitle: 'displayName', defaultColumns: ['displayName', 'tier', 'standing', 'updatedAt'] },
  access: {
    read: allowRoles(['admin', 'crown', 'officer', 'editor']),
    create: writeAdminPlus,
    update: writeAdminPlus,
    delete: writeAdminPlus,
  },
  fields: [
    { name: 'keycloakSub', type: 'text', required: true, unique: true },
    { name: 'displayName', type: 'text' },
    { name: 'email', type: 'email' },
    {
      name: 'tier',
      type: 'select',
      required: true,
      defaultValue: 'associate',
      options: [
        { label: 'Associate', value: 'associate' },
        { label: 'Member', value: 'member' },
        { label: 'Founding Member', value: 'founding-member' },
        { label: 'Officer', value: 'officer' },
      ],
    },
    {
      name: 'standing',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Suspended', value: 'suspended' },
        { label: 'Archived', value: 'archived' },
      ],
    },
    {
      name: 'classificationClearance',
      type: 'select',
      required: true,
      defaultValue: 'member',
      options: [
        { label: 'Public', value: 'public' },
        { label: 'Member', value: 'member' },
        { label: 'Confidential', value: 'confidential' },
        { label: 'Secret', value: 'secret' },
      ],
    },
    { name: 'joinedAt', type: 'date' },
    { name: 'badges', type: 'array', fields: [{ name: 'badge', type: 'text', required: true }] },
    {
      name: 'directoryVisibility',
      type: 'select',
      defaultValue: 'hidden',
      options: [
        { label: 'Hidden', value: 'hidden' },
        { label: 'Members Only', value: 'members-only' },
        { label: 'Opt-in', value: 'opt-in' },
      ],
    },
    { name: 'notes', type: 'textarea' },
  ],
}
