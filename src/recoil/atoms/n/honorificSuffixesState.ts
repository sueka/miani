import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[] | null>('honorificSuffixes')

const honorificSuffixesState = atom<string[] | null>({
  key: 'honorificSuffixes',
  default: null,
  effects: [persist, restore],
})

export default honorificSuffixesState
