import {
  KeyboardSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import { AppShell, Group, Stack, Text, Title, rem } from '@mantine/core'
import cls from 'classnames'

import DndContext from '../extensions/@dnd-kit/providers/DndContext'
import MouseSensor from '../extensions/@dnd-kit/sensors/MouseSensor'
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
      <AppShell
        header={{ height: 60 }}
        padding="md" // Same as <Group px>
      >
        <AppShell.Header style={{ position: 'revert' }}>
          <Group
            h="100%"
            px="md" // Same as <AppShell padding>
            vars={() => ({
              root: {
                '--group-align': 'baseline',
              },
            })}
            style={{
              alignContent: 'center',
            }}
          >
            <Title size={rem(((1 + Math.sqrt(5)) / 2) * 16)}>Miani</Title>
            <Text>{__APP_VERSION__}</Text>
          </Group>
        </AppShell.Header>
        <AppShell.Main pt="var(--mantine-spacing-md)">
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
        </AppShell.Main>
      </AppShell>
    </DndContext>
  )
}

export default App
