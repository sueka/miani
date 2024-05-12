import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('adr/rest', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'adr/rest' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const restState = atom<string | null>({
  key: 'adr/rest',
  default: null,
  effects: [persist, restore],
})

export default restState
