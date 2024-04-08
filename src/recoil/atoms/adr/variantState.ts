import { atom } from 'recoil'
import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<VCard.AdrVariant>('adr/variant')

const variantState = atom<VCard.AdrVariant>({
  key: 'adr/variant',
  default: 'plainText',
  effects: [persist, restore],
})

export default variantState
