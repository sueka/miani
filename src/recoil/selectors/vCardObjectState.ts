import { selector } from 'recoil'

import bdayState from '../atoms/bdayState'
import fnState from '../atoms/fnState'
import nState from './nState'

const vCardObjectState = selector<VCard.VCard>({
  key: 'vCardObject',
  get({ get }) {
    const fn = get(fnState)
    const n = get(nState)
    const bday = get(bdayState)

    return {
      fn,
      n,
      bday,
    }
  },
})

export default vCardObjectState
