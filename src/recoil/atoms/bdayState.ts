import { atom } from 'recoil'
import { Temporal } from 'temporal-polyfill'

import isIso8601Date from '../../lib/Iso8601DateTime/isIso8601Date'
import isIso8601DateTime from '../../lib/Iso8601DateTime/isIso8601DateTime'
import toPlainDate from '../../lib/Temporal/toPlainDate'
import assert from '../../lib/assert'
import makeMigration from '../effects/makeMigration'
import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<Temporal.PlainDate | null>('bday', {
  deserialize(text) {
    return JSON.parse(text, (key, value: Json) => {
      if (key === 'bday') {
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
})

const { migrate } = makeMigration(
  'bday',
  ({ bday }: { bday: Date | Temporal.PlainDate | null }) => {
    if (bday instanceof Date) {
      return { bday: toPlainDate(bday) }
    }

    return { bday }
  },
  {
    oldDeserialize(text) {
      return JSON.parse(text, (key, value: Json) => {
        if (key === 'bday') {
          if (value === null) {
            return null
          }

          assert(typeof value === 'string')

          if (isIso8601DateTime(value)) {
            return new Date(value) // then migrated thereafter
          }

          if (isIso8601Date(value)) {
            return Temporal.PlainDate.from(value)
          }
        }

        return value
      })
    },
  },
)

const bdayState = atom<Temporal.PlainDate | null>({
  key: 'bday',
  default: null,
  effects: [persist, restore, migrate],
})

export default bdayState
