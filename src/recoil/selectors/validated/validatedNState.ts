import { selector } from 'recoil'

import r from '../../../lib/tags/r'
import { nValue } from '../../../patterns'
import nState from '../../atoms/nState'

const validatedNState = selector<Validated<string>>({
  key: 'validatedN',
  get({ get }) {
    const n = get(nState)

    return {
      value: n,
      valid: r`^${nValue}$`.test(n),
    }
  },
})

export default validatedNState
