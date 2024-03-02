import { atom } from 'recoil'
import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<string[]>('xNames')

export default atom({
  key: 'xNames',
  default: [],
  effects: [persist, restore],
})
