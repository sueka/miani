import { Checkbox, Group, Input, Text, TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useLayoutEffect, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 } from 'uuid'

import Hint from '../../../lib/components/Hint'
import exit from '../../../lib/exit'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { textValue } from '../../../patterns/vCard'
import { listComponent } from '../../../patterns/vCard4'
import streetAddressState from '../../../recoil/atoms/adr/streetAddressState'
import sharedState from '../../../recoil/atoms/sharedState'
import versionState from '../../../recoil/atoms/vCard/versionState'

const StreetAddressInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilStreetAddress, setRecoilStreetAddress] =
    useRecoilState(streetAddressState)
  const [shared, setShared] = useRecoilState(
    sharedState(streetAddressState.key),
  )
  const inputId = useMemo(v4, [])

  const [streetAddress, setStreetAddress] = useValidatedState<string | null>(
    recoilStreetAddress,
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
    setStreetAddress(recoilStreetAddress)
  }, [setStreetAddress, recoilStreetAddress])

  return (
    <Input.Wrapper
      label={
        <>
          <FormattedMessage defaultMessage="Street Address" />
          <Hint popoverProps={{ position: 'top' }}>
            <Text size="xs">
              <FormattedMessage defaultMessage="You may separate them with commas if it has multiple lines." />
            </Text>
          </Hint>
        </>
      }
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
          placeholder="123 Main Street"
          autoComplete="street-address"
          value={streetAddress.value ?? undefined}
          error={
            !streetAddress.valid && (
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
            setStreetAddress(nes(event.currentTarget.value))
            setRecoilStreetAddress(nes(event.currentTarget.value))
          }}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default StreetAddressInput
