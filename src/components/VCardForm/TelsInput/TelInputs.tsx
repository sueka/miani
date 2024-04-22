import { DndContext, type DragEndEvent, closestCenter } from '@dnd-kit/core'
import { restrictToParentElement } from '@dnd-kit/modifiers'
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { Button, Input, Stack } from '@mantine/core'
import { FormattedMessage } from 'react-intl'
import { useRecoilState } from 'recoil'
import { ulid } from 'ulid'
import assert from '../../../lib/assert'
import telIdsState from '../../../recoil/atoms/tel/telIdsState'
import TelInput from './TelInput'

const TelInputs: React.FC = () => {
  const [telIds, setTelIds] = useRecoilState(telIdsState)

  return (
    <Input.Wrapper
      label={<FormattedMessage defaultMessage="Telephone numbers" />}
    >
      <Stack gap="xs">
        <DndContext
          collisionDetection={closestCenter}
          onDragEnd={({ active, over }: DragEndEvent) => {
            if (over === null) {
              return // noop for no moves
            }

            if (active.id !== over.id) {
              setTelIds((items) => {
                assert(typeof active.id === 'string')
                assert(typeof over.id === 'string')

                const oldIndex = items.indexOf(active.id)
                const newIndex = items.indexOf(over.id)

                return arrayMove(items, oldIndex, newIndex)
              })
            }
          }}
          modifiers={[restrictToParentElement]}
        >
          <SortableContext
            items={telIds}
            strategy={verticalListSortingStrategy}
          >
            <Stack gap="xs">
              {telIds.map((telId) => (
                <TelInput key={telId} {...{ telId }} />
              ))}
            </Stack>
          </SortableContext>
        </DndContext>
        <Button
          onClick={() => {
            setTelIds((telIds) => [...telIds, ulid()])
          }}
        >
          <FormattedMessage defaultMessage="Add TEL" />
        </Button>
      </Stack>
    </Input.Wrapper>
  )
}

export default TelInputs
