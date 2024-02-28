import { atomFamily } from 'recoil'

import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<string | null>('any')

const anyState = atomFamily<string | null, string>({
  key: 'any',
  default: null,
  effects: [persist, restore],
})

export default anyState
