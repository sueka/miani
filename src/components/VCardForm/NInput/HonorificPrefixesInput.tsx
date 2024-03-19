import { TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import exit from '../../../lib/exit'
import r from '../../../lib/tags/r'
import { listComponent, textValues } from '../../../patterns'
import honorificPrefixesState from '../../../recoil/atoms/n/honorificPrefixesState'
import versionState from '../../../recoil/atoms/vCard/versionState'

const HonorificPrefixesInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilHonorificPrefixes, setRecoilHonorificPrefixes] = useRecoilState(
    honorificPrefixesState,
  )

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

  useEffect(() => {
    setHonorificPrefixes(recoilHonorificPrefixes?.join(',') ?? null)
  }, [setHonorificPrefixes, recoilHonorificPrefixes])

  return (
    <TextInput
      label={<FormattedMessage defaultMessage="Honorific Prefixes" />}
      placeholder="Mr."
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
        setHonorificPrefixes(event.currentTarget.value)
        setRecoilHonorificPrefixes(event.currentTarget.value.split(',')) //
      }}
    />
  )
}

export default HonorificPrefixesInput
