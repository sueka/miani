import { Input, SegmentedControl, Stack } from '@mantine/core'
import { useRecoilState } from 'recoil'

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

  return (
    <Input.Wrapper
      withAsterisk
      label="N"
      description={
        <>
          Specifies the components of the <mark>name</mark> of the object the
          vCard represents.
        </>
      }
    >
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
        {variant === 'plainText' && <PlainNInput />}
        {variant === 'components' && (
          <>
            <FamilyNameInput />
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
