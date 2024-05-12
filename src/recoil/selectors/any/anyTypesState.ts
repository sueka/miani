// TBD: To delete this file

import { selector } from 'recoil'
import compact from '../../../lib/compact'
import anyIdsState from '../../atoms/any/anyIdsState'
import anyTypeState from '../../atoms/any/anyTypeState'

export default selector<string[]>({
  key: 'any/types',
  get({ get }) {
    const anyIds = get(anyIdsState)
    const anyTypes = anyIds.map((id) => get(anyTypeState(id)))

    return compact(anyTypes)
  },
})
