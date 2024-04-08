import { Stack } from '@mantine/core'
import AdrInput from './AdrInput/AdrInput'
import BdayInput from './BdayInput/BdayInput'
import FnInput from './FnInput'
import NInput from './NInput/NInput'
import OtherInputs from './OtherInputs'
import TelInputs from './TelInputs'
import XPhoneticNamesInput from './XPhoneticNamesInput'

const VCardForm: React.FC = () => (
  <Stack gap="xs">
    <FnInput />
    <NInput />
    <XPhoneticNamesInput />
    <BdayInput />
    <AdrInput />
    <TelInputs />
    <OtherInputs />
  </Stack>
)

export default VCardForm
