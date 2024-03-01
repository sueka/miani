import { day, month, year } from './lib/Iso8601DateTime/isIso8601Date'
import assert from './lib/assert'
import r from './lib/tags/r'

const dateGrouped = r`^(?<year>${year})-?(?<month>${month})-?(?<day>${day})$`

export default function* vCardLines(
  vCardObject: VCard.VCard,
  options?: Partial<VCard.Options>,
) {
  yield 'BEGIN:VCARD'
  yield 'VERSION:3.0'

  const { noYear = false } = options ?? {}

  if (vCardObject.fn !== '') {
    yield `FN:${vCardObject.fn}`
  }

  if (vCardObject.n !== '') {
    yield `N:${vCardObject.n}`
  }

  if (vCardObject.bday !== null) {
    if (!noYear) {
      yield `BDAY:${vCardObject.bday.toString()}`
    } else {
      // TODO: Do it in more normal ways
      const matched = vCardObject.bday.toString().match(dateGrouped)
      assert(matched?.groups !== undefined)

      const { month, day } = matched.groups

      // TODO: Support for non-Apple devices
      yield `BDAY;X-APPLE-OMIT-YEAR=1604:1604-${month}-${day}`
    }
  }

  if (vCardObject.tels !== null) {
    for (const tel of vCardObject.tels) {
      yield `TEL:${tel.value}`
    }
  }

  for (const [type, value] of Object.entries(vCardObject.any)) {
    if (value === '') {
      continue
    }

    yield `${type}:${value}`
  }

  yield 'END:VCARD'
}
