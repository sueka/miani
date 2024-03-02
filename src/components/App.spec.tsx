import { expect, setSystemTime, test } from 'bun:test'
import { MantineProvider } from '@mantine/core'
import { render } from 'react-dom'
import { IntlProvider } from 'react-intl'
import { RecoilRoot } from 'recoil'

import App from './App'

// TODO: Setup babel-plugin-formatjs to resume it!
test.skip('<App>', () => {
  setSystemTime(new Date('2006-01-02T15:04:05Z'))

  render(
    <MantineProvider>
      <RecoilRoot>
        <IntlProvider locale="en">
          <App />
        </IntlProvider>
      </RecoilRoot>
    </MantineProvider>,
    document.body,
  )

  expect(document.body.innerHTML).toMatchSnapshot()
})
