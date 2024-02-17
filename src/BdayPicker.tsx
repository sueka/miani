import { Input } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React from 'react'
import { useRecoilState } from 'recoil'

import bdayState from './recoil/atoms/bdayState'

const BdayPicker: React.FC = () => {
  const [bday, setBday] = useRecoilState(bdayState)

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
      <DatePicker
        allowDeselect
        value={bday}
        onChange={(newDate: Date | null) => {
          setBday(newDate)
        }}
      />
    </Input.Wrapper>
  )
}

export default BdayPicker
