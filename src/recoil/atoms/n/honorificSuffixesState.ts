import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[] | null>('n/honorificSuffixes')

const honorificSuffixesState = atom<string[] | null>({
  key: 'n/honorificSuffixes',
  default: null,
  effects: [persist, restore],
})

export default honorificSuffixesState
