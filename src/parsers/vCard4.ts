// The ABNF patterns were extracted from RFC 6350.

import exit from '../lib/exit'
import r from '../lib/tags/r'
import ParseError from './ParseError'

interface VCard {
  version: '4.0'
  lines: Contentline[]
}

export /* for testing */ interface Contentline {
  group?: string
  name: string
  params: Param[]
  value: string // NOTE: {value} should not be considered comma-separated since text-list (defined on 4, RFC 6350) includes list-component (defined there).
}

interface Param {
  name: string
  value: string // NOTE: SAFE-CHAR and QSAFE-CHAR (defined on 7, RFC 6350) permit commas.
}

const alnum = /[A-Za-z0-9-]+/guy
const qString =
  /(?:[ \t]|!|[\x23-\x39]|[\x3C-\x7E]|[\x80-\u{10FFFF}])*|"(?:[ \t]|!|[\x23-\x7E]|[\x80-\u{10FFFF}])*"/guy
const text =
  /(?:\\\\|\\,|\\n|[ \t]|[\x80-\u{10FFFF}]|[\x21-\x2B]|[\x2D-\x5B]|[\x5D-\x7E])*/guy

// any-param = (iana-token / x-name) "=" param-value *("," param-value)
const param = r`(?<paramName>${alnum})=(?<paramValue>${qString}(?:,${qString})*)`

// contentline = [group "."] name *(";" param) ":" value CRLF
const contentline = r`(?:(?<group>${alnum})\.)?(?<name>${alnum})(?<params>(?:;${param})*):(?<value>${text}(?:,${text})*)\r\n`

// vcard = "BEGIN:VCARD" CRLF
//         "VERSION:4.0" CRLF
//         1*contentline
//         "END:VCARD" CRLF
const vcard = r`BEGIN:VCARD\r\nVERSION:4.0\r\n(?<lines>${contentline}+)END:VCARD\r\n`

/**
 * @throws `ParseError` if parsing fails
 */
export function* parseVCard(input: string): Generator<VCard, void> {
  let consumed = 0

  for (const matched of input.matchAll(vcard)) {
    if (matched === null) {
      throw new ParseError()
    }

    const { lines: linesPart } = matched.groups ?? exit()
    const lines = [...parseContentlines(linesPart ?? exit())]

    yield {
      version: '4.0',
      lines,
    }

    consumed += matched[0].length
  }

  if (consumed !== input.length) {
    throw new Error() //
  }
}

/**
 * @throws `ParseError` if parsing fails
 */
export function* parseContentlines(
  input: string,
): Generator<Contentline, void> {
  let consumed = 0

  for (const matched of input.matchAll(contentline)) {
    if (matched === null) {
      throw new ParseError()
    }

    const { group, name, params: paramsPart, value } = matched.groups ?? exit()
    const params = [...parseParams(paramsPart ?? exit())]

    yield {
      group,
      name: name ?? exit(),
      params,
      value: value ?? exit(),
    }

    consumed += matched[0].length
  }

  if (consumed !== input.length) {
    throw new Error() //
  }
}

export function* parseParams(input: string): Generator<Param, void> {
  let consumed = 0

  for (const matched of input.matchAll(r`;${param}`)) {
    if (matched === null) {
      throw new ParseError()
    }

    const { paramName, paramValue } = matched.groups ?? exit()

    yield {
      name: paramName ?? exit(),
      value: paramValue ?? exit(),
    }

    consumed += matched[0].length
  }

  if (consumed !== input.length) {
    throw new Error() //
  }
}
