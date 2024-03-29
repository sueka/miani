import r from '../tags/r'

const year = /\d{4}/
const month = /0[1-9]|1[0-2]/
const day = /0[1-9]|[12]\d|3[0-1]/
const hour = /[0-1]\d|2[0-3]/
const minute = /[0-5]\d/
const second = /[0-5]\d/ // doesn't accept leap seconds.
const milliseconds = /\d+/
const offset = r`${hour}(?::?${minute})?`
const date = r`${year}-${month}-${day}`
const time = r`T${hour}:${minute}(?::${second}(?:.${milliseconds})?)?` // If you omit seconds, you must also omit milliseconds.
const timeZone = r`Z|[+-]${offset}`
const dateTime = r`${date}${time}${timeZone}`

/**
 * Tests if `text` is an ISO 8601 full date and time.
 */
export default function isIso8601DateTime(
  text: string,
): text is Iso8601DateTime {
  return r`^${dateTime}$`.test(text)
}
