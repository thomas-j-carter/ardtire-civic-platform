import { createFileRoute } from '@tanstack/solid-router'
import { buildLogoutUrl } from '@ardtire/auth'
import { apiFetch } from '../../lib/platformApi'

export const Route = createFileRoute('/auth/logout')({
  beforeLoad: async () => {
    await apiFetch('/auth/session', { method: 'DELETE' })
    window.location.href = buildLogoutUrl('admin')
  },
  component: () => null,
})
