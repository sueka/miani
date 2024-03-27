import { Stack } from '@mantine/core'
import { FormattedMessage } from 'react-intl'
import { useRecoilValue } from 'recoil'

import Fieldset from '../../../lib/components/Fieldset'
import versionState from '../../../recoil/atoms/vCard/versionState'
import AdditionalNamesInput from './AdditionalNamesInput'
import FamilyNameInput from './FamilyNameInput'
import GivenNameInput from './GivenNameInput'
import HonorificPrefixesInput from './HonorificPrefixesInput'
import HonorificSuffixesInput from './HonorificSuffixesInput'

const NInput: React.FC = () => {
  const version = useRecoilValue(versionState)

  return (
    <Fieldset
      withAsterisk={version === '3.0'}
      legend={<FormattedMessage defaultMessage="Name" />}
    >
      <Stack gap="xs">
        <FamilyNameInput />
        <GivenNameInput />
        <AdditionalNamesInput />
        <HonorificPrefixesInput />
        <HonorificSuffixesInput />
      </Stack>
    </Fieldset>
  )
}

export default NInput
