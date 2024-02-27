namespace VCard {
  interface VCard {
    fn: string
    n: string
    bday: Temporal.PlainDate | null
    any: Record<string, string>
  }

  interface Options {
    noYear: boolean // omits year of bday if true
  }

  type NVariant = 'plainText' | 'components'

  interface N {
    familyName: string | null
    givenName: string | null
    additionalNames: string[] | null
    honorificPrefixes: string[] | null
    honorificSuffixes: string[] | null
    rest?: string // Substring to the right of the fifth semicolon (if any)
  }
}
