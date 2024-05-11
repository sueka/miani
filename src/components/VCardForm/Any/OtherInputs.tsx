import { Fieldset, Stack, TagsInput } from '@mantine/core'
import { FormattedMessage } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'
import anyIdsState from '../../../recoil/atoms/any/anyIdsState'
import anyTypesState from '../../../recoil/selectors/any/anyTypesState'
import AnyInput from './AnyInput'

const OtherInputs: React.FC = () => {
  const [anyTypes, setAnyTypes] = useRecoilState(anyTypesState)
  const anyIds = useRecoilValue(anyIdsState)

  return (
    <Fieldset
      legend={<FormattedMessage defaultMessage="Others" />}
      px={{ base: 'md' }}
      pb={{ base: 'md' }}
    >
      <Stack gap="xs">
        <TagsInput value={anyTypes} onChange={setAnyTypes} />
        {anyIds.map((anyId) => (
          <AnyInput {...{ anyId }} />
        ))}
      </Stack>
    </Fieldset>
  )
}

export default OtherInputs
