namespace VCard {
  interface VCard {
    version: Version
    fn: string
    n: string
    bday: Bday | null
    tels: Tel[] | null
    x: Record<string, string> // non-standard types
    any: Record<string, string>
  }

  interface Options {
    noYear: boolean // omits year of bday if true
    charset?: Charset
  }

  // > It is invalid to specify a value other than "UTF-8" in the "charset" MIME parameter (see Section 10.1).
  // p. 5, 3.1, RFC 6350.
  type Charset = 'UTF-8'

  type NVariant = 'plainText' | 'components'

  type Version = '3.0' | '4.0'

  interface N {
    familyName: string | null
    givenName: string | null
    additionalNames: string[] | null
    honorificPrefixes: string[] | null
    honorificSuffixes: string[] | null
  }

  type Bday = BdayDateTime | BdayText

  interface BdayDateTime {
    value: Temporal.PlainDate
    valueParam?: 'date-and-or-time' // default to 'date-and-or-time'
  }

  interface BdayText {
    value: string
    valueParam: 'text'
  }

  interface Tel {
    value: string // phone number
  }
}
