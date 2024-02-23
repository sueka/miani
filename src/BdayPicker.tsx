import { Checkbox, Group, Input } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
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
      <Group gap="sm">
        <Checkbox
          checked={shared}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShared(event.currentTarget.checked)
          }}
        />
        <DatePicker
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
