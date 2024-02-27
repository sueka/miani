import { expect, setSystemTime, test } from 'bun:test'
import { MantineProvider } from '@mantine/core'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'

import App from './App'

test('<App>', () => {
  setSystemTime(new Date('2006-01-02T15:04:05Z'))

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
