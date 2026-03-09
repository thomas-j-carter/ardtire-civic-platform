import { createFileRoute } from '@tanstack/solid-router'
import { Button } from '@ardtire/ui'
import { apiFetch } from '../lib/platformApi'

export const Route = createFileRoute('/')({
  beforeLoad: async () => {
    const res = await apiFetch('/auth/whoami')
    if (res.status === 401) {
      window.location.href = '/auth/login'
      return
    }
    // If whoami fails, treat as unauth
    if (!res.ok) {
      window.location.href = '/auth/login'
    }
  },
  component: Home,
})

function Home() {
  return (
    <main class="min-h-dvh bg-zinc-950 text-zinc-50">
      <div class="mx-auto max-w-5xl px-6 py-16 space-y-8">
        <header class="space-y-3">
          <p class="text-xs uppercase tracking-[0.2em] text-zinc-400">Ardtire Society</p>
          <h1 class="text-4xl font-semibold tracking-tight">Member Portal</h1>
          <p class="max-w-2xl text-zinc-300">Authenticated surface (Keycloak via Platform API session).</p>
        </header>

        <nav class="flex flex-wrap gap-3">
          <Button variant="default" onClick={() => (window.location.href = '/auth/logout')}>Logout</Button>
          <Button variant="outline">Directory</Button>
          <Button variant="ghost">Register</Button>
        </nav>
      </div>
    </main>
  )
}
