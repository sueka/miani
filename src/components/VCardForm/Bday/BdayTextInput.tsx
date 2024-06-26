import { TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useLayoutEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'
import assert from '../../../lib/assert'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { text } from '../../../patterns/vCard4'
import bdayTextState from '../../../recoil/states/bday/bdayTextState'
import versionState from '../../../recoil/states/vCard/versionState'

const BdayTextInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  assert(version === '4.0')
  const [recoilBday, setRecoilBday] = useRecoilState(bdayTextState)

  const [bday, setBday] = useValidatedState<string | null>(
    recoilBday,
    (value) => value === null || r`^${text}$`.test(value),
  )

  useLayoutEffect(() => {
    setBday(recoilBday)
  }, [setBday, recoilBday])

  return (
    <TextInput
      placeholder="circa 1800"
      value={bday.value ?? undefined}
      error={
        !bday.valid && (
          <span
            dangerouslySetInnerHTML={{
              __html: formatMessage({
                defaultMessage: 'Should be a <i>text</i> on p. 10, RFC 6350.',
              }),
            }}
          />
        )
      }
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setBday(nes(event.currentTarget.value))
        setRecoilBday(nes(event.currentTarget.value))
      }}
    />
  )
}

export default BdayTextInput
