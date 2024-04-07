import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('n/rest', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'n/rest' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const restState = atom<string | null>({
  key: 'n/rest',
  default: null,
  effects: [persist, restore],
})

export default restState
