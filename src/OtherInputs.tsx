import { Fieldset, Stack, TagsInput } from '@mantine/core'
import { useRecoilState } from 'recoil'
import AnyInput from './AnyInput'
import anyTypesState from './recoil/atoms/anyTypesState'

const OtherInputs: React.FC = () => {
  const [anyTypes, setAnyTypes] = useRecoilState(anyTypesState)

  return (
    <Fieldset legend="Others" px={{ base: 'md' }} pb={{ base: 'md' }}>
      <Stack gap="xs">
        <TagsInput value={anyTypes} onChange={setAnyTypes} />
        {anyTypes.map((type) => (
          <AnyInput {...{ type }} />
        ))}
      </Stack>
    </Fieldset>
  )
}

export default OtherInputs
