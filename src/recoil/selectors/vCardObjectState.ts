import { selector } from 'recoil'

import fnState from '../atoms/fnState'
import nState from '../atoms/nState'

const vCardObjectState = selector<VCard.VCard>({
  key: 'vCardObject',
  get({ get }) {
    const fn = get(fnState)
    const n = get(nState)

    return {
      fn,
      n,
    }
  },
})

export default vCardObjectState
