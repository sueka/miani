import { Checkbox, TextInput } from '@mantine/core'
import { useRecoilState } from 'recoil'
import anyState from './recoil/atoms/anyState'
import sharedState from './recoil/atoms/sharedState'

interface Props {
  type: string
}

const AnyInput: React.FC<Props> = ({ type }) => {
  const [any, setAny] = useRecoilState(anyState(type))
  const [shared, setShared] = useRecoilState(sharedState(anyState(type).key))

  return (
    <TextInput
      label={type}
      leftSection={
        <Checkbox
          checked={shared}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShared(event.currentTarget.checked)
          }}
        />
      }
      value={any}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setAny(event.currentTarget.value)
      }}
    />
  )
}

export default AnyInput
