import { type RecoilState, selector } from 'recoil'
import compact from '../../lib/compact'
import anyIdsState from '../atoms/any/anyIdsState'
import anyNameState from '../atoms/any/anyNameState'
import anyValueState from '../atoms/any/anyValueState'
import sharedState from '../atoms/sharedState'

export default selector({
  key: 'any',
  get({ get }) {
    const getOrNull = <T>(state: RecoilState<T>) =>
      get(sharedState(state.key)) ? get(state) : null

    const anyIds = get(anyIdsState)

    return compact(
      anyIds.map<VCard.Line | null>((id) => {
        const name = get(anyNameState(id))
        const value = getOrNull(anyValueState(id))

        return name !== null && value !== null
          ? { name, params: [], value }
          : null
      }),
    )
  },
})
