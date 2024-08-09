import React from 'react'
import { Meta, StoryFn } from '@storybook/react'
import LandingPage from '../../pages/LandingPage'
import '../../styles/landing.module.scss'

const meta: Meta<typeof LandingPage> = {
  title: 'Pages/LandingPage',
  component: LandingPage,
  parameters: {
    layout: 'fullscreen',
  },
}

export default meta

const Template: StoryFn = (args: any) => <LandingPage {...args} />

export const Default = Template.bind({})
Default.args = {}
