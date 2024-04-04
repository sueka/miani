import { Container, Group, Stack } from '@mantine/core'
import cls from 'classnames'

import classes from './App.module.css'
import VCardForm from './VCardForm/VCardForm'
import VCardQrCode from './VCardQrCode'
import VCardTextarea from './VCardTextarea/VCardTextarea'

const App = () => (
  <Container>
    <Group align="start">
      <Stack classNames={{ root: classes['FormStack'] }}>
        <VCardForm />
      </Stack>
      <Stack
        classNames={{
          root: cls(classes['VCardStack'], classes['Sticky']),
        }}
      >
        <VCardTextarea />
        <VCardQrCode />
      </Stack>
    </Group>
  </Container>
)

export default App
