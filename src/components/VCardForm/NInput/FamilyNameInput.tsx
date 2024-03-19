import { TextInput, type TextInputProps } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import exit from '../../../lib/exit'
import r from '../../../lib/tags/r'
import { listComponent, textValues } from '../../../patterns'
import familyNameState from '../../../recoil/atoms/n/familyNameState'
import versionState from '../../../recoil/atoms/vCard/versionState'

type Props = Pick<TextInputProps, 'id'>

const FamilyNameInput: React.FC<Props> = ({ id }) => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilFamilyName, setRecoilFamilyName] =
    useRecoilState(familyNameState)

  const [familyName, setFamilyName] = useValidatedState<string | null>(
    recoilFamilyName,
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
    setFamilyName(recoilFamilyName)
  }, [setFamilyName, recoilFamilyName])

  return (
    <TextInput
      id={id}
      label={<FormattedMessage defaultMessage="Family Name" />}
      placeholder="Public"
      value={familyName.value}
      error={
        !familyName.valid && (
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
        setFamilyName(event.currentTarget.value)
        setRecoilFamilyName(event.currentTarget.value)
      }}
    />
  )
}

export default FamilyNameInput
