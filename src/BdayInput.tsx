import { Checkbox, Group, Input } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
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
      <Group gap="sm">
        <Checkbox
          checked={shared}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShared(event.currentTarget.checked)
          }}
        />
        <DatePicker
          allowDeselect
          value={bday?.toLegacyDate() ?? null}
          onChange={(newDate: Date | null) => {
            setBday(newDate?.toPlainDate() ?? null)
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
