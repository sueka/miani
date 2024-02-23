import { Checkbox, Group, Input } from '@mantine/core'
import { DatePickerInput } from '@mantine/dates'
import React from 'react'
import { useRecoilState } from 'recoil'

import noYearState from './recoil/atoms/bday/noYearState'
import bdayState from './recoil/atoms/bdayState'
import sharedState from './recoil/atoms/sharedState'

const BdayInput: React.FC = () => {
  const [bday, setBday] = useRecoilState(bdayState)
  const [shared, setShared] = useRecoilState(sharedState(bdayState.key))
  const [noYear, setMonthDay] = useRecoilState(noYearState)

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
      <Checkbox
        checked={noYear}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMonthDay(event.currentTarget.checked)
        }}
        label="Omits the year of birth of the object the vCard represents."
      />
    </Input.Wrapper>
  )
}

export default BdayInput
