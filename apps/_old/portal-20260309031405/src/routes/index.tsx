import { createFileRoute } from '@tanstack/solid-router'
import { createResource } from 'solid-js'
import { AuthenticatedHeader, Button } from '@ardtire/ui'
import { apiFetch } from '../lib/platformApi'

type WhoAmI = {
  sub: string
  preferred_username: string | null
  email: string | null
  roles: string[]
}

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const res = await apiFetch('/auth/whoami')
    if (res.status === 401) {
      window.location.href = '/auth/login'
      return
    }
    const me = (await res.json().catch(() => null)) as WhoAmI | null
    if (!me || !Array.isArray(me.roles)) {
      window.location.href = '/auth/login'
    }
  },
  component: Home,
})

function Home() {
  const [me] = createResource(async () => {
    const res = await apiFetch('/auth/whoami')
    if (!res.ok) return null
    return (await res.json()) as WhoAmI
  })

  return (
    <main class="min-h-dvh bg-zinc-950 text-zinc-50">
      <AuthenticatedHeader
        title="Member Portal"
        user={me()}
        onLogout={() => (window.location.href = '/auth/logout')}
        rightSlot={
          <Button variant="ghost" size="sm" onClick={() => (window.location.href = '/')}>
            Home
          </Button>
        }
      />

      <div class="mx-auto max-w-5xl px-6 py-10">
        <section class="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6">
          <p class="text-sm text-zinc-300">
            This is an authenticated shell scaffold. Next steps will add navigation, tiered content access,
            and participation surfaces.
          </p>
        </section>
      </div>
    </main>
  )
}
