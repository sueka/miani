import { type RecoilState, selector } from 'recoil'

import compact from '../../lib/compact'
import anyState from '../atoms/anyState'
import anyTypesState from '../atoms/anyTypesState'
import bdayState from '../atoms/bdayState'
import fnState from '../atoms/fnState'
import sharedState from '../atoms/sharedState'
import telIdsState from '../atoms/telIdsState'
import telState from '../atoms/telState'
import nState from './nState'

const vCardObjectState = selector<VCard.VCard>({
  key: 'vCardObject',
  get({ get }) {
    const getOrNull = <T>(state: RecoilState<T>) =>
      get(sharedState(state.key)) ? get(state) : null

    const fn = get(fnState)
    const n = get(nState)
    const bday = getOrNull(bdayState)
    const telIds = get(telIdsState)
    const tels = compact(
      telIds.map<VCard.Tel | null>((telId) => {
        const tel = getOrNull(telState(telId))
        return tel !== null ? { value: tel } : null
      }),
    )
    const anyTypes = get(anyTypesState)
    const any = Object.fromEntries(
      compact(
        anyTypes.map<[string, string] | null>((type) => {
          const a = getOrNull(anyState(type))

          return a !== null ? [type, a] : null
        }),
      ),
    )

    return {
      fn,
      n,
      bday,
      tels,
      any,
    }
  },
})

export default vCardObjectState
