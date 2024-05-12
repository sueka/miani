import { atom } from 'recoil'
import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<VCard.NVariant>('n/variant')

const variantState = atom<VCard.NVariant>({
  key: 'n/variant',
  default: 'plainText',
  effects: [persist, restore],
})

export default variantState
