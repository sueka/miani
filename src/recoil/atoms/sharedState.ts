import { atomFamily } from 'recoil'
import makePersist from '../effects/makePersist'

const { persist, restore } = makePersist('shared')

const sharedState = atomFamily({
  key: 'shared',
  default: true,
  effects: [persist, restore],
})

export default sharedState
