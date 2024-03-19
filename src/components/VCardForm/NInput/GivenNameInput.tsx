import { TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import exit from '../../../lib/exit'
import r from '../../../lib/tags/r'
import { listComponent, textValues } from '../../../patterns'
import givenNameState from '../../../recoil/atoms/n/givenNameState'
import versionState from '../../../recoil/atoms/vCard/versionState'

const GivenNameInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilGivenName, setRecoilGivenName] = useRecoilState(givenNameState)

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
    <TextInput
      label={<FormattedMessage defaultMessage="Given Name" />}
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
        setGivenName(event.currentTarget.value)
        setRecoilGivenName(event.currentTarget.value)
      }}
    />
  )
}

export default GivenNameInput
