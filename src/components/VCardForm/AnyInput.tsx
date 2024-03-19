import { Checkbox, Group, Input, TextInput } from '@mantine/core'
import { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { v4 } from 'uuid'
import anyState from '../../recoil/atoms/any/anyState'
import sharedState from '../../recoil/atoms/sharedState'

interface Props {
  type: string
}

const AnyInput: React.FC<Props> = ({ type }) => {
  const [any, setAny] = useRecoilState(anyState(type))
  const [shared, setShared] = useRecoilState(sharedState(anyState(type).key))
  const inputId = useMemo(v4, [])

  return (
    <Input.Wrapper label={type} labelProps={{ htmlFor: inputId }}>
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
          value={any}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setAny(event.currentTarget.value)
          }}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default AnyInput
