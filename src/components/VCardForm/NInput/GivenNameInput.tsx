import { Checkbox, Group, Input, TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { v4 } from 'uuid'
import exit from '../../../lib/exit'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { listComponent, textValues } from '../../../patterns'
import givenNameState from '../../../recoil/atoms/n/givenNameState'
import sharedState from '../../../recoil/atoms/sharedState'
import versionState from '../../../recoil/atoms/vCard/versionState'

const GivenNameInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilGivenName, setRecoilGivenName] = useRecoilState(givenNameState)
  const [shared, setShared] = useRecoilState(sharedState(givenNameState.key))
  const inputId = useMemo(v4, [])

  const [givenName, setGivenName] = useValidatedState<string | null>(
    recoilGivenName,
    (value) => {
      switch (version) {
        case '3.0':
          return value === null || r`^${textValues}$`.test(value)

        case '4.0':
          return value === null || r`^${listComponent}$`.test(value)
      }
    },
  )

  useEffect(() => {
    setGivenName(recoilGivenName)
  }, [setGivenName, recoilGivenName])

  return (
    <Input.Wrapper
      label={<FormattedMessage defaultMessage="Given Name" />}
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
          placeholder="John"
          value={givenName.value ?? undefined}
          error={
            !givenName.valid && (
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    version === '3.0'
                      ? formatMessage({
                          defaultMessage:
                            'Should be comma-separated <i>text-value</i>s on p. 37, RFC 2426.',
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
            setGivenName(nes(event.currentTarget.value))
            setRecoilGivenName(nes(event.currentTarget.value))
          }}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default GivenNameInput
