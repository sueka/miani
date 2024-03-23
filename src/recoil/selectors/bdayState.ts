import { type RecoilState, selector } from 'recoil'
import exit from '../../lib/exit'
import bdayDateTimeState from '../atoms/bday/bdayDateTimeState'
import bdayTextState from '../atoms/bday/bdayTextState'
import valueParamState from '../atoms/bday/valueParamState'
import sharedState from '../atoms/sharedState'
import versionState from '../atoms/vCard/versionState'

export default selector<VCard.Bday | null>({
  key: 'bday',
  get({ get }) {
    const getOrNull = <T>(state: RecoilState<T>) =>
      get(sharedState(state.key)) ? get(state) : null

    const version = get(versionState)
    const valueParam =
      version === '3.0'
        ? 'date-and-or-time'
        : version === '4.0'
          ? get(valueParamState)
          : exit()

    const value =
      valueParam === 'date-and-or-time'
        ? getOrNull(bdayDateTimeState)
        : valueParam === 'text'
          ? getOrNull(bdayTextState)
          : exit()

    if (value === null) {
      return null
    }

    return {
      value,
      valueParam,
    }
  },
})
