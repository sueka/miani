import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[] | null>(
  'n/honorificPrefixes',
  {
    serialize(value) {
      return JSON.stringify(value, (key, value) => {
        if (key === 'n/honorificPrefixes' && value === null) {
          return // omit
        }

        return value
      })
    },
  },
)

const honorificPrefixesState = atom<string[] | null>({
  key: 'n/honorificPrefixes',
  default: null,
  effects: [persist, restore],
})

export default honorificPrefixesState
