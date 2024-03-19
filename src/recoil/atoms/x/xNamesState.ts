import { atom } from 'recoil'
import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[]>('x/xNames')

export default atom({
  key: 'x/xNames',
  default: [],
  effects: [persist, restore],
})
