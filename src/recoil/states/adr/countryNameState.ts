import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('adr/countryName', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'adr/countryName' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const countryNameState = atom<string | null>({
  key: 'adr/countryName',
  default: null,
  effects: [persist, restore],
})

export default countryNameState
