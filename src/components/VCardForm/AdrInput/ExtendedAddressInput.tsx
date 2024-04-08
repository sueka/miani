import { Checkbox, Group, Input, TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useLayoutEffect, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 } from 'uuid'

import exit from '../../../lib/exit'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { listComponent, textValue } from '../../../patterns'
import extendedAddressState from '../../../recoil/atoms/adr/extendedAddressState'
import sharedState from '../../../recoil/atoms/sharedState'
import versionState from '../../../recoil/atoms/vCard/versionState'

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
      label={<FormattedMessage defaultMessage="Extended Address" />}
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
          value={extendedAddress.value}
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
        />
      </Group>
    </Input.Wrapper>
  )
}

export default ExtendedAddressInput
