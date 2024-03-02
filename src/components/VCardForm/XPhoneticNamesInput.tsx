import { TextInput } from '@mantine/core'
import { FormattedMessage } from 'react-intl'
import { useRecoilState } from 'recoil'
import xState from '../../recoil/selectors/xState'

const XPhoneticNamesInput: React.FC = () => {
  const [phoneticLastName, setPhoneticLastName] = useRecoilState(
    xState('X-PHONETIC-LAST-NAME'),
  )
  const [phoneticFirstName, setPhoneticFirstName] = useRecoilState(
    xState('X-PHONETIC-FIRST-NAME'),
  )

  return (
    <>
      <TextInput
        label={<FormattedMessage defaultMessage="Phonetic Last Name" />}
        value={phoneticLastName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPhoneticLastName(event.currentTarget.value)
        }}
      />
      <TextInput
        label={<FormattedMessage defaultMessage="Phonetic First Name" />}
        value={phoneticFirstName}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setPhoneticFirstName(event.currentTarget.value)
        }}
      />
    </>
  )
}

export default XPhoneticNamesInput
