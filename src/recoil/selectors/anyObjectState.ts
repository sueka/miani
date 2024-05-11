import { type RecoilState, selector } from 'recoil'
import compact from '../../lib/compact'
import anyIdsState from '../atoms/any/anyIdsState'
import anyState from '../atoms/any/anyState'
import anyTypeState from '../atoms/any/anyTypeState'
import sharedState from '../atoms/sharedState'

export default selector({
  key: 'any',
  get({ get }) {
    const getOrNull = <T>(state: RecoilState<T>) =>
      get(sharedState(state.key)) ? get(state) : null

    const anyIds = get(anyIdsState)

    return Object.fromEntries(
      compact(
        anyIds.map<[string, string] | null>((id) => {
          const type = get(anyTypeState(id))
          const any = getOrNull(anyState(id))

          return any !== null ? [type, any] : null
        }),
      ),
    )
  },
})
