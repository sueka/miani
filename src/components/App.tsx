import {
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { Container, Group, Stack, Text, Title } from '@mantine/core'
import cls from 'classnames'

import DndContext from '../@dnd-kit/providers/DndContext'
import MouseSensor from '../@dnd-kit/sensors/MouseSensor'
import classes from './App.module.css'
import VCardForm from './VCardForm/VCardForm'
import VCardQrCode from './VCardQrCode'
import VCardTextarea from './VCardTextarea/VCardTextarea'

const App: React.FC = () => {
  const mouseSensor = useSensor(MouseSensor)
  const touchSensor = useSensor(TouchSensor)
  const keyboardSensor = useSensor(KeyboardSensor)

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor)

  return (
    <DndContext sensors={sensors} modifiers={[restrictToParentElement]}>
      <Container>
        <Group align="baseline">
          <Title>Miani</Title>
          <Text>{__APP_VERSION__}</Text>
        </Group>
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
    </DndContext>
  )
}

export default App
