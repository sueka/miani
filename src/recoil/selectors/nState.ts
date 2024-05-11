import { DefaultValue, type RecoilState, selector } from 'recoil'

import assert from '../../lib/assert'
import exit from '../../lib/exit'
import r from '../../lib/tags/r'
import { nValue } from '../../patterns/vCard'
import { nValuePartial } from '../../patterns/vCard4'
import additionalNamesState from '../atoms/n/additionalNamesState'
import familyNameState from '../atoms/n/familyNameState'
import givenNameState from '../atoms/n/givenNameState'
import honorificPrefixesState from '../atoms/n/honorificPrefixesState'
import honorificSuffixesState from '../atoms/n/honorificSuffixesState'
import restState from '../atoms/n/restState'
import variantState from '../atoms/n/variantState'
import sharedState from '../atoms/sharedState'
import versionState from '../atoms/vCard/versionState'

const nState = selector<string>({
  key: 'n',
  get({ get }) {
    const nVariant = get(variantState)

    const getOrNull = <T>(state: RecoilState<T>) => {
      assert(/^n\/.+$/.test(state.key))

      return nVariant === 'plainText' || get(sharedState(state.key))
        ? get(state)
        : null
    }

    const familyName = getOrNull(familyNameState)
    const givenName = getOrNull(givenNameState)
    const additionalNames = getOrNull(additionalNamesState)
    const honorificPrefixes = getOrNull(honorificPrefixesState)
    const honorificSuffixes = getOrNull(honorificSuffixesState)
    const rest = get(restState) ?? undefined
    const version = get(versionState)

    return build(
      {
        familyName,
        givenName,
        additionalNames,
        honorificPrefixes,
        honorificSuffixes,
        rest,
      },
      {
        version,
      },
    )
  },
  set({ set, get }, newN) {
    if (newN instanceof DefaultValue) {
      throw new Error('DefaultValue not supported.')
    }

    const version = get(versionState)

    const {
      familyName,
      givenName,
      additionalNames,
      honorificPrefixes,
      honorificSuffixes,
      rest,
    } = extract(newN, { version })

    set(familyNameState, familyName)
    set(givenNameState, givenName)
    set(additionalNamesState, additionalNames)
    set(honorificPrefixesState, honorificPrefixes)
    set(honorificSuffixesState, honorificSuffixes)
    set(restState, rest ?? null)
  },
})

export default nState

interface Options {
  version: VCard.Version
}

// TODO: Remove them
function build(n: VCard.N, { version }: Options): string {
  const {
    familyName,
    givenName,
    additionalNames,
    honorificPrefixes,
    honorificSuffixes,
    rest,
  } = n

  const textComponents = [
    familyName,
    givenName,
    additionalNames?.join(','),
    honorificPrefixes?.join(','),
    honorificSuffixes?.join(','),
  ]

  return version === '3.0'
    ? textComponents
        .slice(0, textComponents.findLastIndex((c) => c != null) + 1)
        .join(';') + (rest ?? '')
    : version === '4.0'
      ? textComponents.join(';') + (rest ?? '')
      : exit()
}

function extract(n: string, { version }: Options): VCard.N {
  const matched =
    version === '3.0'
      ? n.match(r`^${nValue}(?<rest>.*)$`)
      : version === '4.0'
        ? n.match(r`^${nValuePartial}(?<rest>.*)$`)
        : exit()

  assert(matched?.groups != null)

  const {
    familyName = null,
    givenName = null,
    additionalNames: additionalNamesJoined,
    honorificPrefixes: honorificPrefixesJoined,
    honorificSuffixes: honorificSuffixesJoined,
    rest: _rest,
  } = matched.groups

  const additionalNames = additionalNamesJoined?.split(',') ?? null
  const honorificPrefixes = honorificPrefixesJoined?.split(',') ?? null
  const honorificSuffixes = honorificSuffixesJoined?.split(',') ?? null

  // NOTE: This lines may remove if nValueV3/nValueV4Partial has (?<rest>.*) in its optional clauses but we have had priority for better appearances of the regexes.
  assert(_rest !== undefined)
  const rest = honorificSuffixes !== null ? _rest : undefined

  return {
    familyName,
    givenName,
    additionalNames,
    honorificPrefixes,
    honorificSuffixes,
    rest,
  }
}
