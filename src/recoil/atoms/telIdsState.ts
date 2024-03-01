import { atom } from 'recoil'
import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<string[]>('telIds')

const telIdsState = atom({
  key: 'telIds',
  default: [],
  effects: [persist, restore],
})

export default telIdsState
