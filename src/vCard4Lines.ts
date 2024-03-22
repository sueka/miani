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
    yield `FN:${vCardObject.fn}`
  }

  if (vCardObject.n !== '') {
    const sortKeys = [
      vCardObject.x['X-PHONETIC-LAST-NAME'],
      vCardObject.x['X-PHONETIC-FIRST-NAME'],
    ]

    if (sortKeys.some((key) => key !== undefined)) {
      yield `N;SORT-AS="${sortKeys.join(',')}":${vCardObject.n}`
    } else {
      yield `N:${vCardObject.n}`
    }
  }

  if (vCardObject.bday !== null) {
    // TODO: Do it in more normal ways
    const matched = vCardObject.bday.toString().match(dateGrouped)
    assert(matched?.groups !== undefined)

    const { year, month, day } = matched.groups

    if (!noYear) {
      yield `BDAY:${year}${month}${day}`
    } else {
      yield `BDAY:--${month}${day}`
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
      continue // Already used in N
    }

    yield `${name}:${value}`
  }

  for (const [type, value] of Object.entries(vCardObject.any)) {
    if (value === '') {
      continue
    }

    yield `${type}:${value}`
  }

  yield 'END:VCARD'
}
