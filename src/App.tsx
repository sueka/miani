import { Container, Grid } from '@mantine/core'

import classes from './App.module.css'
import VCardForm from './VCardForm'
import VCardQrCode from './VCardQrCode'
import VCardTextarea from './VCardTextarea'

const App = () => (
  <Container>
    <Grid>
      <Grid.Col span={{ xs: 12, sm: 6, md: 4 }}>
        <VCardForm />
      </Grid.Col>
      <Grid.Col
        span={{ xs: 12, sm: 6, md: 4 }}
        className={classes['GridColSticky']}
      >
        <VCardTextarea classNames={{ root: classes['Sticky'] }} />
      </Grid.Col>
      <Grid.Col
        span={{ xs: 12, sm: 12, md: 4 }}
        className={classes['GridColSticky']}
      >
        <VCardQrCode classNames={{ wrapper: classes['Sticky'] }} />
      </Grid.Col>
    </Grid>
  </Container>
)

export default App
