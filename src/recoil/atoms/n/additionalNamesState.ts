import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[] | null>('n/additionalNames')

const additionalNamesState = atom<string[] | null>({
  key: 'n/additionalNames',
  default: null,
  effects: [persist, restore],
})

export default additionalNamesState
