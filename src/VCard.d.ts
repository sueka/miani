namespace VCard {
  interface VCard {
    fn: string
    n: string
    bday: Date | null
  }

  interface N {
    familyName: string | null
    givenName: string | null
    additionalNames: string[] | null
    honorificPrefixes: string[] | null
    honorificSuffixes: string[] | null
  }
}
