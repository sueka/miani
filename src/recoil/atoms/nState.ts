import { atom } from 'recoil'

const nState = atom<string>({
  key: 'n',
  default: '',
})

export default nState
