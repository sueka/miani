import { atom } from 'recoil'

const fnState = atom<string>({
  key: 'fn',
  default: '',
})

export default fnState
