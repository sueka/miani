import r from '../tags/r'

export const year = /\d{4}/
export const month = /0[1-9]|1[0-2]/
export const day = /0[1-9]|[12]\d|3[0-1]/
const date = r`${year}-${month}-${day}`

export default function isIso8601Date(text: string): text is Iso8601Date {
  return date.test(text)
}
