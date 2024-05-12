import { type RecoilState, selector } from 'recoil'
import compact from '../../lib/compact'
import sharedState from './sharedState'
import xNamesState from './x/xNamesState'
import xState from './x/xState'

export default selector({
  key: 'xs',
  get({ get }) {
    const getOrNull = <T>(state: RecoilState<T>) =>
      get(sharedState(state.key)) ? get(state) : null

    const xNames = get(xNamesState)

    return Object.fromEntries(
      compact(
        xNames.map((type) => {
          const xValue = getOrNull(xState(type))
          return xValue !== null ? [type, xValue] : null
        }),
      ),
    )
  },
})
