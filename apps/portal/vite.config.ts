import { defineConfig } from 'vite'
import solid from 'vite-plugin-solid'
import tailwind from '@tailwindcss/vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  plugins: [tailwind(), tsconfigPaths(), solid()],
})
