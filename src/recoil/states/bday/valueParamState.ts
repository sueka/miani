import { atom } from 'recoil'
import makePersist from '../../effects/makePersist'

const { persist, restore } =
  makePersist<NonNullable<VCard.Bday['valueParam']>>('bday/value-param')

export default atom<NonNullable<VCard.Bday['valueParam']>>({
  key: 'bday/value-param',
  default: 'date-and-or-time',
  effects: [persist, restore],
})
