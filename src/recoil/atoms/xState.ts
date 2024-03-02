import { atomFamily } from 'recoil'
import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<string | null>('x')

export default atomFamily({
  key: 'x',
  default: null,
  effects: [persist, restore],
})
