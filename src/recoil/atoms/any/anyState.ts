import { atomFamily } from 'recoil'

import makePersist, { compareKeys } from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('any/value', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (compareKeys(key, 'any/value') && value === null) {
        return // omit
      }

      return value
    })
  },
})

const anyState = atomFamily<string | null, string>({
  key: 'any/value',
  default: null,
  effects: [persist, restore],
})

export default anyState
