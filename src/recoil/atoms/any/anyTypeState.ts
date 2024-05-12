import { atomFamily } from 'recoil'

import makePersist, { compareKeys } from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('any/type', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (compareKeys(key, 'any/type') && value === null) {
        return // omit
      }

      return value
    })
  },
})

const anyTypeState = atomFamily<string | null, string>({
  key: 'any/type',
  default: null,
  effects: [persist, restore],
})

export default anyTypeState
