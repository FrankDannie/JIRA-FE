import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import SignupPage from '../../pages/SignupPage'
import '../../styles/auth.module.scss'
import { userEvent, within } from '@storybook/testing-library'

export default {
  title: 'Pages/SignupPage',
  component: SignupPage,
  decorators: [(Story) => <Story />],
} as Meta<typeof SignupPage>

const Template: StoryFn = () => <SignupPage />

export const Default = {
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement)

    await step('Enter credentials', async () => {
      await userEvent.type(canvas.getByLabelText('Username'), 'testuser')
      await userEvent.type(canvas.getByLabelText('Password'), 'password123')
      await userEvent.type(canvas.getByLabelText('Email'), 'test@mail.com')
    })

    await step('Submit form', async () => {
      await userEvent.click(canvas.getByRole('button', { name: /submit/i }))
    })
  },
}
