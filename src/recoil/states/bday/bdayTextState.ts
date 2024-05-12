import { atom } from 'recoil'
import makePersist from '../../effects/makePersist'

const { persist, restore } = makePersist<string | null>('bday/text-value', {
  serialize(value) {
    return JSON.stringify(value, (key, value) => {
      if (key === 'bday/text-value' && value === null) {
        return // omit
      }

      return value
    })
  },
})

const bdayTextState = atom<string | null>({
  key: 'bday/text-value',
  default: null,
  effects: [persist, restore],
})

export default bdayTextState
