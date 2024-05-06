/**
 * Regex pattern collection for vCard 3.0.
 *
 * The ABNF patterns were extracted from RFC 2426.
 */

import r from '../lib/tags/r'

// SAFE-CHAR = WSP / %x21 / %x23-2B / %x2D-39 / %x3C-7E / NON-ASCII
// biome-ignore lint/suspicious/noControlCharactersInRegex: RFC 2426 mentions control characters
const safeChar = /[^\x00-\x08\x0A-\x1F\x22\x3B\x3A\x2C\x7F]/

// ESCAPED-CHAR = "\\" / "\;" / "\," / "\n" / "\N"
const escapedChar = /\\\\|\\;|\\,|\\n|\\N/

// text-value = *(SAFE-CHAR / ":" / DQUOTE / ESCAPED-CHAR)
export const textValue = r`(?:${safeChar}|:|"|${escapedChar})*`

// n-value = 0*4(text-value *("," text-value) ";")
//           text-value *("," text-value)
export const textValues = r`${textValue}(?:,${textValue})*`
export const nValue = r`(?<familyName>${textValues})(?:;(?<givenName>${textValues})(?:;(?<additionalNames>${textValues})(?:;(?<honorificPrefixes>${textValues})(?:;(?<honorificSuffixes>${textValues}))?)?)?)?`

// adr-value = 0*6(text-value ";") text-value
export const adrValue = r`(?<postOfficeBox>${textValue})(?:;(?<extendedAddress>${textValue})(?:;(?<streetAddress>${textValue})(?:;(?<locality>${textValue})(?:;(?<region>${textValue})(?:;(?<postalCode>${textValue})(?:;(?<countryName>${textValue}))?)?)?)?)?)?`

// phone-number-value = <A single text value as defined in [CCITT E.163] and [CCITT X.121]>
export const phoneNumberValue = /(?:\+(?<cc>[1-9]\d*)-?)?(?<nsn>(?:\d+-)*\d+)/
