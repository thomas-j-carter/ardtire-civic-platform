import { createRootRoute, Outlet } from '@tanstack/solid-router'
import appCss from '../styles.css?url'

export const Route = createRootRoute({
  head: () => ({
    links: [{ rel: 'stylesheet', href: appCss }],
  }),
  component: Root,
})

function Root() {
  return <Outlet />
}
