import { atom } from 'recoil'
import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<VCard.Version>('vCard/version')

export default atom({
  key: 'vCard/version',
  default: '3.0' as const,
  effects: [persist, restore],
})
