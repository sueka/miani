import { selector } from 'recoil'

import anyState from '../atoms/anyState'
import bdayState from '../atoms/bdayState'
import fnState from '../atoms/fnState'
import nState from './nState'

const vCardObjectState = selector<VCard.VCard>({
  key: 'vCardObject',
  get({ get }) {
    const fn = get(fnState)
    const n = get(nState)
    const bday = get(bdayState)
    const any = { FOO: get(anyState('FOO')) }

    return {
      fn,
      n,
      bday,
      any,
    }
  },
})

export default vCardObjectState
