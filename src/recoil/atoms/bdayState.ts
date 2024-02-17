import { atom } from 'recoil'

import isIso8601DateTime from '../../lib/Iso8601DateTime/isIso8601DateTime'
import assert from '../../lib/assert'
import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<Date | null>('bday', {
  deserialize(text) {
    return JSON.parse(text, (key, value: unknown) => {
      if (key === 'bday') {
        assert(typeof value === 'string' || value === null)
        assert(value === null || isIso8601DateTime(value))

        return value?.toDate()
      }

      return value
    })
  },
})

const bdayState = atom<Date | null>({
  key: 'bday',
  default: null,
  effects: [persist, restore],
})

export default bdayState
