/// <reference path="../../../VCard.d.ts" />

import { atom } from 'recoil'

const variantState = atom<VCard.NVariant>({
  key: 'n/variant',
  default: 'plain',
})

export default variantState
