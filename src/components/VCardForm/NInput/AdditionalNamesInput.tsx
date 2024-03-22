import { TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import exit from '../../../lib/exit'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { listComponent, textValues } from '../../../patterns'
import additionalNamesState from '../../../recoil/atoms/n/additionalNamesState'
import versionState from '../../../recoil/atoms/vCard/versionState'

const AdditionalNamesInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilAdditionalNames, setRecoilAdditionalNames] =
    useRecoilState(additionalNamesState)

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

  useEffect(() => {
    setAdditionalNames(recoilAdditionalNames?.join(',') ?? null)
  }, [setAdditionalNames, recoilAdditionalNames])

  return (
    <TextInput
      label={<FormattedMessage defaultMessage="Additional Names" />}
      placeholder="Quinlan"
      value={additionalNames.value ?? undefined}
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
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setAdditionalNames(nes(event.currentTarget.value))
        setRecoilAdditionalNames(
          nes(event.currentTarget.value)?.split(',') ?? null, //
        )
      }}
    />
  )
}

export default AdditionalNamesInput
