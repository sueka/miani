import { Fieldset, TagsInput } from '@mantine/core'
import { useRecoilState } from 'recoil'
import AnyInput from './AnyInput'
import anyTypesState from './recoil/atoms/anyTypesState'

const OtherInputs: React.FC = () => {
  const [anyTypes, setAnyTypes] = useRecoilState(anyTypesState)

  return (
    <Fieldset legend="Others">
      <TagsInput value={anyTypes} onChange={setAnyTypes} />
      {anyTypes.map((type) => (
        <AnyInput {...{ type }} />
      ))}
    </Fieldset>
  )
}

export default OtherInputs
