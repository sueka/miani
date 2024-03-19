import { atomFamily } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('any/value')

const anyState = atomFamily<string | null, string>({
  key: 'any/value',
  default: null,
  effects: [persist, restore],
})

export default anyState
