import { createRootRoute, Outlet } from '@tanstack/solid-router'
import appCss from '../styles.css?url'
import { SiteHeader } from '@ardtire/ui'
import { NAV_ADMIN, NAV_PUBLIC } from '@ardtire/ui'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: Root,
})

function Root() {
  return (
    <>
      <SiteHeader
        mode="admin"
        nav={[...NAV_ADMIN, ...NAV_PUBLIC]}
        right={{
          signedIn: true,
          userLabel: 'Admin',
          onSignOut: () => (window.location.href = '/auth/logout'),
        }}
      />
      <Outlet />
    </>
  )
}
