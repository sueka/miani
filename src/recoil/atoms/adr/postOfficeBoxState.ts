import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('adr/postOfficeBox', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'adr/postOfficeBox' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const postOfficeBoxState = atom<string | null>({
  key: 'adr/postOfficeBox',
  default: null,
  effects: [persist, restore],
})

export default postOfficeBoxState
