import { selector } from 'recoil'

import anyState from '../atoms/anyState'
import anyTypesState from '../atoms/anyTypesState'
import bdayState from '../atoms/bdayState'
import fnState from '../atoms/fnState'
import nState from './nState'

const vCardObjectState = selector<VCard.VCard>({
  key: 'vCardObject',
  get({ get }) {
    const fn = get(fnState)
    const n = get(nState)
    const bday = get(bdayState)
    const anyTypes = get(anyTypesState)
    const any = Object.fromEntries(
      anyTypes.map<[string, string]>((type) => [type, get(anyState(type))]),
    )

    return {
      fn,
      n,
      bday,
      any,
    }
  },
})

export default vCardObjectState
