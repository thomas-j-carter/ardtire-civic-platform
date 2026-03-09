import { cn } from '../lib/cn'

export type SiteNavItem = { label: string; href: string }

export function SiteHeader(props: {
  title: string
  items: SiteNavItem[]
  class?: string
}) {
  return (
    <header class={cn('border-b border-zinc-800 bg-zinc-950', props.class)}>
      <div class="mx-auto flex max-w-5xl items-center justify-between gap-6 px-6 py-5">
        <a href="/" class="flex items-baseline gap-3 no-underline">
          <span class="text-xs uppercase tracking-[0.2em] text-zinc-400">Ardtire</span>
          <span class="text-lg font-semibold tracking-tight text-zinc-50">{props.title}</span>
        </a>

        <nav class="flex items-center gap-5">
          {props.items.map((it) => (
            <a
              href={it.href}
              class="text-sm text-zinc-300 hover:text-zinc-50 transition-colors"
            >
              {it.label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  )
}
