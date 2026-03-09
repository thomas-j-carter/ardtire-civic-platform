import { createFileRoute } from '@tanstack/solid-router'
import { createResource, For, Show } from 'solid-js'
import { AuthenticatedHeader } from '@ardtire/ui'
import { apiFetch } from '../../lib/platformApi'

type RegisterEntry = {
  id: string
  timestamp: string
  type: string
  visibility: string
  title: string | null
  summary: string | null
}

type RegisterListResponse = {
  items: RegisterEntry[]
  nextCursor: string | null
}

async function fetchRegister(): Promise<RegisterListResponse> {
  const res = await apiFetch('/register/entries')
  if (!res.ok) throw new Error('failed')
  return (await res.json()) as RegisterListResponse
}

export const Route = createFileRoute('/register/')({
  component: RegisterPage,
})

function RegisterPage() {
  const [data] = createResource(fetchRegister)

  return (
    <main class="min-h-dvh bg-zinc-950 text-zinc-50">
      <AuthenticatedHeader title="Member Portal" onLogout={() => (window.location.href = '/auth/logout')} />
      <div class="mx-auto max-w-5xl px-6 py-10 space-y-6">
        <h2 class="text-xl font-semibold">Register</h2>

        <Show when={!data.loading} fallback={<p class="text-zinc-300">Loading…</p>}>
          <div class="space-y-4">
            <For each={data()?.items ?? []}>
              {(item) => (
                <article class="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6">
                  <div class="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 class="text-base font-semibold">{item.title ?? item.type}</h3>
                    <time class="text-xs text-zinc-400">{new Date(item.timestamp).toLocaleString()}</time>
                  </div>
                  <p class="mt-2 text-sm text-zinc-300">{item.summary ?? ''}</p>
                </article>
              )}
            </For>
          </div>
        </Show>
      </div>
    </main>
  )
}
