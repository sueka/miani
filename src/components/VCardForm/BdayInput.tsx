import { Checkbox, Group, Input } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, { useState } from 'react'
import { useRecoilState } from 'recoil'

import toLegacyDate from '../../lib/Temporal/toLegacyDate'
import toPlainDate from '../../lib/Temporal/toPlainDate'
import noYearState from '../../recoil/atoms/bday/noYearState'
import bdayState from '../../recoil/atoms/bdayState'
import sharedState from '../../recoil/atoms/sharedState'

const BdayInput: React.FC = () => {
  const [bday, setBday] = useRecoilState(bdayState)
  const [date, setDate] = useState(bday !== null ? toLegacyDate(bday) : null)
  const [shared, setShared] = useRecoilState(sharedState(bdayState.key))
  const [noYear, setMonthDay] = useRecoilState(noYearState)

  return (
    <Input.Wrapper label="Birth date">
      <Group gap="sm">
        <Checkbox
          checked={shared}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShared(event.currentTarget.checked)
          }}
        />
        <DatePicker
          allowDeselect
          date={date ?? undefined}
          onDateChange={(date: Date | undefined) => {
            setDate(date ?? null)
          }}
          value={bday !== null ? toLegacyDate(bday) : null}
          onChange={(newBday: Date | null) => {
            setBday(newBday !== null ? toPlainDate(newBday) : null)
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
