import { atomFamily } from 'recoil'

import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<string>('any')

const anyState = atomFamily({
  key: 'any',
  default: '',
  effects: [persist, restore],
})

export default anyState
