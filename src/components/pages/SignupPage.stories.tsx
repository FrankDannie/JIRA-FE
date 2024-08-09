import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import SignupPage from '../../pages/SignupPage'
import '../../styles/auth.module.scss'

const meta: Meta<typeof SignupPage> = {
  title: 'Pages/SignupPage',
  component: SignupPage,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const Template: StoryFn = (args: any) => <SignupPage {...args} />

export const Default = Template.bind({})
Default.args = {}
