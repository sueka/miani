import { describe, expect, it } from 'bun:test'
import stripMargin from '../lib/stripMargin'
import {
  type Contentline,
  parseContentlines,
  parseVCard,
} from './vCard4'

describe('parseContentlines()', () => {
  it('works', () => {
    // Consumes iterator as much as possible.
    const actual = [
      ...parseContentlines('TEL;TYPE=pref,home:+81-3-0123-4567\r\n'),
    ][0]

    expect(actual?.group).toBeUndefined()
    expect(actual?.name).toBe('TEL')
    expect(actual?.params[0]?.name).toBe('TYPE')
    expect(actual?.params[0]?.value).toBe('pref,home')
    expect(actual?.value).toBe('+81-3-0123-4567')
  })
})

describe('parseVCard', () => {
  it('works', () => {
    // Consumes iterator as much as possible.
    const actual = [
      ...parseVCard(
        stripMargin(
          `BEGIN:VCARD
          |VERSION:4.0
          |FN:John Doe
          |TEL;TYPE=pref,home:+81-3-0123-4567
          |END:VCARD
          |`,
        ).replaceAll('\n', '\r\n'),
      ),
    ][0]

    expect(actual?.version).toBe('4.0')

    expect(actual?.lines[0]).toMatchObject({
      name: 'FN',
      params: [],
      value: 'John Doe',
    } satisfies Contentline)

    expect(actual?.lines[1]).toMatchObject({
      name: 'TEL',
      params: [{ name: 'TYPE', value: 'pref,home' }],
      value: '+81-3-0123-4567',
    } satisfies Contentline)
  })
})
