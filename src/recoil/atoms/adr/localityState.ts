import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('adr/locality', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'adr/locality' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const localityState = atom<string | null>({
  key: 'adr/locality',
  default: null,
  effects: [persist, restore],
})

export default localityState
