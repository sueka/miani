import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('n/givenName', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'n/givenName' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const givenNameState = atom<string | null>({
  key: 'n/givenName',
  default: null,
  effects: [persist, restore],
})

export default givenNameState
