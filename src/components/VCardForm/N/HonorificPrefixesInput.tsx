import { Checkbox, Group, Input, TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useLayoutEffect, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { v4 } from 'uuid'
import exit from '../../../lib/exit'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { textValues } from '../../../patterns/vCard'
import { listComponent } from '../../../patterns/vCard4'
import honorificPrefixesState from '../../../recoil/states/n/honorificPrefixesState'
import sharedState from '../../../recoil/states/sharedState'
import versionState from '../../../recoil/states/vCard/versionState'

const HonorificPrefixesInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilHonorificPrefixes, setRecoilHonorificPrefixes] = useRecoilState(
    honorificPrefixesState,
  )
  const [shared, setShared] = useRecoilState(
    sharedState(honorificPrefixesState.key),
  )
  const inputId = useMemo(v4, [])

  const [honorificPrefixes, setHonorificPrefixes] = useValidatedState<
    string | null
  >(recoilHonorificPrefixes?.join(',') ?? null, (value) => {
    switch (version) {
      case '3.0':
        return value === null || r`^${textValues}$`.test(value)

      case '4.0':
        return value === null || r`^${listComponent}$`.test(value)
    }
  })

  useLayoutEffect(() => {
    setHonorificPrefixes(recoilHonorificPrefixes?.join(',') ?? null)
  }, [setHonorificPrefixes, recoilHonorificPrefixes])

  return (
    <Input.Wrapper
      label={<FormattedMessage defaultMessage="Honorific Prefixes" />}
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
          placeholder="Mr."
          autoComplete="honorific-prefix"
          value={honorificPrefixes.value ?? undefined}
          error={
            !honorificPrefixes.valid && (
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
            setHonorificPrefixes(nes(event.currentTarget.value))
            setRecoilHonorificPrefixes(
              nes(event.currentTarget.value)?.split(',') ?? null, //
            )
          }}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default HonorificPrefixesInput
