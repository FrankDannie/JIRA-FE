import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import Dashboard from '../../pages/Dashboard'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'

export default {
  title: 'Pages/Dashboard',
  component: Dashboard,
  decorators: [(Story) => <Story />],
} as Meta<typeof Dashboard>

const Template: StoryFn<typeof Dashboard> = () => {
  return <Dashboard />
}

export const Default = Template.bind({})

Default.play = async ({ canvasElement, step }: { canvasElement: HTMLElement; step: any }) => {
  const canvas = within(canvasElement)

  // Step 1: Ensure the projects are displayed
  await step('Display projects', async () => {
    const projectCards = await canvas.findAllByText(/Project/i)
    expect(projectCards).toHaveLength(6)
  })

  // Step 2: Open the ProjectForm modal
  await step('Open ProjectForm modal', async () => {
    await userEvent.click(canvas.getByRole('button', { name: /Project/i }))
    expect(canvas.getByText(/Create New Project/i)).toBeInTheDocument()
  })

  // Step 3: Fill in the ProjectForm and submit
  await step('Fill and submit ProjectForm', async () => {
    await userEvent.type(canvas.getByLabelText(/Project Name/i), 'Project Delta')
    await userEvent.type(canvas.getByLabelText(/Description/i), 'This is a description for Project Delta.')
    await userEvent.type(canvas.getByLabelText(/Start Date/i), '2024-08-01')
    await userEvent.type(canvas.getByLabelText(/End Date/i), '2024-12-31')
    await waitFor(() => {
      expect(canvas.getByText(/Create Project/i)).toBeInTheDocument()
    })
  })
}
