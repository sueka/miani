import { expect, test } from 'bun:test'
import { MantineProvider } from '@mantine/core'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'

import App from './App'

test('<App>', () => {
  render(
    <MantineProvider>
      <RecoilRoot>
        <App />
      </RecoilRoot>
    </MantineProvider>,
    document.body,
  )

  expect(document.body.innerHTML).toMatchSnapshot()
})
