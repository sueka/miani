import { Input, SegmentedControl, Stack } from '@mantine/core'
import { useMemo } from 'react'
import { useRecoilState } from 'recoil'
import { v4 } from 'uuid'

import assert from '../../../lib/assert'
import variantState from '../../../recoil/atoms/n/variantState'
import AdditionalNamesInput from './AdditionalNamesInput'
import FamilyNameInput from './FamilyNameInput'
import GivenNameInput from './GivenNameInput'
import HonorificPrefixesInput from './HonorificPrefixesInput'
import HonorificSuffixesInput from './HonorificSuffixesInput'
import PlainNInput from './PlainNInput'

const NInput: React.FC = () => {
  const [variant, setVariant] = useRecoilState(variantState)
  const inputId = useMemo(v4, [])

  return (
    <Input.Wrapper withAsterisk label="Name" labelProps={{ htmlFor: inputId }}>
      <Stack gap="xs">
        <SegmentedControl
          data={[
            { value: 'plainText', label: 'Plain text' },
            { value: 'components', label: 'Components' },
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
  )
}

export default NInput
