import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('adr/region', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'adr/region' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const regionState = atom<string | null>({
  key: 'adr/region',
  default: null,
  effects: [persist, restore],
})

export default regionState
