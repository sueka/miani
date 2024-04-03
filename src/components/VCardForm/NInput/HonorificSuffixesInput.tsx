import { Checkbox, Group, Input, TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useLayoutEffect, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import { v4 } from 'uuid'
import exit from '../../../lib/exit'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { listComponent, textValues } from '../../../patterns'
import honorificSuffixesState from '../../../recoil/atoms/n/honorificSuffixesState'
import sharedState from '../../../recoil/atoms/sharedState'
import versionState from '../../../recoil/atoms/vCard/versionState'

const HonorificSuffixesInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilHonorificSuffixes, setRecoilHonorificSuffixes] = useRecoilState(
    honorificSuffixesState,
  )
  const [shared, setShared] = useRecoilState(
    sharedState(honorificSuffixesState.key),
  )
  const inputId = useMemo(v4, [])

  const [honorificSuffixes, setHonorificSuffixes] = useValidatedState<
    string | null
  >(recoilHonorificSuffixes?.join(',') ?? null, (value) => {
    switch (version) {
      case '3.0':
        return value === null || r`^${textValues}$`.test(value)

      case '4.0':
        return value === null || r`^${listComponent}$`.test(value)
    }
  })

  useLayoutEffect(() => {
    setHonorificSuffixes(recoilHonorificSuffixes?.join(',') ?? null)
  }, [setHonorificSuffixes, recoilHonorificSuffixes])

  return (
    <Input.Wrapper
      label={<FormattedMessage defaultMessage="Honorific Suffixes" />}
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
          placeholder="Esq."
          value={honorificSuffixes.value ?? undefined}
          error={
            !honorificSuffixes.valid && (
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
            setHonorificSuffixes(nes(event.currentTarget.value))
            setRecoilHonorificSuffixes(
              nes(event.currentTarget.value)?.split(',') ?? null, //
            )
          }}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default HonorificSuffixesInput
