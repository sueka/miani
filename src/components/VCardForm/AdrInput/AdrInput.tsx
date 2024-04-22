import { Divider, Input, SegmentedControl, Stack } from '@mantine/core'
import { useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'
import { v4 } from 'uuid'

import assert from '../../../lib/assert'
import variantState from '../../../recoil/atoms/adr/variantState'
import CountryNameInput from './CountryNameInput'
import ExtendedAddressInput from './ExtendedAddressInput'
import LocalityInput from './LocalityInput'
import PlainAdrInput from './PlainAdrInput'
import PostOfficeBoxInput from './PostOfficeBoxInput'
import PostalCodeInput from './PostalCodeInput'
import RegionInput from './RegionInput'
import StreetAddressInput from './StreetAddressInput'

const AdrInput: React.FC = () => {
  const [variant, setVariant] = useRecoilState(variantState)
  const inputId = useMemo(v4, [])
  const { locale } = useIntl()

  return (
    <>
      <Input.Wrapper
        label={<FormattedMessage defaultMessage="Address" />}
        labelProps={{ htmlFor: inputId }}
      >
        <Stack gap="xs">
          <SegmentedControl
            data={[
              {
                value: 'plainText',
                label: <FormattedMessage defaultMessage="Plain text" />,
              },
              {
                value: 'components',
                label: <FormattedMessage defaultMessage="Components" />,
              },
            ]}
            value={variant}
            onChange={(value) => {
              assert(value === 'plainText' || value === 'components')
              setVariant(value)
            }}
          />
          {variant === 'plainText' && <PlainAdrInput id={inputId} />}
          {variant === 'components' &&
            (locale === 'ja' ? (
              <>
                <CountryNameInput id={inputId} />
                <PostalCodeInput />
                <RegionInput />
                <LocalityInput />
                <StreetAddressInput />
                <ExtendedAddressInput />
                <PostOfficeBoxInput />
              </>
            ) : ( // for 'en' or otherwise
              <>
                <PostOfficeBoxInput id={inputId} />
                <ExtendedAddressInput />
                <StreetAddressInput />
                <LocalityInput />
                <RegionInput />
                <PostalCodeInput />
                <CountryNameInput />
              </>
            ))}
        </Stack>
      </Input.Wrapper>
      <Divider />
    </>
  )
}

export default AdrInput
