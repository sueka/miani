import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[] | null>('n/additionalNames', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'n/additionalNames' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const additionalNamesState = atom<string[] | null>({
  key: 'n/additionalNames',
  default: null,
  effects: [persist, restore],
})

export default additionalNamesState
