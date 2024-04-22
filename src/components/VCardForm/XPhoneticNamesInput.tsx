import { Checkbox, Group, Input, TextInput } from '@mantine/core'
import { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilState } from 'recoil'
import { v4 } from 'uuid'
import nes from '../../lib/nes'
import sharedState from '../../recoil/atoms/sharedState'
import xState from '../../recoil/atoms/x/xState'
import xAccessor from '../../recoil/selectors/xAccessor'

const XPhoneticNamesInput: React.FC = () => {
  const [phoneticLastName, setPhoneticLastName] = useRecoilState(
    xAccessor('X-PHONETIC-LAST-NAME'),
  )
  const [phoneticFirstName, setPhoneticFirstName] = useRecoilState(
    xAccessor('X-PHONETIC-FIRST-NAME'),
  )
  const [phoneticLastNameShared, setPhoneticLastNameShared] = useRecoilState(
    sharedState(xState('X-PHONETIC-LAST-NAME').key),
  )
  const [phoneticFirstNameShared, setPhoneticFirstNameShared] = useRecoilState(
    sharedState(xState('X-PHONETIC-FIRST-NAME').key),
  )
  const phoneticLastNameInputId = useMemo(v4, [])
  const phoneticFirstNameInputId = useMemo(v4, [])

  return (
    <>
      <Input.Wrapper
        label={<FormattedMessage defaultMessage="Phonetic Last Name" />}
        labelProps={{ htmlFor: phoneticLastNameInputId }}
      >
        <Group gap="xs">
          <Checkbox
            checked={phoneticLastNameShared}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPhoneticLastNameShared(event.currentTarget.checked)
            }}
          />
          <TextInput
            id={phoneticLastNameInputId}
            flex={1}
            autocomplete="family-name"
            value={phoneticLastName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPhoneticLastName(nes(event.currentTarget.value))
            }}
          />
        </Group>
      </Input.Wrapper>
      <Input.Wrapper
        label={<FormattedMessage defaultMessage="Phonetic First Name" />}
        labelProps={{ htmlFor: phoneticFirstNameInputId }}
      >
        <Group gap="xs">
          <Checkbox
            checked={phoneticFirstNameShared}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPhoneticFirstNameShared(event.currentTarget.checked)
            }}
          />
          <TextInput
            id={phoneticFirstNameInputId}
            flex={1}
            autocomplete="given-name"
            value={phoneticFirstName}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPhoneticFirstName(nes(event.currentTarget.value))
            }}
          />
        </Group>
      </Input.Wrapper>
    </>
  )
}

export default XPhoneticNamesInput
