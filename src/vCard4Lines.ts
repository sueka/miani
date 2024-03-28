import { day, month, year } from './lib/Iso8601DateTime/isIso8601Date'
import assert from './lib/assert'
import r from './lib/tags/r'

const dateGrouped = r`^(?<year>${year})-?(?<month>${month})-?(?<day>${day})$`

export default function* vCard4Lines(
  vCardObject: VCard.VCard,
  options?: Partial<VCard.Options>,
) {
  yield 'BEGIN:VCARD'
  yield `VERSION:${vCardObject.version}` // NOTE: It appears immediately after BEGIN, according to 3.3, RFC 6350.

  const { noYear = false } = options ?? {}

  if (vCardObject.fn !== '') {
    let params = ''

    if (hasNonAscii(vCardObject.fn)) {
      params += ';CHARSET=UTF-8'
    }

    yield `FN${params}:${vCardObject.fn}`
  }

  if (isNOmitted(vCardObject.n)) {
    let params = ''

    if (
      hasNonAscii(vCardObject.x['X-PHONETIC-LAST-NAME']) ||
      hasNonAscii(vCardObject.x['X-PHONETIC-FIRST-NAME']) ||
      hasNonAscii(vCardObject.n)
    ) {
      params += ';CHARSET=UTF-8'
    }

    const sortKeys = [
      vCardObject.x['X-PHONETIC-LAST-NAME'],
      vCardObject.x['X-PHONETIC-FIRST-NAME'],
    ]

    if (sortKeys.some((key) => key !== undefined)) {
      params += `;SORT-AS="${sortKeys.join(',')}"`
    }

    yield `N${params}:${vCardObject.n}`
  }

  if (vCardObject.bday !== null) {
    const { value, valueParam } = vCardObject.bday

    switch (valueParam) {
      case 'date-and-or-time': {
        // TODO: Do it in more normal ways
        const matched = value.toString().match(dateGrouped)
        assert(matched?.groups !== undefined)

        const { year, month, day } = matched.groups

        if (!noYear) {
          yield `BDAY:${year}${month}${day}`
        } else {
          yield `BDAY:--${month}${day}`
        }

        break
      }

      case 'text':
        yield `BDAY;VALUE=text:${value}`
    }
  }

  if (vCardObject.tels !== null) {
    for (const tel of vCardObject.tels) {
      yield `TEL:${tel.value}`
    }
  }

  for (const [name, value] of Object.entries(vCardObject.x)) {
    if (value === '') {
      continue
    }

    if (name === 'X-PHONETIC-LAST-NAME' || name === 'X-PHONETIC-FIRST-NAME') {
      if (isNOmitted(vCardObject.n)) {
        continue // Already used in N
      }
    }

    let params = ''

    if (hasNonAscii(value)) {
      params += ';CHARSET=UTF-8'
    }

    yield `${name}${params}:${value}`
  }

  for (const [type, value] of Object.entries(vCardObject.any)) {
    if (value === '') {
      continue
    }

    let params = ''

    if (hasNonAscii(value)) {
      params += ';CHARSET=UTF-8'
    }

    yield `${type}${params}:${value}`
  }

  yield 'END:VCARD'
}

// TODO: Remove it
// NON-ASCII = UTF8-2 / UTF8-3 / UTF8-4 ; 3.3, RFC 6350
const encoder = new TextEncoder()

function hasNonAscii(text = '') {
  return encoder.encode(text).some((byte) => 0x80 <= byte && byte <= 0xbf)
}

// TODO: Remove it
function isNOmitted(n: string | null) {
  return (
    n !== null && // omitted
    !/^;*$/.test(n) // all components omitted
  )
}
