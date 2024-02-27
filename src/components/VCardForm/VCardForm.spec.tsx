import { expect, setSystemTime, test } from 'bun:test'
import { MantineProvider } from '@mantine/core'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'

import VCardForm from './VCardForm'

test('<VCardForm>', () => {
  setSystemTime(new Date('2006-01-02T15:04:05Z'))

  render(
    <MantineProvider>
      <RecoilRoot>
        <VCardForm />
      </RecoilRoot>
    </MantineProvider>,
    document.body,
  )

  expect(document.body.innerHTML).toMatchSnapshot()
})
