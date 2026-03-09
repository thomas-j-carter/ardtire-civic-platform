import type { JSX } from 'solid-js'
import { cn } from '../lib/cn'
import { Button } from './Button'

export type AuthenticatedHeaderProps = {
  title: string
  user?: {
    preferred_username?: string | null
    email?: string | null
    roles?: string[]
  } | null
  onLogout?: () => void
  rightSlot?: JSX.Element
  class?: string
}

export function AuthenticatedHeader(props: AuthenticatedHeaderProps) {
  const name = () => props.user?.preferred_username ?? props.user?.email ?? 'Member'
  const roles = () => props.user?.roles ?? []

  return (
    <header class={cn('border-b border-zinc-800 bg-zinc-950', props.class)}>
      <div class="mx-auto max-w-5xl px-6 py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div class="space-y-1">
          <p class="text-xs uppercase tracking-[0.2em] text-zinc-400">Ardtire Society</p>
          <h1 class="text-2xl font-semibold tracking-tight text-zinc-50">{props.title}</h1>
          <div class="text-sm text-zinc-300 flex flex-wrap gap-x-3 gap-y-1">
            <span class="text-zinc-200">{name()}</span>
            {roles().length > 0 ? (
              <span class="text-zinc-500">
                · roles: <span class="text-zinc-300">{roles().join(', ')}</span>
              </span>
            ) : null}
          </div>
        </div>

        <div class="flex items-center gap-3">
          {props.rightSlot}
          <Button variant="outline" size="sm" onClick={() => props.onLogout?.()}>
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
