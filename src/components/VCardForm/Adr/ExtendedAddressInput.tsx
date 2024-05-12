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
import extendedAddressState from '../../../recoil/states/adr/extendedAddressState'
import sharedState from '../../../recoil/states/sharedState'
import versionState from '../../../recoil/states/vCard/versionState'

const ExtendedAddressInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilExtendedAddress, setRecoilExtendedAddress] =
    useRecoilState(extendedAddressState)
  const [shared, setShared] = useRecoilState(
    sharedState(extendedAddressState.key),
  )
  const inputId = useMemo(v4, [])

  const [extendedAddress, setExtendedAddress] = useValidatedState<
    string | null
  >(recoilExtendedAddress, (value) => {
    switch (version) {
      case '3.0':
        return value === null || r`^${textValue}$`.test(value)

      case '4.0':
        return value === null || r`^${listComponent}$`.test(value)
    }
  })

  useLayoutEffect(() => {
    setExtendedAddress(recoilExtendedAddress)
  }, [setExtendedAddress, recoilExtendedAddress])

  return (
    <Input.Wrapper
      label={
        <>
          <FormattedMessage defaultMessage="Extended Address" />
          <Hint popoverProps={{ position: 'top' }}>
            <Text size="xs">
              <FormattedMessage defaultMessage="Building name, apartment or suite number, etc." />
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
          placeholder=""
          value={extendedAddress.value ?? undefined}
          error={
            !extendedAddress.valid && (
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
            setExtendedAddress(nes(event.currentTarget.value))
            setRecoilExtendedAddress(nes(event.currentTarget.value))
          }}
          rightSection={
            version === '4.0' ? (
              <Hint variant="alert">
                <Text size="xs">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: formatMessage({
                        defaultMessage:
                          'For interoperability, it SHOULD be left empty.',
                      }),
                    }}
                  />
                </Text>
              </Hint>
            ) : null
          }
        />
      </Group>
    </Input.Wrapper>
  )
}

export default ExtendedAddressInput
