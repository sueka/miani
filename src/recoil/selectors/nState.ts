import { DefaultValue, selector } from 'recoil'

import assert from '../../lib/assert'
import exit from '../../lib/exit'
import r from '../../lib/tags/r'
import { nValueV3, nValueV4Partial } from '../../patterns'
import additionalNamesState from '../atoms/n/additionalNamesState'
import familyNameState from '../atoms/n/familyNameState'
import givenNameState from '../atoms/n/givenNameState'
import honorificPrefixesState from '../atoms/n/honorificPrefixesState'
import honorificSuffixesState from '../atoms/n/honorificSuffixesState'
import restState from '../atoms/n/restState'
import versionState from '../atoms/vCard/versionState'

const nState = selector<string>({
  key: 'n',
  get({ get }) {
    const familyName = get(familyNameState)
    const givenName = get(givenNameState)
    const additionalNames = get(additionalNamesState)
    const honorificPrefixes = get(honorificPrefixesState)
    const honorificSuffixes = get(honorificSuffixesState)
    const rest = get(restState) ?? undefined

    return build({
      familyName,
      givenName,
      additionalNames,
      honorificPrefixes,
      honorificSuffixes,
      rest,
    })
  },
  set({ set, get }, newValue) {
    if (newValue instanceof DefaultValue) {
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
    } = extract(newValue, { version })

    set(familyNameState, familyName)
    set(givenNameState, givenName)
    set(additionalNamesState, additionalNames)
    set(honorificPrefixesState, honorificPrefixes)
    set(honorificSuffixesState, honorificSuffixes)
    set(restState, rest ?? null)
  },
})

export default nState

// TODO: Remove them
function build(n: Partial<VCard.N>): string {
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

  return (
    textComponents
      .slice(0, textComponents.findLastIndex((c) => c != null) + 1)
      .join(';') + (rest ?? '')
  )
}

function extract(n: string, { version }: { version: VCard.Version }): VCard.N {
  const matched =
    version === '3.0'
      ? n.match(r`^${nValueV3}(?<rest>.*)$`)
      : version === '4.0'
        ? n.match(r`^${nValueV4Partial}(?<rest>.*)$`)
        : exit()

  assert(matched?.groups != null)

  const {
    familyName = null,
    givenName = null,
    additionalNames: additionalNamesJoined,
    honorificPrefixes: honorificPrefixesJoined,
    honorificSuffixes: honorificSuffixesJoined,
    rest,
  } = matched.groups

  const additionalNames = additionalNamesJoined?.split(',') ?? null
  const honorificPrefixes = honorificPrefixesJoined?.split(',') ?? null
  const honorificSuffixes = honorificSuffixesJoined?.split(',') ?? null

  return {
    familyName,
    givenName,
    additionalNames,
    honorificPrefixes,
    honorificSuffixes,
    rest,
  }
}
