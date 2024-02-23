import { selector } from 'recoil'

import vCardLines from '../../vCardLines'
import noYearState from '../atoms/bday/noYearState'
import vCardObjectState from './vCardObjectState'

// NOTE: The AGENT type can have a text value of a vCard object, where the newline code is LF (%0A) and you MUST backslash-escape LF, comma, semicolon and colon.
const EOL = '\r\n'

const vCardState = selector<string>({
  key: 'vCard',
  get({ get }) {
    const value = get(vCardObjectState)
    const noYear = get(noYearState)

    let vCardBuilder = ''

    for (const line of vCardLines(value, { noYear })) {
      vCardBuilder += line + EOL
    }

    return vCardBuilder
  },
})

export default vCardState
