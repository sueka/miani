import { type RecoilState, selector } from 'recoil'
import compact from '../../lib/compact'
import sharedState from '../atoms/sharedState'
import telIdsState from '../atoms/tel/telIdsState'
import telState from '../atoms/tel/telState'

export default selector({
  key: 'tels',
  get({ get }) {
    const getOrNull = <T>(state: RecoilState<T>) =>
      get(sharedState(state.key)) ? get(state) : null

    const telIds = get(telIdsState)

    return compact(
      telIds.map<VCard.Tel | null>((telId) => {
        const tel = getOrNull(telState(telId))
        return tel !== null ? { value: tel } : null
      }),
    )
  },
})
