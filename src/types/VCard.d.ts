namespace VCard {
  interface VCard {
    version: Version
    fn: string
    n: string
    bday: Bday | null
    adr: string | null
    tels: Tel[] | null
    x: Record<string, string> // non-standard types //
    any: Line[]
  }

  interface Options {
    noYear: boolean // omits year of bday if true
    charset?: Charset
  }

  // > It is invalid to specify a value other than "UTF-8" in the "charset" MIME parameter (see Section 10.1).
  // p. 5, 3.1, RFC 6350.
  type Charset = 'UTF-8'

  type NVariant = 'plainText' | 'components'
  type AdrVariant = 'plainText' | 'components'

  type Version = '3.0' | '4.0'

  interface N {
    familyName: string | null
    givenName: string | null
    additionalNames: string[] | null
    honorificPrefixes: string[] | null
    honorificSuffixes: string[] | null
    rest?: string // Substring to the right of the fifth semicolon (if any)
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

  interface Adr {
    postOfficeBox: string | null
    extendedAddress: string | null
    streetAddress: string | null
    locality: string | null
    region: string | null
    postalCode: string | null
    countryName: string | null
    rest?: string // Substring to the right of the seventh semicolon (if any)
  }

  interface Tel {
    value: string // phone number
    types: TelType[] // The default type is "voice". (3.3.1, RFC 2426)
  }

  // 3.3.1, RFC 2426 lists
  type TelType =
    | 'home'
    | 'msg'
    | 'work'
    | 'pref'
    | 'voice'
    | 'fax'
    | 'cell'
    | 'video'
    | 'pager'
    | 'bbs'
    | 'modem'
    | 'car'
    | 'isdn'
    | 'pcs'

  interface Line {
    name: string
    value: string
  }
}
