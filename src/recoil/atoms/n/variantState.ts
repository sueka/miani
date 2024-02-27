import { atom } from 'recoil'

const variantState = atom<VCard.NVariant>({
  key: 'n/variant',
  default: 'plainText',
})

export default variantState
