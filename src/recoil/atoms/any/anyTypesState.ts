import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[]>('any/types')

const anyTypesState = atom({
  key: 'any/types',
  default: [],
  effects: [persist, restore],
})

export default anyTypesState
