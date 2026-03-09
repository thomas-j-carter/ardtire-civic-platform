import type { CollectionConfig } from 'payload'
import { allowAll, allowRoles } from '../access/roles'
import { writeAdminPlus } from '../access/write'

export const MembershipApplications: CollectionConfig = {
  slug: 'membershipApplications',
  admin: { useAsTitle: 'applicantEmail', defaultColumns: ['applicantEmail', 'status', 'updatedAt'] },
  access: {
    // Public can create an application; only admins can read/manage.
    read: allowRoles(['admin', 'crown', 'officer']),
    create: allowAll,
    update: writeAdminPlus,
    delete: writeAdminPlus,
  },
  fields: [
    { name: 'applicantEmail', type: 'email', required: true },
    { name: 'applicantName', type: 'text', required: true },
    { name: 'motivation', type: 'richText', required: true },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'submitted',
      options: [
        { label: 'Submitted', value: 'submitted' },
        { label: 'Under Review', value: 'under-review' },
        { label: 'Approved', value: 'approved' },
        { label: 'Rejected', value: 'rejected' },
        { label: 'Withdrawn', value: 'withdrawn' },
      ],
    },
    { name: 'reviewNotes', type: 'textarea' },
    { name: 'decisionAt', type: 'date' },
    { name: 'createdProfile', type: 'relationship', relationTo: 'memberProfiles' },
  ],
}
