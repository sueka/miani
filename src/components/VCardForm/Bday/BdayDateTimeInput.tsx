import { Checkbox, Group } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import toLegacyDate from '../../../lib/Temporal/toLegacyDate'
import toPlainDate from '../../../lib/Temporal/toPlainDate'
import bdayDateTimeState from '../../../recoil/states/bday/bdayDateTimeState'
import noYearState from '../../../recoil/states/bday/noYearState'
import sharedState from '../../../recoil/states/sharedState'

const BdayDateTimeInput: React.FC = () => {
  const { locale } = useIntl()
  const [bday, setBday] = useRecoilState(bdayDateTimeState)
  const [date, setDate] = useState(bday !== null ? toLegacyDate(bday) : null)
  const [shared, setShared] = useRecoilState(sharedState(bdayDateTimeState.key))
  const [noYear, setMonthDay] = useRecoilState(noYearState)

  return (
    <>
      <Group gap="sm" wrap="nowrap">
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
          locale={locale}
        />
      </Group>
      <Checkbox
        checked={noYear}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setMonthDay(event.currentTarget.checked)
        }}
        label={<FormattedMessage defaultMessage="Omits the year of birth" />}
      />
    </>
  )
}

export default BdayDateTimeInput
