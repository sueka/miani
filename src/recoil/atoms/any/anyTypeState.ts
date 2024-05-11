import { atomFamily } from 'recoil'

import makePersist, { compareKeys } from '../../effects/makePersist'

const { persist, restore } = makePersist<string>('any/type', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (compareKeys(key, 'any/type') && value === null) {
        return // omit
      }

      return value
    })
  },
})

// with no duplicates
const anyTypeState = atomFamily<string, string>({
  key: 'any/type',
  effects: [persist, restore],
})

export default anyTypeState
