import { atom } from 'recoil'

import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('familyName')

const familyNameState = atom<string | null>({
  key: 'familyName',
  default: null,
  effects: [persist, restore],
})

export default familyNameState
