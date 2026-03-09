import { createRouter } from '@tanstack/solid-router'
import { routeTree } from './routeTree.gen'

// Create a new router instance
export const router = createRouter({ routeTree })

// Register router type for TS inference
declare module '@tanstack/solid-router' {
  interface Register {
    router: typeof router
  }
}
