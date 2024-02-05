import { DefaultValue, selector } from 'recoil'

import fnState from '../atoms/fnState'

const vCardState = selector<VCard.VCard>({
  key: 'vCard',
  get({ get }) {
    const fn = get(fnState)

    return {
      fn,
    }
  },
  set({ set }, newVCard) {
    if (newVCard instanceof DefaultValue) {
      throw new Error('DefaultValue not supported.')
    }

    // TODO: Validate {newVCard} if needed

    set(fnState, newVCard.fn)
  },
})

export default vCardState
