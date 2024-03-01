import { atomFamily } from 'recoil'
import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<string | null>('tel')

const telState = atomFamily<string | null, string>({
  key: 'tel',
  default: null,
  effects: [persist, restore],
})

export default telState
