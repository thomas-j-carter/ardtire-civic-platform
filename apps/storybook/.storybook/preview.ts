import type { Preview } from 'storybook-solidjs-vite'
import '../src/styles/app.css'

const preview: Preview = {
  parameters: {
    a11y: { test: 'todo' },
    layout: 'centered',
  },
}

export default preview
