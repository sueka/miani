import { Stack } from '@mantine/core'
import BdayInput from './BdayInput'
import FnInput from './FnInput'
import NInput from './NInput/NInput'
import OtherInputs from './OtherInputs'
import TelInputs from './TelInputs'

const VCardForm: React.FC = () => (
  <Stack gap="xs">
    <FnInput />
    <NInput />
    <BdayInput />
    <TelInputs />
    <OtherInputs />
  </Stack>
)

export default VCardForm
