import { TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import r from '../../../lib/tags/r'
import { textValues } from '../../../patterns'
import honorificPrefixesState from '../../../recoil/atoms/n/honorificPrefixesState'

const HonorificPrefixesInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const [recoilHonorificPrefixes, setRecoilHonorificPrefixes] = useRecoilState(
    honorificPrefixesState,
  )

  const [honorificPrefixes, setHonorificPrefixes] = useValidatedState<
    string | null
  >(
    recoilHonorificPrefixes?.join(',') ?? null,
    (value) => value === null || r`^${textValues}$`.test(value),
  )

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
              __html: formatMessage({
                defaultMessage:
                  'Should be comma-separated <i>text-value</i>s on p. 37, RFC 2426.',
              }),
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
