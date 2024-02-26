import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('n/rest')

const restState = atom<string | null>({
  key: 'n/rest',
  default: null,
  effects: [persist, restore],
})

export default restState
