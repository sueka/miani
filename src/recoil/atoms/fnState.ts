import { atom } from 'recoil'

import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<string>('fn')

const fnState = atom<string>({
  key: 'fn',
  default: '',
  effects: [persist, restore],
})

export default fnState
