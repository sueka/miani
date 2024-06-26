// TBD: To delete this file

import { selector } from 'recoil'
import compact from '../../../lib/compact'
import anyIdsState from './anyIdsState'
import anyNameState from './anyNameState'

export default selector<string[]>({
  key: 'any/types',
  get({ get }) {
    const anyIds = get(anyIdsState)
    const anyNames = anyIds.map((id) => get(anyNameState(id)))

    return compact(anyNames)
  },
})
