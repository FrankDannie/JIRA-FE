import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import LoginPage from '../../pages/LoginPage'
import '../../styles/auth.module.scss'

const meta: Meta<typeof LoginPage> = {
  title: 'Pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const Template: StoryFn = (args: any) => <LoginPage {...args} />

export const Default = Template.bind({})
Default.args = {}
