import { selector } from 'recoil'

import validatedFnState from './validatedFnState'
import validatedNState from './validatedNState'

const validatedVCardObjectState = selector<Validated<VCard.VCard>>({
  key: 'validatedVCardObject',
  get({ get }) {
    const fn = get(validatedFnState)
    const n = get(validatedNState)

    const vCard: VCard.VCard = {
      fn: fn.value,
      n: n.value,
    }

    // TODO: Perform additional validation if needed

    return {
      value: vCard,
      valid: fn.valid && n.valid,
    }
  },
})

export default validatedVCardObjectState
