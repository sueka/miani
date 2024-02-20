import { DefaultValue, selector } from 'recoil'

import assert from '../../lib/assert'
import { nValueGrouped } from '../../patterns'
import additionalNamesState from '../atoms/n/additionalNamesState'
import familyNameState from '../atoms/n/familyNameState'
import givenNameState from '../atoms/n/givenNameState'
import honorificPrefixesState from '../atoms/n/honorificPrefixesState'
import honorificSuffixesState from '../atoms/n/honorificSuffixesState'

const nState = selector<string>({
  key: 'n',
  get({ get }) {
    const familyName = get(familyNameState)
    const givenName = get(givenNameState)
    const additionalNames = get(additionalNamesState)
    const honorificPrefixes = get(honorificPrefixesState)
    const honorificSuffixes = get(honorificSuffixesState)

    return build({
      familyName,
      givenName,
      additionalNames,
      honorificPrefixes,
      honorificSuffixes,
    })
  },
  set({ set }, newValue) {
    if (newValue instanceof DefaultValue) {
      throw new Error('DefaultValue not supported.')
    }

    const {
      familyName,
      givenName,
      additionalNames,
      honorificPrefixes,
      honorificSuffixes,
    } = extract(newValue)

    set(familyNameState, familyName)
    set(givenNameState, givenName)
    set(additionalNamesState, additionalNames)
    set(honorificPrefixesState, honorificPrefixes)
    set(honorificSuffixesState, honorificSuffixes)
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
  } = n

  const textComponents = [
    familyName,
    givenName,
    additionalNames?.join(','),
    honorificPrefixes?.join(','),
    honorificSuffixes?.join(','),
  ]

  return textComponents.join(';').replace(/;+$/, '')
}

function extract(n: string): VCard.N {
  const matched = n.match(nValueGrouped)
  assert(matched?.groups != null)

  const {
    familyName = null,
    givenName = null,
    additionalNames: additionalNamesJoined,
    honorificPrefixes: honorificPrefixesJoined,
    honorificSuffixes: honorificSuffixesJoined,
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
  }
}
