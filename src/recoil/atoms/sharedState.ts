import { atomFamily } from 'recoil'
import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist<boolean>('shared')

const sharedState = atomFamily<boolean, string>({
  key: 'shared',
  default: true,
  effects: [persist, restore],
})

export default sharedState
