import { createFileRoute } from '@tanstack/solid-router'

export const Route = createFileRoute('/apply/')({
  component: Apply,
})

function Apply() {
  return (
    <main class="mx-auto max-w-5xl px-6 py-14">
      <h1 class="text-3xl font-semibold tracking-tight">Membership</h1>
      <p class="mt-4 max-w-2xl text-zinc-300">
        Application workflow will be implemented after identity + CMS.
      </p>
    </main>
  )
}
