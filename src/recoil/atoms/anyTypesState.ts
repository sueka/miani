import { atom } from 'recoil'

import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<string[]>('anyTypes')

const anyTypesState = atom({
  key: 'anyTypes',
  default: [],
  effects: [persist, restore],
})

export default anyTypesState
