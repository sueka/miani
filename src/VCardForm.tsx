import { Stack } from '@mantine/core'
import BdayInput from './BdayInput'
import FnInput from './FnInput'
import NInput from './NInput'
import OtherInputs from './OtherInputs'

const VCardForm: React.FC = () => (
  <Stack gap="xs">
    <FnInput />
    <NInput />
    <BdayInput />
    <OtherInputs />
  </Stack>
)

export default VCardForm
