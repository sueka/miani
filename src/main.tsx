import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.layer.css'
import { render } from 'react'

import App from './App'
import exit from './lib/exit'

render(
  <MantineProvider defaultColorScheme="auto">
    <App />
  </MantineProvider>,
  document.getElementById('app') ?? exit(),
)
