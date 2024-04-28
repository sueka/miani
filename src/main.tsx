import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.layer.css'
import { DatesProvider } from '@mantine/dates'
import '@mantine/dates/styles.layer.css'
import 'dayjs/locale/ja'
import React, { render } from 'react'
import { IntlProvider } from 'react-intl'
import { RecoilRoot } from 'recoil'
import 'temporal-polyfill/global'

import App from './components/App'
import exit from './lib/exit'
import './main.layer.css'

const locale = new Intl.Locale(navigator.language).language //
const { default: messages } = await loadLocaleData(locale)

const theme = createTheme({
  components: {
    Popover: {
      defaultProps: {
        width: 'fit-content',
      },
    },
  },
})

render(
  <React.StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <RecoilRoot>
        <DatesProvider
          settings={{
            firstDayOfWeek: 0,
            weekendDays: [0],
            locale,
          }}
        >
          <IntlProvider locale={locale} messages={messages}>
            <App />
          </IntlProvider>
        </DatesProvider>
      </RecoilRoot>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('app') ?? exit(),
)

function loadLocaleData(locale: string) {
  switch (locale) {
    case 'en':
      return import('./messages/en.json')
    case 'ja':
      return import('./messages/ja.json')
    default:
      return import('./messages/en.json')
  }
}
