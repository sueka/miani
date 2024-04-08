import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('adr/postalCode', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'adr/postalCode' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const postalCodeState = atom<string | null>({
  key: 'adr/postalCode',
  default: null,
  effects: [persist, restore],
})

export default postalCodeState
