import { atom } from 'recoil'

import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<string>('n')

const nState = atom<string>({
  key: 'n',
  default: '',
  effects: [persist, restore],
})

export default nState
