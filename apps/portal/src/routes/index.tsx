import { createFileRoute } from '@tanstack/solid-router'
import { Button } from '@ardtire/ui'

export const Route = createFileRoute('/')({
  component: Home,
})

function Home() {
  return (
    <main class="min-h-dvh bg-zinc-950 text-zinc-50">
      <div class="mx-auto max-w-5xl px-6 py-16">
        <header class="space-y-4">
          <p class="text-xs uppercase tracking-[0.2em] text-zinc-400">Ardtire Society</p>
          <h1 class="text-4xl font-semibold tracking-tight">Member Portal</h1>
          <p class="max-w-2xl text-zinc-300">
            Foundation scaffold. Authentication and access control will be integrated in the Keycloak step.
          </p>
        </header>

        <section class="mt-10 flex flex-wrap gap-3">
          <Button variant="default">Continue</Button>
          <Button variant="outline">Review</Button>
          <Button variant="ghost">View Register</Button>
        </section>
      </div>
    </main>
  )
}
