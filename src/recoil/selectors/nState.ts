import { type RecoilState, selector } from 'recoil'

import additionalNamesState from '../atoms/n/additionalNamesState'
import familyNameState from '../atoms/n/familyNameState'
import givenNameState from '../atoms/n/givenNameState'
import honorificPrefixesState from '../atoms/n/honorificPrefixesState'
import honorificSuffixesState from '../atoms/n/honorificSuffixesState'
import sharedState from '../atoms/sharedState'
import versionState from '../atoms/vCard/versionState'

const nState = selector<string>({
  key: 'n',
  get({ get }) {
    const getOrNull = <T>(state: RecoilState<T>) =>
      get(sharedState(state.key)) ? get(state) : null

    const familyName = getOrNull(familyNameState)
    const givenName = getOrNull(givenNameState)
    const additionalNames = getOrNull(additionalNamesState)
    const honorificPrefixes = getOrNull(honorificPrefixesState)
    const honorificSuffixes = getOrNull(honorificSuffixesState)
    const version = get(versionState)

    return build(
      {
        familyName,
        givenName,
        additionalNames,
        honorificPrefixes,
        honorificSuffixes,
      },
      {
        version,
      },
    )
  },
})

export default nState

interface Options {
  version: VCard.Version
}

// TODO: Remove them
function build(n: Partial<VCard.N>, options: Options): string {
  const {
    familyName,
    givenName,
    additionalNames,
    honorificPrefixes,
    honorificSuffixes,
  } = n

  const { version } = options

  const textComponents = [
    familyName,
    givenName,
    additionalNames?.join(','),
    honorificPrefixes?.join(','),
    honorificSuffixes?.join(','),
  ]

  switch (version) {
    case '3.0':
      return textComponents
        .slice(0, textComponents.findLastIndex((c) => c != null) + 1)
        .join(';')

    case '4.0':
      return textComponents.join(';')
  }
}
