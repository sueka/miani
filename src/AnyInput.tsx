import { TextInput } from '@mantine/core'
import { useRecoilState } from 'recoil'
import anyState from './recoil/atoms/anyState'

interface Props {
  type: string
}

const AnyInput: React.FC<Props> = ({ type }) => {
  const [any, setAny] = useRecoilState(anyState(type))

  return (
    <TextInput
      label={type}
      value={any}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setAny(event.currentTarget.value)
      }}
    />
  )
}

export default AnyInput
