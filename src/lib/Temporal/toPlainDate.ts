// See https://tc39.es/proposal-temporal/docs/cookbook.html

export default function toPlainDate(date: Date): Temporal.PlainDate {
  return date
    .toTemporalInstant()
    .toZonedDateTimeISO(Temporal.Now.timeZoneId())
    .toPlainDate()
}
