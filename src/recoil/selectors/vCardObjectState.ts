import { type RecoilState, selector } from 'recoil'

import bdayState from '../atoms/bday/bdayState'
import fnState from '../atoms/fnState'
import sharedState from '../atoms/sharedState'
import versionState from '../atoms/vCard/versionState'
import anyObjectState from './anyObjectState'
import nState from './nState'
import telsState from './telsState'
import xObjectState from './xObjectState'

const vCardObjectState = selector<VCard.VCard>({
  key: 'vCardObject',
  get({ get }) {
    const getOrNull = <T>(state: RecoilState<T>) =>
      get(sharedState(state.key)) ? get(state) : null

    const version = get(versionState)
    const fn = get(fnState)
    const n = get(nState)
    const bday = getOrNull(bdayState)
    const tels = get(telsState)
    const x = get(xObjectState)
    const any = get(anyObjectState)

    return {
      version,
      fn,
      n,
      bday,
      tels,
      x,
      any,
    }
  },
})

export default vCardObjectState
