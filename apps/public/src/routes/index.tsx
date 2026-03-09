import { createFileRoute } from '@tanstack/solid-router'
import { Button } from '@ardtire/ui'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main class="mx-auto max-w-5xl px-6 py-16">
      <header class="space-y-4">
        <p class="text-xs uppercase tracking-[0.2em] text-zinc-400">Official Public Site</p>
        <h1 class="text-4xl font-semibold tracking-tight">Ardtire Civic Platform</h1>
        <p class="max-w-2xl text-zinc-300">
          A unified civic operating system for publication, membership, and governance.
        </p>
      </header>

      <section class="mt-10 flex flex-wrap gap-3">
        <Button variant="default" onClick={() => (window.location.href = '/apply')}>Apply</Button>
        <Button variant="outline" onClick={() => (window.location.href = '/about')}>About</Button>
        <Button variant="ghost" onClick={() => (window.location.href = '/register')}>View Register</Button>
      </section>
    </main>
  )
}
