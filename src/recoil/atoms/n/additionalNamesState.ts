import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[] | null>('additionalNames')

const additionalNamesState = atom<string[] | null>({
  key: 'additionalNames',
  default: null,
  effects: [persist, restore],
})

export default additionalNamesState
