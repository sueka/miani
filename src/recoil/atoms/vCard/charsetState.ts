import { atom } from 'recoil'
import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<VCard.Charset | null>(
  'vCard/charset',
  {
    serialize(value) {
      return JSON.stringify(value, (key, value) => {
        if (key === 'vCard/charset' && value === null) {
          return // omit
        }

        return value
      })
    },
  },
)

export default atom({
  key: 'vCard/charset',
  default: 'UTF-8' as const,
  effects: [persist, restore],
})
