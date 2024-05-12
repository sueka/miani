import { selectorFamily } from 'recoil'
import xNamesState from './x/xNamesState'
import xState from './x/xState'

export default selectorFamily({
  key: 'x-accessor',
  get:
    (param: string) =>
    ({ get }) =>
      get(xState(param)),
  set:
    (param) =>
    ({ set }, newXValue) => {
      set(xNamesState, (ns) => Array.from(new Set([...ns, param])))
      set(xState(param), newXValue)
    },
})
