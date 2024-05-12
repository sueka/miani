import { atom } from 'recoil'
import { Temporal } from 'temporal-polyfill'

import isIso8601Date from '../../../lib/Iso8601DateTime/isIso8601Date'
import isIso8601DateTime from '../../../lib/Iso8601DateTime/isIso8601DateTime'
import assert from '../../../lib/assert'
import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<Temporal.PlainDate | null>(
  'bday/date-and-or-time-value',
  {
    serialize(value) {
      return JSON.stringify(value, (key, value) => {
        if (key === 'bday/date-and-or-time-value' && value === null) {
          return // omit
        }

        return value
      })
    },
    deserialize(text) {
      return JSON.parse(text, (key, value: Json) => {
        if (key === 'bday/date-and-or-time-value') {
          if (value === null) {
            return null
          }

          assert(typeof value === 'string')

          if (isIso8601DateTime(value)) {
            return Temporal.Instant.from(value)
              .toZonedDateTimeISO(Temporal.Now.timeZoneId())
              .toPlainDate()
          }

          if (isIso8601Date(value)) {
            return Temporal.PlainDate.from(value, { overflow: 'reject' })
          }
        }

        return value
      })
    },
  },
)

const bdayDateTimeState = atom<Temporal.PlainDate | null>({
  key: 'bday/date-and-or-time-value',
  default: null,
  effects: [persist, restore],
})

export default bdayDateTimeState
