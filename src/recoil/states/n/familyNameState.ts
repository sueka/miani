import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('n/familyName', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'n/familyName' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const familyNameState = atom<string | null>({
  key: 'n/familyName',
  default: null,
  effects: [persist, restore],
})

export default familyNameState
