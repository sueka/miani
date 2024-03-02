import { Fieldset, Stack, TagsInput } from '@mantine/core'
import { FormattedMessage } from 'react-intl'
import { useRecoilState } from 'recoil'
import anyTypesState from '../../recoil/atoms/anyTypesState'
import AnyInput from './AnyInput'

const OtherInputs: React.FC = () => {
  const [anyTypes, setAnyTypes] = useRecoilState(anyTypesState)

  return (
    <Fieldset
      legend={<FormattedMessage defaultMessage="Others" />}
      px={{ base: 'md' }}
      pb={{ base: 'md' }}
    >
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
