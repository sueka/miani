export default function* vCardLines(vCardObject: VCard.VCard) {
  yield 'BEGIN:VCARD'
  yield 'VERSION:3.0'

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

    yield `BDAY:${plain.toString()}`
  }

  yield 'END:VCARD'
}
