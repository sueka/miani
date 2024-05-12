import { atomFamily } from 'recoil'
import makePersist, { compareKeys } from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('tel/value', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (compareKeys(key, 'tel/value') && value === null) {
        return // omit
      }

      return value
    })
  },
})

const telState = atomFamily<string | null, string>({
  key: 'tel/value',
  default: null,
  effects: [persist, restore],
})

export default telState
