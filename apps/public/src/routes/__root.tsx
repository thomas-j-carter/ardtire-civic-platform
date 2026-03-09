import { createRootRoute, Outlet } from '@tanstack/solid-router'
import appCss from '../styles.css?url'
import { SiteHeader } from '@ardtire/ui'
import { NAV_PUBLIC } from '@ardtire/ui'

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
        mode="public"
        nav={NAV_PUBLIC}
        right={{
          signedIn: false,
          onSignIn: () => (window.location.href = 'http://localhost:3001/'),
        }}
      />
      <Outlet />
    </>
  )
}
