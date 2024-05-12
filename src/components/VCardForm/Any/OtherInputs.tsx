import { Button, Fieldset, Stack } from '@mantine/core'
import { FormattedMessage } from 'react-intl'
import { useRecoilState } from 'recoil'
import { ulid } from 'ulid'
import anyIdsState from '../../../recoil/atoms/any/anyIdsState'
import AnyInput from './AnyInput'

const OtherInputs: React.FC = () => {
  const [anyIds, setAnyIds] = useRecoilState(anyIdsState)

  return (
    <Fieldset
      legend={<FormattedMessage defaultMessage="Others" />}
      px={{ base: 'md' }}
      pb={{ base: 'md' }}
    >
      <Stack gap="xs">
        {anyIds.map((anyId) => (
          <AnyInput key={anyId} {...{ anyId }} />
        ))}
        <Button
          onClick={() => {
            setAnyIds((anyIds) => [...anyIds, ulid()])
          }}
        >
          <FormattedMessage defaultMessage="Add line" />
        </Button>
      </Stack>
    </Fieldset>
  )
}

export default OtherInputs
