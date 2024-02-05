import { expect, test } from 'bun:test'
import { MantineProvider } from '@mantine/core'
import { render } from 'react-dom'
import { RecoilRoot } from 'recoil'

import VCardForm from './VCardForm'

test('<VCardForm>', () => {
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
