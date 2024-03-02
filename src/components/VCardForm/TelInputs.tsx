import { Button, Input, Stack } from '@mantine/core'
import { FormattedMessage } from 'react-intl'
import { useRecoilState } from 'recoil'
import { ulid } from 'ulid'
import telIdsState from '../../recoil/atoms/telIdsState'
import TelInput from './TelInput'

const TelInputs: React.FC = () => {
  const [telIds, setTelIds] = useRecoilState(telIdsState)

  return (
    <Input.Wrapper
      label={<FormattedMessage defaultMessage="Telephone numbers" />}
    >
      <Stack gap="xs">
        {telIds.map((telId) => (
          <TelInput {...{ telId }} />
        ))}
        <Button
          onClick={() => {
            setTelIds((telIds) => [...telIds, ulid()])
          }}
        >
          <FormattedMessage defaultMessage="Add TEL" />
        </Button>
      </Stack>
    </Input.Wrapper>
  )
}

export default TelInputs
