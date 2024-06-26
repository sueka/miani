import { day, month, year } from '../lib/Iso8601DateTime/isIso8601Date'
import assert from '../lib/assert'
import r from '../lib/tags/r'
import areComponentsOmitted from './areComponentsOmitted'

const dateGrouped = r`^(?<year>${year})-?(?<month>${month})-?(?<day>${day})$`

export default function* vCard3Lines(
  vCardObject: VCard.VCard,
  options?: Partial<VCard.Options>,
) {
  yield 'BEGIN:VCARD'
  yield `VERSION:${vCardObject.version}`

  const { noYear = false } = options ?? {}

  if (vCardObject.fn !== '') {
    yield `FN:${vCardObject.fn}`
  }

  if (!areComponentsOmitted(vCardObject.n)) {
    yield `N:${vCardObject.n}`
  }

  if (vCardObject.bday !== null) {
    const { value } = vCardObject.bday

    if (!noYear) {
      yield `BDAY:${value.toString()}`
    } else {
      // TODO: Do it in more normal ways
      const matched = value.toString().match(dateGrouped)
      assert(matched?.groups !== undefined)

      const { month, day } = matched.groups

      // TODO: Support for non-Apple devices
      yield `BDAY;X-APPLE-OMIT-YEAR=1604:1604-${month}-${day}`
    }
  }

  if (vCardObject.adr !== null) {
    yield `ADR:${vCardObject.adr}`
  }

  if (vCardObject.tels !== null) {
    for (const tel of vCardObject.tels) {
      let params = ''

      if (tel.types.length !== 0) {
        params += `;TYPE=${tel.types.join(',')}`
      }

      yield `TEL${params}:${tel.value}`
    }
  }

  for (const [name, value] of Object.entries(vCardObject.x)) {
    if (value === '') {
      continue
    }

    yield `${name}:${value}`
  }

  for (const { name: type, value } of vCardObject.any) {
    if (value === '') {
      continue
    }

    yield `${type}:${value}`
  }

  yield 'END:VCARD'
}
