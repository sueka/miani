/**
 * Regex pattern collection for vCard.
 *
 * The ABNF patterns were extracted from RFC 2426 (first half) and RFC 6350 (second half).
 */

import r from './lib/tags/r'

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
export const nValueV3 = r`(?<familyName>${textValues})(?:;(?<givenName>${textValues})(?:;(?<additionalNames>${textValues})(?:;(?<honorificPrefixes>${textValues})(?:;(?<honorificSuffixes>${textValues}))?)?)?)?`

// adr-value = 0*6(text-value ";") text-value
export const adrValueV3 = r`(?<postOfficeBox>${textValue})(?:;(?<extendedAddress>${textValue})(?:;(?<streetAddress>${textValue})(?:;(?<locality>${textValue})(?:;(?<region>${textValue})(?:;(?<postalCode>${textValue})(?:;(?<countryName>${textValue}))?)?)?)?)?)?`

// phone-number-value = <A single text value as defined in [CCITT E.163] and [CCITT X.121]>
export const phoneNumberValue = /(?:\+(?<cc>[1-9]\d*)-?)?(?<nsn>(?:\d+-)*\d+)/

// From RFC 6350:

// TEXT-CHAR = "\\" / "\," / "\n" / WSP / NON-ASCII
//           / %x21-2B / %x2D-5B / %x5D-7E
// biome-ignore lint/suspicious/noControlCharactersInRegex: RFC 6350 mentions control characters
const textChar = /\\\\|\\,|\\n|[^\x00-\x08\x0A-\x1F\x2C\x5C\x7F]/

// text = *TEXT-CHAR
export const text = r`${textChar}*`

// NOTE: Probably this ABNF is wrong.
// component = "\\" / "\," / "\;" / "\n" / WSP / NON-ASCII
//           / %x21-2B / %x2D-3A / %x3C-5B / %x5D-7E
// biome-ignore lint/suspicious/noControlCharactersInRegex: RFC 6350 mentions control characters
const componentChar = /\\\\|\\,|\\;|\\n|[^\x00-\x08\x0A-\x1F\x2C\x3B\x5C\x7F]/
const component = r`${componentChar}*`

// list-component = component *("," component)
export const listComponent = r`${component}(?:,${component})*`

// N-value = list-component 4(";" list-component)
export const nValueV4 = r`(?<familyName>${listComponent});(?<givenName>${listComponent});(?<additionalNames>${listComponent});(?<honorificPrefixes>${listComponent});(?<honorificSuffixes>${listComponent})`

export const nValueV4Partial = r`(?<familyName>${listComponent})(?:;(?<givenName>${listComponent})(?:;(?<additionalNames>${listComponent})(?:;(?<honorificPrefixes>${listComponent})(?:;(?<honorificSuffixes>${listComponent}))?)?)?)?`

// ADR-value = ADR-component-pobox ";" ADR-component-ext ";"
//             ADR-component-street ";" ADR-component-locality ";"
//             ADR-component-region ";" ADR-component-code ";"
//             ADR-component-country
// ADR-component-pobox    = list-component
// ADR-component-ext      = list-component
// ADR-component-street   = list-component
// ADR-component-locality = list-component
// ADR-component-region   = list-component
// ADR-component-code     = list-component
// ADR-component-country  = list-component
export const adrValueV4 = r`(?<postOfficeBox>${listComponent});(?<extendedAddress>${listComponent});(?<streetAddress>${listComponent});(?<locality>${listComponent});(?<region>${listComponent});(?<postalCode>${listComponent});(?<countryName>${listComponent})`

export const adrValueV4Partial = r`(?<postOfficeBox>${listComponent})(?:;(?<extendedAddress>${listComponent})(?:;(?<streetAddress>${listComponent})(?:;(?<locality>${listComponent})(?:;(?<region>${listComponent})(?:;(?<postalCode>${listComponent})(?:;(?<countryName>${listComponent}))?)?)?)?)?)?`
