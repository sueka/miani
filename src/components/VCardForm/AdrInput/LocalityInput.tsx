import {
  Checkbox,
  Divider,
  Group,
  Input,
  Stack,
  Text,
  TextInput,
} from '@mantine/core'
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
import localityState from '../../../recoil/atoms/adr/localityState'
import sharedState from '../../../recoil/atoms/sharedState'
import versionState from '../../../recoil/atoms/vCard/versionState'

const LocalityInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilLocality, setRecoilLocality] = useRecoilState(localityState)
  const [shared, setShared] = useRecoilState(sharedState(localityState.key))
  const inputId = useMemo(v4, [])

  const [locality, setLocality] = useValidatedState<string | null>(
    recoilLocality,
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
    setLocality(recoilLocality)
  }, [setLocality, recoilLocality])

  return (
    <Input.Wrapper
      label={
        <>
          <FormattedMessage defaultMessage="Locality" />
          <Hint popoverProps={{ position: 'top' }}>
            <Stack gap="xs">
              <Text size="sm">
                <FormattedMessage defaultMessage="An smaller administrative division" />
              </Text>
              <Divider />
              <Text size="xs">
                <FormattedMessage defaultMessage="City, town, village or something." />
              </Text>
            </Stack>
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
          placeholder="Any Town"
          autocomplete="address-level2"
          value={locality.value}
          error={
            !locality.valid && (
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
            setLocality(nes(event.currentTarget.value))
            setRecoilLocality(nes(event.currentTarget.value))
          }}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default LocalityInput
