import { selectorFamily } from 'recoil'
import xNamesState from '../atoms/xNamesState'
import xState from '../atoms/xState'

export default selectorFamily({
  key: 'selector/x',
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
