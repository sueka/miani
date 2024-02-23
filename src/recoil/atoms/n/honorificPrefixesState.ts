import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[] | null>('n/honorificPrefixes')

const honorificPrefixesState = atom<string[] | null>({
  key: 'n/honorificPrefixes',
  default: null,
  effects: [persist, restore],
})

export default honorificPrefixesState
