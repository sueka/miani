import { atomFamily } from 'recoil'
import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string[]>('any/param/ids')

export default atomFamily<string[], string>({
  key: 'any/param/ids',
  default: [],
  effects: [persist, restore],
})
