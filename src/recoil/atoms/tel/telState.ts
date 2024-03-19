import { atomFamily } from 'recoil'
import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('tel/value')

const telState = atomFamily<string | null, string>({
  key: 'tel/value',
  default: null,
  effects: [persist, restore],
})

export default telState
