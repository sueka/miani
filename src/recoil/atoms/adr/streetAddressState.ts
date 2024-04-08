import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('adr/streetAddress', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'adr/streetAddress' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const streetAddressState = atom<string | null>({
  key: 'adr/streetAddress',
  default: null,
  effects: [persist, restore],
})

export default streetAddressState
