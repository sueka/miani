import { selector } from 'recoil'

import r from '../../../lib/tags/r'
import { textValue } from '../../../patterns'
import fnState from '../../atoms/fnState'

const validatedFnState = selector<Validated<string>>({
  key: 'validatedFn',
  get({ get }) {
    const fn = get(fnState)

    return {
      value: fn,
      valid: r`^${textValue}$`.test(fn),
    }
  },
})

export default validatedFnState
