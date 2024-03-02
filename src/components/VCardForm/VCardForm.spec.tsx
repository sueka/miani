import { expect, setSystemTime, test } from 'bun:test'
import { MantineProvider } from '@mantine/core'
import { render } from 'react-dom'
import { IntlProvider } from 'react-intl'
import { RecoilRoot } from 'recoil'

import VCardForm from './VCardForm'

// TODO: Setup babel-plugin-formatjs to resume it!
test.skip('<VCardForm>', () => {
  setSystemTime(new Date('2006-01-02T15:04:05Z'))

  render(
    <MantineProvider>
      <RecoilRoot>
        <IntlProvider locale="en">
          <VCardForm />
        </IntlProvider>
      </RecoilRoot>
    </MantineProvider>,
    document.body,
  )

  expect(document.body.innerHTML).toMatchSnapshot()
})
