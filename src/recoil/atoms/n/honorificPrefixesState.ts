import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[] | null>('honorificPrefixes')

const honorificPrefixesState = atom<string[] | null>({
  key: 'honorificPrefixes',
  default: null,
  effects: [persist, restore],
})

export default honorificPrefixesState
