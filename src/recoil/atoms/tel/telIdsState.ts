import { atom } from 'recoil'
import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[]>('tel/ids')

const telIdsState = atom({
  key: 'tel/ids',
  default: [],
  effects: [persist, restore],
})

export default telIdsState
