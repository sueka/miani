import { DefaultValue, selector } from 'recoil'
import { v4 } from 'uuid'
import assert from '../../../lib/assert'
import exit from '../../../lib/exit'
import anyIdsState from '../../atoms/any/anyIdsState'
import anyTypeState from '../../atoms/any/anyTypeState'

export default selector<string[]>({
  key: 'any/types',
  get({ get }) {
    const anyIds = get(anyIdsState)
    const anyTypes = anyIds.map((id) => get(anyTypeState(id)))

    return anyTypes
  },
  set({ get, set }, newAnyTypes) {
    if (newAnyTypes instanceof DefaultValue) {
      throw new Error('DefaultValue not supported.')
    }

    const anyIds = get(anyIdsState)
    const anyTypes = anyIds.map((id) => get(anyTypeState(id)))

    assert(hasNoDuplicates(anyTypes))
    assert(hasNoDuplicates(newAnyTypes))

    for (const anyType of anyTypes) {
      if (!newAnyTypes.includes(anyType)) {
        const deletingAnyId =
          anyIds.find((id) => get(anyTypeState(id)) === anyType) ?? exit()

        set(anyIdsState, (oldAnyIds) =>
          oldAnyIds.filter((id) => id !== deletingAnyId),
        )
      }
    }

    for (const newAnyType of newAnyTypes) {
      if (!anyTypes.includes(newAnyType)) {
        const addingAnyId = v4()

        set(anyIdsState, (oldAnyIds) => [...oldAnyIds, addingAnyId])
        set(anyTypeState(addingAnyId), newAnyType)
        // set(anyState(addingAnyId), null)
      }
    }
  },
})

// TODO: Remove
function hasNoDuplicates(xs: unknown[]): boolean {
  return xs.length === Array.from(new Set(xs)).length
}
