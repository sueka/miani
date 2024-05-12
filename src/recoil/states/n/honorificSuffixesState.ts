import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[] | null>(
  'n/honorificSuffixes',
  {
    serialize(value) {
      return JSON.stringify(value, (key, value) => {
        if (key === 'n/honorificSuffixes' && value === null) {
          return // omit
        }

        return value
      })
    },
  },
)

const honorificSuffixesState = atom<string[] | null>({
  key: 'n/honorificSuffixes',
  default: null,
  effects: [persist, restore],
})

export default honorificSuffixesState
