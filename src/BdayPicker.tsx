import { Checkbox, Group, Input } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import React from 'react'
import { useRecoilState } from 'recoil'

import bdayState from './recoil/atoms/bdayState'
import sharedState from './recoil/atoms/sharedState'

const BdayPicker: React.FC = () => {
  const [bday, setBday] = useRecoilState(bdayState)
  const [shared, setShared] = useRecoilState(sharedState(bdayState.key))

  return (
    <Input.Wrapper
      label="BDAY"
      description={
        <>
          Specifies the <mark>birth date</mark> of the object the vCard
          represents.
        </>
      }
    >
      <Group
        // TODO: Delete this styles if <DatePickerInput> supports <Input.Wrapper> completely.
        mb={{ base: -5 }} // half of xs
        gap="xs"
      >
        <Checkbox
          checked={shared}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShared(event.currentTarget.checked)
          }}
        />
        <DatePickerInput
          // TODO: Delete this styles if <DatePickerInput> supports <Input.Wrapper> completely.
          my={{ base: 5 }} // half of xs
          flex={1}
          allowDeselect
          value={bday}
          onChange={(newDate: Date | null) => {
            setBday(newDate)
          }}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default BdayPicker
