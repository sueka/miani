import { atomFamily } from 'recoil'
import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('x/value')

export default atomFamily({
  key: 'x/value',
  default: null,
  effects: [persist, restore],
})
