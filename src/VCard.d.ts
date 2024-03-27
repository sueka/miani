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
  }

  type NVariant = 'plainText' | 'components'

  type Version = '3.0' | '4.0'

  interface N {
    familyName: string | null
    givenName: string | null
    additionalNames: string[] | null
    honorificPrefixes: string[] | null
    honorificSuffixes: string[] | null
  }

  interface Bday {
    value: Temporal.PlainDate | string
    valueParam?: 'date-and-or-time' | 'text' // default to 'date-and-or-time'
  }

  interface Tel {
    value: string // phone number
  }
}
