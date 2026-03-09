import { createSignal, For, Show } from 'solid-js'
import type { NavItem, NavVisibility } from './nav/types'
import { filterNav } from './nav/types'
import { cn } from '../lib/cn'
import { Button } from './Button'

type Props = {
  mode: NavVisibility
  nav: NavItem[]
  right?: {
    signedIn?: boolean
    onSignIn?: () => void
    onSignOut?: () => void
    userLabel?: string
  }
  class?: string
}

export function SiteHeader(props: Props) {
  const [open, setOpen] = createSignal<string | null>(null)
  const items = () => filterNav(props.nav, props.mode)

  const close = () => setOpen(null)

  const onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') close()
  }

  return (
    <header class={cn('border-b border-zinc-800 bg-zinc-950 text-zinc-50', props.class)} onKeyDown={onKeyDown}>
      <div class="mx-auto max-w-6xl px-6 py-5 flex items-center justify-between gap-6">
        <a href="/" class="flex items-baseline gap-3">
          <span class="text-sm uppercase tracking-[0.25em] text-zinc-400">Ardtire</span>
          <span class="text-base font-semibold tracking-tight">Society</span>
        </a>

        <nav class="hidden md:flex items-center gap-6">
          <For each={items()}>
            {(item) => (
              <div
                class="relative"
                onMouseEnter={() => item.children && setOpen(item.label)}
                onMouseLeave={() => setOpen((v) => (v === item.label ? null : v))}
              >
                <a
                  href={item.href ?? '#'}
                  class="text-sm text-zinc-200 hover:text-white transition"
                  onClick={(e) => {
                    if (item.children) {
                      e.preventDefault()
                      setOpen((v) => (v === item.label ? null : item.label))
                    }
                  }}
                >
                  {item.label}
                </a>

                <Show when={item.children && open() === item.label}>
                  <div class="absolute left-0 mt-3 w-[560px] rounded-2xl border border-zinc-800 bg-zinc-950/95 shadow-xl">
                    <div class="grid grid-cols-2 gap-4 p-5">
                      <For each={item.children ?? []}>
                        {(child) => (
                          <a
                            href={child.href ?? '#'}
                            class="rounded-xl border border-transparent p-3 hover:border-zinc-800 hover:bg-zinc-900/40 transition"
                            onClick={() => close()}
                          >
                            <div class="text-sm font-semibold text-zinc-100">{child.label}</div>
                            <Show when={child.description}>
                              <div class="mt-1 text-xs text-zinc-400">{child.description}</div>
                            </Show>
                          </a>
                        )}
                      </For>
                    </div>
                  </div>
                </Show>
              </div>
            )}
          </For>
        </nav>

        <div class="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={() => (window.location.href = '/register')}>
            Register
          </Button>
          <Show
            when={props.right?.signedIn}
            fallback={
              <Button variant="outline" size="sm" onClick={() => props.right?.onSignIn?.()}>
                Sign in
              </Button>
            }
          >
            <Button variant="outline" size="sm" onClick={() => props.right?.onSignOut?.()}>
              {props.right?.userLabel ?? 'Account'}
            </Button>
          </Show>
        </div>
      </div>
    </header>
  )
}
