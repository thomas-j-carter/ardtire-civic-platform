import type { Meta, StoryObj } from 'storybook-solidjs-vite'
import { Button } from '@ardtire/ui'

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Continue',
    variant: 'default',
    size: 'md',
  },
}

export const Outline: Story = {
  args: {
    children: 'Review',
    variant: 'outline',
    size: 'md',
  },
}

export const Ghost: Story = {
  args: {
    children: 'View Record',
    variant: 'ghost',
    size: 'md',
  },
}
