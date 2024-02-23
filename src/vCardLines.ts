import { day, month, year } from './lib/Iso8601DateTime/isIso8601DateTime'
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
    const tz = Temporal.TimeZone.from('UTC')
    const instant = vCardObject.bday.toTemporalInstant()
    const zoned = instant.toZonedDateTimeISO(tz)
    const plain = zoned.toPlainDate()

    if (!noYear) {
      yield `BDAY:${plain.toString()}`
    } else {
      // TODO: Do it in more normal ways
      const matched = plain.toString().match(dateGrouped)
      assert(matched?.groups !== undefined)

      const { month, day } = matched.groups

      yield `BDAY:--${month}-${day}`
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
