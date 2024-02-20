import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.layer.css'
import { DatesProvider } from '@mantine/dates'
import '@mantine/dates/styles.layer.css'
import React, { render } from 'react'
import { RecoilRoot } from 'recoil'
import 'temporal-polyfill/global'

import App from './App'
import './lib/Iso8601DateTime/String.prototype.toDate'
import exit from './lib/exit'

render(
  <React.StrictMode>
    <MantineProvider defaultColorScheme="auto">
      <RecoilRoot>
        <DatesProvider
          settings={{
            firstDayOfWeek: 0,
            weekendDays: [0],
            timezone: 'UTC',
          }}
        >
          <App />
        </DatesProvider>
      </RecoilRoot>
    </MantineProvider>
  </React.StrictMode>,
  document.getElementById('app') ?? exit(),
)
