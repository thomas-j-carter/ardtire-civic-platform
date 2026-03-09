import { createRootRoute, Outlet } from '@tanstack/solid-router'
import { SiteHeader } from '@ardtire/ui'

export const Route = createRootRoute({
  component: Root,
})

function Root() {
  return (
    <div class="min-h-dvh bg-zinc-950 text-zinc-50">
      <SiteHeader
        title="Ardtire Society"
        items={[
          { label: 'About', href: '/about' },
          { label: 'Register', href: '/register' },
          { label: 'Membership', href: '/apply' },
        ]}
      />
      <Outlet />
      <footer class="border-t border-zinc-800">
        <div class="mx-auto max-w-5xl px-6 py-10 text-sm text-zinc-400">
          © {new Date().getFullYear()} Ardtire Society
        </div>
      </footer>
    </div>
  )
}
