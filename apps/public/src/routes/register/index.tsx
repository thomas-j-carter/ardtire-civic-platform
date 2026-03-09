import { createFileRoute } from '@tanstack/solid-router'
import { createResource, For, Show } from 'solid-js'

type RegisterEntry = { id: string; timestamp: string; type: string; visibility: string; title: string | null; summary: string | null }
type RegisterListResponse = { items: RegisterEntry[]; nextCursor: string | null }

async function fetchRegister(): Promise<RegisterListResponse> {
  const res = await fetch('http://localhost:8080/register/entries')
  if (!res.ok) throw new Error('failed')
  return (await res.json()) as RegisterListResponse
}

export const Route = createFileRoute('/register/')({ component: RegisterPage })

function RegisterPage() {
  const [data] = createResource(fetchRegister)
  return (
    <main class="min-h-dvh bg-zinc-950 text-zinc-50">
      <div class="mx-auto max-w-5xl px-6 py-16 space-y-10">
        <header class="space-y-3">
          <p class="text-xs uppercase tracking-[0.2em] text-zinc-400">Public Register</p>
          <h1 class="text-4xl font-semibold tracking-tight">Register</h1>
        </header>

        <Show when={!data.loading} fallback={<p class="text-zinc-300">Loading…</p>}>
          <div class="space-y-4">
            <For each={data()?.items ?? []}>
              {(item) => (
                <article class="rounded-2xl border border-zinc-800 bg-zinc-950/60 p-6">
                  <div class="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 class="text-lg font-semibold">{item.title ?? item.type}</h2>
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
