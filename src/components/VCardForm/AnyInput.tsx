import { Checkbox, Group, Input, TextInput } from '@mantine/core'
import { useRecoilState } from 'recoil'
import anyState from '../../recoil/atoms/anyState'
import sharedState from '../../recoil/atoms/sharedState'

interface Props {
  type: string
}

const AnyInput: React.FC<Props> = ({ type }) => {
  const [any, setAny] = useRecoilState(anyState(type))
  const [shared, setShared] = useRecoilState(sharedState(anyState(type).key))

  return (
    <Input.Wrapper label={type}>
      <Group gap="xs">
        <Checkbox
          checked={shared}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShared(event.currentTarget.checked)
          }}
        />
        <TextInput
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
