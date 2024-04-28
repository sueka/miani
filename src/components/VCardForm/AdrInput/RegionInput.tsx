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
import { listComponent, textValue } from '../../../patterns'
import regionState from '../../../recoil/atoms/adr/regionState'
import sharedState from '../../../recoil/atoms/sharedState'
import versionState from '../../../recoil/atoms/vCard/versionState'

const RegionInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilRegion, setRecoilRegion] = useRecoilState(regionState)
  const [shared, setShared] = useRecoilState(sharedState(regionState.key))
  const inputId = useMemo(v4, [])

  const [region, setRegion] = useValidatedState<string | null>(
    recoilRegion,
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
    setRegion(recoilRegion)
  }, [setRegion, recoilRegion])

  return (
    <Input.Wrapper
      label={
        <>
          <FormattedMessage defaultMessage="Region" />
          <Hint popoverProps={{ position: 'top' }}>
            <Stack gap="xs">
              <Text size="sm">
                <FormattedMessage defaultMessage="A first-level administrative division of the country" />
              </Text>
              <Divider />
              <Text size="xs">
                <FormattedMessage defaultMessage="State in the US, prefecture (todōfuken 都道府県) in Japan, etc." />
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
          placeholder="CA"
          autocomplete="address-level1"
          value={region.value}
          error={
            !region.valid && (
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
            setRegion(nes(event.currentTarget.value))
            setRecoilRegion(nes(event.currentTarget.value))
          }}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default RegionInput
