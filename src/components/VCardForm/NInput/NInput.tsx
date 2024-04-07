import { Divider, Input, SegmentedControl, Stack } from '@mantine/core'
import { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 } from 'uuid'

import assert from '../../../lib/assert'
import variantState from '../../../recoil/atoms/n/variantState'
import versionState from '../../../recoil/atoms/vCard/versionState'
import AdditionalNamesInput from './AdditionalNamesInput'
import FamilyNameInput from './FamilyNameInput'
import GivenNameInput from './GivenNameInput'
import HonorificPrefixesInput from './HonorificPrefixesInput'
import HonorificSuffixesInput from './HonorificSuffixesInput'
import PlainNInput from './PlainNInput'

const NInput: React.FC = () => {
  const [variant, setVariant] = useRecoilState(variantState)
  const version = useRecoilValue(versionState)
  const inputId = useMemo(v4, [])

  return (
    <>
      <Input.Wrapper
        withAsterisk={version === '3.0'}
        label={<FormattedMessage defaultMessage="Name" />}
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
          {variant === 'plainText' && <PlainNInput id={inputId} />}
          {variant === 'components' && (
            <>
              <FamilyNameInput id={inputId} />
              <GivenNameInput />
              <AdditionalNamesInput />
              <HonorificPrefixesInput />
              <HonorificSuffixesInput />
            </>
          )}
        </Stack>
      </Input.Wrapper>
      <Divider />
    </>
  )
}

export default NInput
