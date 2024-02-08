import { Container, Grid } from '@mantine/core'

import VCardForm from './VCardForm'
import VCardTextarea from './VCardTextarea'

const App = () => (
  <Container>
    <Grid>
      <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
        <VCardForm />
      </Grid.Col>
      <Grid.Col span={{ xs: 12, sm: 6, md: 8 }}>
        <VCardTextarea />
      </Grid.Col>
    </Grid>
  </Container>
)

export default App
