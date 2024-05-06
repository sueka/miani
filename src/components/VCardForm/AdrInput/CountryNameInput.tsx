import { Checkbox, Group, Input, TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useLayoutEffect, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 } from 'uuid'

import exit from '../../../lib/exit'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { textValue } from '../../../patterns/vCard'
import { listComponent } from '../../../patterns/vCard4'
import countryNameState from '../../../recoil/atoms/adr/countryNameState'
import sharedState from '../../../recoil/atoms/sharedState'
import versionState from '../../../recoil/atoms/vCard/versionState'

interface Props {
  id?: string
}

const CountryNameInput: React.FC<Props> = ({ id }) => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilCountryName, setRecoilCountryName] =
    useRecoilState(countryNameState)
  const [shared, setShared] = useRecoilState(sharedState(countryNameState.key))
  const inputId = useMemo(() => id ?? v4(), [id])

  const [countryName, setCountryName] = useValidatedState<string | null>(
    recoilCountryName,
    (value) => {
      switch (version) {
        case '3.0':
          return value === null || r`^${textValue}$`.test(value)

        case '4.0':
          return value === null || r`^${listComponent}$`.test(value)
      }
    },
  )

  useLayoutEffect(() => {
    setCountryName(recoilCountryName)
  }, [setCountryName, recoilCountryName])

  return (
    <Input.Wrapper
      label={<FormattedMessage defaultMessage="Country Name" />}
      labelProps={{ htmlFor: inputId }}
    >
      <Group gap="xs">
        <Checkbox
          checked={shared}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShared(event.currentTarget.checked)
          }}
        />
        <TextInput
          id={inputId}
          flex={1}
          placeholder="U.S.A."
          autocomplete="country-name"
          value={countryName.value}
          error={
            !countryName.valid && (
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    version === '3.0'
                      ? formatMessage({
                          defaultMessage:
                            'Should be a <i>text-value</i> on p. 37, RFC 2426.',
                        })
                      : version === '4.0'
                        ? formatMessage({
                            defaultMessage:
                              'Should be a <i>list-component</i> on p. 10, RFC 6350.',
                          })
                        : exit(),
                }}
              />
            )
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setCountryName(nes(event.currentTarget.value))
            setRecoilCountryName(nes(event.currentTarget.value))
          }}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default CountryNameInput
