import { Preview } from '@storybook/react'
import RouterDecorator from './RouterDecorator'

const preview: Preview = {
  decorators: [RouterDecorator],
  parameters: {
    layout: 'fullscreen',
  },
}

export default preview
