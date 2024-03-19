import { type RecoilState, selector } from 'recoil'
import compact from '../../lib/compact'
import anyState from '../atoms/any/anyState'
import anyTypesState from '../atoms/any/anyTypesState'
import sharedState from '../atoms/sharedState'

export default selector({
  key: 'any',
  get({ get }) {
    const getOrNull = <T>(state: RecoilState<T>) =>
      get(sharedState(state.key)) ? get(state) : null

    const anyTypes = get(anyTypesState)

    return Object.fromEntries(
      compact(
        anyTypes.map<[string, string] | null>((type) => {
          const any = getOrNull(anyState(type))

          return any !== null ? [type, any] : null
        }),
      ),
    )
  },
})
