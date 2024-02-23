import { atom } from 'recoil'
import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<boolean>('bday/noYear')

const noYearState = atom({
  key: 'bday/noYear',
  default: true,
  effects: [persist, restore],
})

export default noYearState
