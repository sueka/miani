/**
 * Regex pattern collection for vCard.
 *
 * The ABNF patterns were extracted from RFC 2426.
 */

import r from './lib/tags/r'

// SAFE-CHAR = WSP / %x21 / %x23-2B / %x2D-39 / %x3C-7E / NON-ASCII
// biome-ignore lint/suspicious/noControlCharactersInRegex: RFC 2426 mentions control characters
const safeChar = /[^\x00-\x08\x0A-\x1F\x22\x3B\x3A\x2C]/

// ESCAPED-CHAR = "\\" / "\;" / "\," / "\n" / "\N"
const escapedChar = /\\\\|\\;|\\,|\\n|\\N/

// text-value = *(SAFE-CHAR / ":" / DQUOTE / ESCAPED-CHAR)
export const textValue = r`(?:${safeChar}|:|"|${escapedChar})*`

// n-value = 0*4(text-value *("," text-value) ";")
//           text-value *("," text-value)
export const nValue = r`(?:${textValue}(?:,${textValue})*;){0,4}${textValue}(?:,${textValue})*`
