import { selector } from 'recoil'

import fnState from '../atoms/fnState'
import versionState from '../atoms/vCard/versionState'
import adrState from './adrState'
import anyObjectState from './anyObjectState'
import bdayState from './bdayState'
import nState from './nState'
import telsState from './telsState'
import xObjectState from './xObjectState'

const vCardObjectState = selector<VCard.VCard>({
  key: 'vCardObject',
  get({ get }) {
    const version = get(versionState)
    const fn = get(fnState)
    const n = get(nState)
    const bday = get(bdayState)
    const adr = get(adrState)
    const tels = get(telsState)
    const x = get(xObjectState)
    const any = get(anyObjectState)

    return {
      version,
      fn,
      n,
      bday,
      adr,
      tels,
      x,
      any,
    }
  },
})

export default vCardObjectState
