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
import postalCodeState from '../../../recoil/states/adr/postalCodeState'
import sharedState from '../../../recoil/states/sharedState'
import versionState from '../../../recoil/states/vCard/versionState'

const PostalCodeInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilPostalCode, setRecoilPostalCode] =
    useRecoilState(postalCodeState)
  const [shared, setShared] = useRecoilState(sharedState(postalCodeState.key))
  const inputId = useMemo(v4, [])

  const [postalCode, setPostalCode] = useValidatedState<string | null>(
    recoilPostalCode,
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
    setPostalCode(recoilPostalCode)
  }, [setPostalCode, recoilPostalCode])

  return (
    <Input.Wrapper
      label={<FormattedMessage defaultMessage="Postal Code" />}
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
          placeholder="91921-1234"
          autoComplete="postal-code"
          value={postalCode.value ?? undefined}
          error={
            !postalCode.valid && (
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
            setPostalCode(nes(event.currentTarget.value))
            setRecoilPostalCode(nes(event.currentTarget.value))
          }}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default PostalCodeInput
