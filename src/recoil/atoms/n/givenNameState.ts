import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('n/givenName')

const givenNameState = atom<string | null>({
  key: 'n/givenName',
  default: null,
  effects: [persist, restore],
})

export default givenNameState
