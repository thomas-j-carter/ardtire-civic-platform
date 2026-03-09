import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/about/')({
  component: About,
})

function About() {
  return (
    <main class="mx-auto max-w-5xl px-6 py-14">
      <h1 class="text-3xl font-semibold tracking-tight">About</h1>
      <p class="mt-4 max-w-2xl text-zinc-300">
        Institutional public surface scaffold. Content will be driven by CMS later.
      </p>
    </main>
  )
}
