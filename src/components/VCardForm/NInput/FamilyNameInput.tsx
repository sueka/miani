import { TextInput, type TextInputProps } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import r from '../../../lib/tags/r'
import { textValues } from '../../../patterns'
import familyNameState from '../../../recoil/atoms/n/familyNameState'

type Props = Pick<TextInputProps, 'id'>

const FamilyNameInput: React.FC<Props> = ({ id }) => {
  const { formatMessage } = useIntl()
  const [recoilFamilyName, setRecoilFamilyName] =
    useRecoilState(familyNameState)

  const [familyName, setFamilyName] = useValidatedState<string | null>(
    recoilFamilyName,
    (value) => value === null || r`^${textValues}$`.test(value),
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
              __html: formatMessage({
                defaultMessage:
                  'Should be comma-separated <i>text-value</i>s on p. 37, RFC 2426.',
              }),
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
