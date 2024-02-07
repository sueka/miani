import { DefaultValue, selector } from 'recoil'

import fnState from '../atoms/fnState'
import nState from '../atoms/nState'

const vCardState = selector<VCard.VCard>({
  key: 'vCard',
  get({ get }) {
    const fn = get(fnState)
    const n = get(nState)

    return {
      fn,
      n,
    }
  },

  /**
   * @throws `Error` if you try to set this state to a DefaultValue
   */
  set({ set }, newVCard) {
    if (newVCard instanceof DefaultValue) {
      throw new Error('DefaultValue not supported.')
    }

    // TODO: Validate {newVCard} if needed

    set(fnState, newVCard.fn)
    set(nState, newVCard.n)
  },
})

export default vCardState
