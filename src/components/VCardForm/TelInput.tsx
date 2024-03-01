import { ActionIcon, Checkbox, Group, Input, TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { IconBackspace } from '@tabler/icons-react'
import { useEffect } from 'react'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'

import r from '../../lib/tags/r'
import { phoneNumberValue } from '../../patterns'
import sharedState from '../../recoil/atoms/sharedState'
import telIdsState from '../../recoil/atoms/telIdsState'
import telState from '../../recoil/atoms/telState'

interface Props {
  telId: string
}

const TelInput: React.FC<Props> = ({ telId }) => {
  const [recoilTel, setRecoilTel] = useRecoilState(telState(telId))
  const [shared, setShared] = useRecoilState(sharedState(telState(telId).key))
  const resetTel = useResetRecoilState(telState(telId))
  const setTelIds = useSetRecoilState(telIdsState)

  const [tel, setTel] = useValidatedState<string | null>(
    recoilTel,
    (value) =>
      !shared ||
      value === null ||
      value === '' ||
      r`^${phoneNumberValue}$`.test(value),
  )

  useEffect(() => {
    setTel(recoilTel)
  }, [setTel, recoilTel])

  return (
    <Input.Wrapper
      error={
        !tel.valid && (
          <>
            Should be a <i>phone-number-value</i> on p. 37, RFC 2426.
          </>
        )
      }
    >
      <Group gap="xs">
        <Checkbox
          checked={shared}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShared(event.currentTarget.checked)
          }}
        />
        <TextInput
          flex={1}
          // NOTE: This phone number does not exist because "3" (and "6") are exclusive area codes and local codes do not start with "0" in Japan (+81).
          placeholder="+81-3-0123-4567"
          value={tel.value}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTel(event.currentTarget.value)
            setRecoilTel(event.currentTarget.value)
          }}
          error={!tel.valid}
        />
        <ActionIcon
          variant="light"
          onClick={() => {
            if (confirm(`Delete the phone number: ${tel.value}`)) {
              resetTel()
              setTelIds((telIds) => telIds.filter((t) => t !== telId))
            }
          }}
        >
          <IconBackspace />
        </ActionIcon>
      </Group>
    </Input.Wrapper>
  )
}

export default TelInput
