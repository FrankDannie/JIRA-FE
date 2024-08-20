import { Preview } from '@storybook/react'
import RouterDecorator from './RouterDecorator'
import { worker } from '../src/mocks/browser'

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

const preview: Preview = {
  decorators: [RouterDecorator],
  parameters: {
    layout: 'fullscreen',
  },
}

export default preview
