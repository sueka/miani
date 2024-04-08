import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('adr/extendedAddress', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'adr/extendedAddress' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const extendedAddressState = atom<string | null>({
  key: 'adr/extendedAddress',
  default: null,
  effects: [persist, restore],
})

export default extendedAddressState
