import { Stack } from '@mantine/core'
import AdrInput from './Adr/AdrInput'
import OtherInputs from './Any/OtherInputs'
import BdayInput from './Bday/BdayInput'
import FnInput from './FnInput'
import NInput from './N/NInput'
import TelInputs from './Tel/TelInputs'
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
