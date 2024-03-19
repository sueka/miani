import { selector } from 'recoil'

import vCard3Lines from '../../vCard3Lines'
import vCard4Lines from '../../vCard4Lines'
import noYearState from '../atoms/bday/noYearState'
import versionState from '../atoms/vCard/versionState'
import vCardObjectState from './vCardObjectState'

// NOTE: The AGENT type can have a text value of a vCard object, where the newline code is LF (%0A) and you MUST backslash-escape LF, comma, semicolon and colon.
const EOL = '\r\n'

const vCardState = selector<string>({
  key: 'vCard',
  get({ get }) {
    const value = get(vCardObjectState)
    const version = get(versionState)
    const noYear = get(noYearState)

    let vCardBuilder = ''

    switch (version) {
      case '3.0':
        for (const line of vCard3Lines(value, { noYear })) {
          vCardBuilder += line + EOL
        }
        break

      case '4.0':
        for (const line of vCard4Lines(value, { noYear })) {
          vCardBuilder += line + EOL
        }
        break
    }

    return vCardBuilder
  },
})

export default vCardState
