import { atomFamily } from 'recoil'

import makePersist, { compareKeys } from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('any/name', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (compareKeys(key, 'any/name') && value === null) {
        return // omit
      }

      return value
    })
  },
})

const anyNameState = atomFamily<string | null, string>({
  key: 'any/name',
  default: null,
  effects: [persist, restore],
})

export default anyNameState
