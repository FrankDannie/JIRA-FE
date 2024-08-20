import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import LoginPage from '../../pages/LoginPage'
import { BrowserRouter as Router } from 'react-router-dom'

export default {
  title: 'Pages/LoginPage',
  component: LoginPage,
  decorators: [(Story) => <Story />],
} as Meta<typeof LoginPage>

const Template: StoryFn = () => <LoginPage />

export const Default = {
  play: async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
    const canvas = within(canvasElement)

    await step('Enter credentials', async () => {
      await userEvent.type(canvas.getByLabelText('Username'), 'testuser')
      await userEvent.type(canvas.getByLabelText('Password'), 'password123')
    })

    await step('Check for token in localStorage', async () => {
      await waitFor(() =>
        expect(localStorage.getItem('token')).toBe(
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJmcmFuayIsImV4cCI6MTcyMzM3Nzg0MH0.3nY_IpQAwEFUTLe14-PpXFQnty8rbaufeIJBr8YEN-A',
        ),
      )
    })
  },
}
