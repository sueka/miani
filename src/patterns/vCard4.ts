/**
 * Regex pattern collection for vCard 4.0.
 *
 * The ABNF patterns were extracted from RFC 6350.
 */

import r from '../lib/tags/r'

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
export const nValue = r`(?<familyName>${listComponent});(?<givenName>${listComponent});(?<additionalNames>${listComponent});(?<honorificPrefixes>${listComponent});(?<honorificSuffixes>${listComponent})`

export const nValuePartial = r`(?<familyName>${listComponent})(?:;(?<givenName>${listComponent})(?:;(?<additionalNames>${listComponent})(?:;(?<honorificPrefixes>${listComponent})(?:;(?<honorificSuffixes>${listComponent}))?)?)?)?`

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
export const adrValue = r`(?<postOfficeBox>${listComponent});(?<extendedAddress>${listComponent});(?<streetAddress>${listComponent});(?<locality>${listComponent});(?<region>${listComponent});(?<postalCode>${listComponent});(?<countryName>${listComponent})`

export const adrValuePartial = r`(?<postOfficeBox>${listComponent})(?:;(?<extendedAddress>${listComponent})(?:;(?<streetAddress>${listComponent})(?:;(?<locality>${listComponent})(?:;(?<region>${listComponent})(?:;(?<postalCode>${listComponent})(?:;(?<countryName>${listComponent}))?)?)?)?)?)?`
