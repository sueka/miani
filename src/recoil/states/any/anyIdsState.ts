import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[]>('any/ids')

const anyIdsState = atom({
  key: 'any/ids',
  default: [],
  effects: [persist, restore],
})

export default anyIdsState
