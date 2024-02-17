import { describe, expect, it } from 'bun:test'

import r from './r'

describe('r`` tag', () => {
  it('returns an empty regex with an empty template', () => {
    const actual = r``
    // biome-ignore lint/complexity/useRegexLiterals: Literals cannot be tested well
    const expected = new RegExp('')

    expect(actual).toEqual(expected)
  })

  it('returns a regex whose pattern is the whole template with no substitutions', () => {
    const actual = r`abc`
    const expected = /abc/

    expect(actual).toEqual(expected)
  })

  it('concatenates regexes', () => {
    const letter = /[A-Za-z]/
    const numeral = /\d/
    const actual = r`(?:${letter}|_)(?:${letter}|_|${numeral})*`
    const expected = /(?:(?:[A-Za-z])|_)(?:(?:[A-Za-z])|_|(?:\d))*/

    expect(actual).toEqual(expected)
  })

  it('fails for substitution regexes with different flags', () => {
    const letter = /[A-Z]/i
    const numeral = /\d/
    const actual = () => r`(?:${letter}|_)(?:${letter}|_|${numeral})*`

    expect(actual).toThrow()
  })
})
