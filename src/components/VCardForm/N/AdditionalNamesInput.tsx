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
import { textValues } from '../../../patterns/vCard'
import { listComponent } from '../../../patterns/vCard4'
import additionalNamesState from '../../../recoil/states/n/additionalNamesState'
import sharedState from '../../../recoil/states/sharedState'
import versionState from '../../../recoil/states/vCard/versionState'

const AdditionalNamesInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilAdditionalNames, setRecoilAdditionalNames] =
    useRecoilState(additionalNamesState)
  const [shared, setShared] = useRecoilState(
    sharedState(additionalNamesState.key),
  )
  const inputId = useMemo(v4, [])

  const [additionalNames, setAdditionalNames] = useValidatedState<
    string | null
  >(recoilAdditionalNames?.join(',') ?? null, (value) => {
    switch (version) {
      case '3.0':
        return value === null || r`^${textValues}$`.test(value)

      case '4.0':
        return value === null || r`^${listComponent}$`.test(value)
    }
  })

  useLayoutEffect(() => {
    setAdditionalNames(recoilAdditionalNames?.join(',') ?? null)
  }, [setAdditionalNames, recoilAdditionalNames])

  return (
    <Input.Wrapper
      label={
        <>
          <FormattedMessage defaultMessage="Additional Names" />
          <Hint popoverProps={{ position: 'top' }}>
            <Text size="xs">
              <FormattedMessage defaultMessage="Often middle names." />
            </Text>
          </Hint>
        </>
      }
      labelProps={{ htmlFor: inputId }}
      error={
        !additionalNames.valid && (
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
          placeholder="Quinlan"
          autoComplete="additional-name"
          value={additionalNames.value ?? undefined}
          labelProps={{ htmlFor: inputId }}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAdditionalNames(nes(event.currentTarget.value))
            setRecoilAdditionalNames(
              nes(event.currentTarget.value)?.split(',') ?? null, //
            )
          }}
          error={!additionalNames.valid}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default AdditionalNamesInput
