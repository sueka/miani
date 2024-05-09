import { Input, SegmentedControl, Stack } from '@mantine/core'
import { FormattedMessage } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'
import assert from '../../../lib/assert'
import valueParamState from '../../../recoil/atoms/bday/valueParamState'
import versionState from '../../../recoil/atoms/vCard/versionState'
import BdayDateTimeInput from './BdayDateTimeInput'
import BdayTextInput from './BdayTextInput'

const BdayInput: React.FC = () => {
  const version = useRecoilValue(versionState)
  const [valueParam, setValueParam] = useRecoilState(valueParamState)

  return (
    <Input.Wrapper label={<FormattedMessage defaultMessage="Birth date" />}>
      {version === '3.0' && <BdayDateTimeInput />}
      {version === '4.0' && (
        <Stack>
          <SegmentedControl
            data={[
              {
                value: 'date-and-or-time',
                label: <FormattedMessage defaultMessage="Date" />,
              },
              {
                value: 'text',
                label: <FormattedMessage defaultMessage="Text" />,
              },
            ]}
            value={valueParam}
            onChange={(value) => {
              assert(value === 'date-and-or-time' || value === 'text')
              setValueParam(value)
            }}
          />
          {valueParam === 'date-and-or-time' && <BdayDateTimeInput />}
          {valueParam === 'text' && <BdayTextInput />}
        </Stack>
      )}
    </Input.Wrapper>
  )
}

export default BdayInput
