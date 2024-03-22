import { atomFamily } from 'recoil'
import makePersist, { compareKeys } from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('x/value', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (compareKeys(key, 'x/value') && value === null) {
        return // omit
      }

      return value
    })
  },
})

export default atomFamily({
  key: 'x/value',
  default: null,
  effects: [persist, restore],
})
