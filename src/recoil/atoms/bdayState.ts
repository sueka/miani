import { atom } from 'recoil'

import isIso8601Date from '../../lib/Iso8601DateTime/isIso8601Date'
import assert from '../../lib/assert'
import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<Temporal.PlainDate | null>('bday', {
  deserialize(text) {
    return JSON.parse(text, (key, value: Json) => {
      if (key === 'bday') {
        assert(value === null || typeof value === 'string')
        assert(value === null || isIso8601Date(value))

        return value !== null
          ? Temporal.PlainDate.from(value, { overflow: 'reject' })
          : null
      }

      return value
    })
  },
})

const bdayState = atom<Temporal.PlainDate | null>({
  key: 'bday',
  default: null,
  effects: [persist, restore],
})

export default bdayState
