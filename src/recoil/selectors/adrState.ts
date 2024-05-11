import { DefaultValue, type RecoilState, selector } from 'recoil'

import assert from '../../lib/assert'
import exit from '../../lib/exit'
import r from '../../lib/tags/r'
import { adrValue } from '../../patterns/vCard'
import { adrValuePartial } from '../../patterns/vCard4'
import countryNameState from '../atoms/adr/countryNameState'
import extendedAddressState from '../atoms/adr/extendedAddressState'
import localityState from '../atoms/adr/localityState'
import postOfficeBoxState from '../atoms/adr/postOfficeBoxState'
import postalCodeState from '../atoms/adr/postalCodeState'
import regionState from '../atoms/adr/regionState'
import restState from '../atoms/adr/restState'
import streetAddressState from '../atoms/adr/streetAddressState'
import variantState from '../atoms/adr/variantState'
import sharedState from '../atoms/sharedState'
import versionState from '../atoms/vCard/versionState'

const adrState = selector<string | null>({
  key: 'adr',
  get({ get }) {
    const adrVariant = get(variantState)

    const getOrNull = <T>(state: RecoilState<T>) => {
      assert(/^adr\/.+$/.test(state.key))

      return adrVariant === 'plainText' || get(sharedState(state.key))
        ? get(state)
        : null
    }

    const postOfficeBox = getOrNull(postOfficeBoxState)
    const extendedAddress = getOrNull(extendedAddressState)
    const streetAddress = getOrNull(streetAddressState)
    const locality = getOrNull(localityState)
    const region = getOrNull(regionState)
    const postalCode = getOrNull(postalCodeState)
    const countryName = getOrNull(countryNameState)
    const rest = get(restState) ?? undefined
    const version = get(versionState)

    const built = build(
      {
        postOfficeBox,
        extendedAddress,
        streetAddress,
        locality,
        region,
        postalCode,
        countryName,
        rest,
      },
      {
        version,
      },
    )

    return built !== '' ? built : null
  },
  set({ set, get }, newAdr) {
    if (newAdr instanceof DefaultValue) {
      throw new Error('DefaultValue not supported.')
    }

    const version = get(versionState)

    const {
      postOfficeBox,
      extendedAddress,
      streetAddress,
      locality,
      region,
      postalCode,
      countryName,
      rest,
    } = extract(newAdr ?? '', { version })

    set(postOfficeBoxState, postOfficeBox)
    set(extendedAddressState, extendedAddress)
    set(streetAddressState, streetAddress)
    set(localityState, locality)
    set(regionState, region)
    set(postalCodeState, postalCode)
    set(countryNameState, countryName)
    set(restState, rest ?? null)
  },
})

export default adrState

interface Options {
  version: VCard.Version
}

// TODO: Remove them
function build(adr: VCard.Adr, { version }: Options): string {
  const {
    postOfficeBox,
    extendedAddress,
    streetAddress,
    locality,
    region,
    postalCode,
    countryName,
    rest,
  } = adr

  const textComponents = [
    postOfficeBox,
    extendedAddress,
    streetAddress,
    locality,
    region,
    postalCode,
    countryName,
  ]

  return version === '3.0'
    ? textComponents
        .slice(0, textComponents.findLastIndex((c) => c != null) + 1)
        .join(';') + (rest ?? '')
    : version === '4.0'
      ? textComponents.join(';') + (rest ?? '')
      : exit()
}

function extract(adr: string, { version }: Options): VCard.Adr {
  const matched =
    version === '3.0'
      ? adr.match(r`^${adrValue}(?<rest>.*)$`)
      : version === '4.0'
        ? adr.match(r`^${adrValuePartial}(?<rest>.*)$`)
        : exit()

  assert(matched?.groups != null)

  const {
    postOfficeBox = null,
    extendedAddress = null,
    streetAddress = null,
    locality = null,
    region = null,
    postalCode = null,
    countryName = null,
    rest: _rest,
  } = matched.groups

  // NOTE: This lines may remove if adrValueV3/adrValueV4Partial has (?<rest>.*) in its optional clauses but we have had priority for better appearances of the regexes.
  assert(_rest !== undefined)
  const rest = countryName !== null ? _rest : undefined

  return {
    postOfficeBox,
    extendedAddress,
    streetAddress,
    locality,
    region,
    postalCode,
    countryName,
    rest,
  }
}
