/**
 * Regex pattern collection for vCard.
 *
 * The ABNF patterns were extracted from RFC 2426.
 */

// SAFE-CHAR = WSP / %x21 / %x23-2B / %x2D-39 / %x3C-7E / NON-ASCII
const safeChar = /[^\x00-\x08\x0A-\x1F\x22\x3B\x3A\x2C]/

// ESCAPED-CHAR = "\\" / "\;" / "\," / "\n" / "\N"
const escapedChar = /(?:\\\\|\\;|\\,|\\n|\\N)/

// text-value = *(SAFE-CHAR / ":" / DQUOTE / ESCAPED-CHAR)
export const textValue = new RegExp(
  `(?:${safeChar.source}|:|"|${escapedChar.source})*`,
)
