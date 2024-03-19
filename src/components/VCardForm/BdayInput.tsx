import { Checkbox, Group, Input } from '@mantine/core'
import { DatePicker } from '@mantine/dates'
import React, { useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import toLegacyDate from '../../lib/Temporal/toLegacyDate'
import toPlainDate from '../../lib/Temporal/toPlainDate'
import bdayState from '../../recoil/atoms/bday/bdayState'
import noYearState from '../../recoil/atoms/bday/noYearState'
import sharedState from '../../recoil/atoms/sharedState'

const BdayInput: React.FC = () => {
  const { locale } = useIntl()
  const [bday, setBday] = useRecoilState(bdayState)
  const [date, setDate] = useState(bday !== null ? toLegacyDate(bday) : null)
  const [shared, setShared] = useRecoilState(sharedState(bdayState.key))
  const [noYear, setMonthDay] = useRecoilState(noYearState)

  return (
    <Input.Wrapper label={<FormattedMessage defaultMessage="Birth date" />}>
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
        label={<FormattedMessage defaultMessage="Omits the year of birth." />}
      />
    </Input.Wrapper>
  )
}

export default BdayInput
