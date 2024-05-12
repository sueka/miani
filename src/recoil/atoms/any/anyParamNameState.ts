import { atomFamily } from 'recoil'
import makePersist, { compareKeys } from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('any/param/name', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (compareKeys(key, 'any/param/name') && value === null) {
        return // omit
      }

      return value
    })
  },
})

export default atomFamily<string | null, string>({
  key: 'any/param/name',
  default: null,
  effects: [persist, restore],
})
