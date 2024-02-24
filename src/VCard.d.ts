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

  interface N {
    familyName: string | null
    givenName: string | null
    additionalNames: string[] | null
    honorificPrefixes: string[] | null
    honorificSuffixes: string[] | null
  }
}
