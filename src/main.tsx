import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.layer.css'
import { render } from 'react'
import { RecoilRoot } from 'recoil'

import App from './App'
import exit from './lib/exit'

render(
  <MantineProvider defaultColorScheme="auto">
    <RecoilRoot>
      <App />
    </RecoilRoot>
  </MantineProvider>,
  document.getElementById('app') ?? exit(),
)
