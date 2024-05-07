// Imported from https://github.com/sueka/rap/blob/d8b1ca176773c8b0837188d199ec99c0ad79621a/src/extensions/String/stripMargin.ts

import r from './tags/r'

const eols = ['\n', '\r\n']

const eolPattern = new RegExp(`(?:${eols.join('|')})`, 'u')
const eolCharPattern = new RegExp(
  `(?:${eols.map((eol) => `[${eol}]`).join('|')})`,
  'u',
)

export default function stripMargin(
  ...args: Parameters<typeof stripMargin1>
): ReturnType<typeof stripMargin1>
export default function stripMargin(
  ...args: Parameters<typeof stripMargin2>
): ReturnType<typeof stripMargin2>

export default function stripMargin(that: string, marginChar?: string): string {
  if (marginChar === undefined) {
    return stripMargin1(that)
  }

  return stripMargin2(that, marginChar)
}

function stripMargin1(that: string) {
  return stripMargin2(that, '|')
}

function stripMargin2(that: string, marginChar: string) {
  let result = ''

  for (const line of generateLineWithEolIterator(that)) {
    const groups =
      r`^(?:[\t ]*(?<marginChar>.))?(?<stripped>(?:.|${eolCharPattern})*${eolPattern}?)$`.exec(
        line,
      )?.groups

    if (groups === undefined) {
      throw new Error() // TODO
    }

    const { marginChar: marginCharCandidate, stripped } = groups

    if (marginCharCandidate === marginChar) {
      result += stripped
    } else {
      result += line
    }
  }

  return result
}

function* generateLineWithEolIterator(cs: string) {
  let lineBuffer = ''
  let eolBuffer = ''

  for (const c of cs) {
    lineBuffer += c

    if (eols.some((eol) => eol.startsWith(eolBuffer + c))) {
      eolBuffer += c
    }

    if (eols.includes(eolBuffer)) {
      yield lineBuffer
      lineBuffer = ''
      eolBuffer = ''
    }
  }

  if (lineBuffer !== '') {
    yield lineBuffer
  }
}
