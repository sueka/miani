export default function toLegacyDate(date: Temporal.PlainDate): Date {
  return new Date(
    date.toZonedDateTime(Temporal.TimeZone.from('UTC'))
      .epochMilliseconds,
  )
}
