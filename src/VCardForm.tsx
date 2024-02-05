import { Grid } from '@mantine/core'

import FnInput from './FnInput'
import NInput from './NInput'

const VCardForm: React.FC = () => (
  <Grid>
    <Grid.Col span={4}>
      <FnInput />
      <NInput />
    </Grid.Col>
  </Grid>
)

export default VCardForm
