import { selector } from 'recoil'

import vCardLines from '../../vCardLines'
import validatedVCardObjectState from './validated/validatedVCardObjectState'

// NOTE: The AGENT type can have a text value of a vCard object, where the newline code is LF (%0A) and you MUST backslash-escape LF, comma, semicolon and colon.
const EOL = '\r\n'

const vCardState = selector<string>({
  key: 'vCard',
  get({ get }) {
    const { value } = get(validatedVCardObjectState)

    let vCardBuilder = ''

    for (const line of vCardLines(value)) {
      vCardBuilder += line + EOL
    }

    return vCardBuilder
  },
})

export default vCardState
