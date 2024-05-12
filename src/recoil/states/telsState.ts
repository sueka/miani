import { type RecoilState, selector } from 'recoil'
import compact from '../../lib/compact'
import exit from '../../lib/exit'
import sharedState from './sharedState'
import telIdsState from './tel/telIdsState'
import telState from './tel/telState'

export default selector({
  key: 'tels',
  get({ get }) {
    const getOrNull = <T>(state: RecoilState<T>) =>
      get(sharedState(state.key)) ? get(state) : null

    const telIds = get(telIdsState)

    const tels = compact(
      telIds.map<VCard.Tel | null>((telId) => {
        const tel = getOrNull(telState(telId))
        const types: never[] = [] // TODO

        return tel !== null ? { value: tel, types } : null
      }),
    )

    if (tels.length >= 2) {
      const carTel = tels[0] ?? exit()

      carTel.types.push('pref')
    }

    return tels
  },
})
