import { Stack } from '@mantine/core'
import BdayInput from './BdayInput'
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
    <TelInputs />
    <OtherInputs />
  </Stack>
)

export default VCardForm
