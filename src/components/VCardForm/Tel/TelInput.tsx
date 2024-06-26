import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Input,
  TextInput,
  ThemeIcon,
} from '@mantine/core'
import { useDisclosure, useValidatedState } from '@mantine/hooks'
import { IconBackspace, IconGripVertical } from '@tabler/icons-react'
import { useLayoutEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import DndContext from '../../../extensions/@dnd-kit/providers/DndContext'
import Modal from '../../../extensions/@mantine/core/Modal'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { phoneNumberValue } from '../../../patterns/vCard'
import sharedState from '../../../recoil/states/sharedState'
import telIdsState from '../../../recoil/states/tel/telIdsState'
import telState from '../../../recoil/states/tel/telState'

interface Props {
  telId: string
}

const TelInput: React.FC<Props> = ({ telId }) => {
  const { formatMessage } = useIntl()
  const [recoilTel, setRecoilTel] = useRecoilState(telState(telId))
  const [shared, setShared] = useRecoilState(sharedState(telState(telId).key))
  const resetTel = useResetRecoilState(telState(telId))
  const setTelIds = useSetRecoilState(telIdsState)

  const [tel, setTel] = useValidatedState<string | null>(
    recoilTel,
    (value) =>
      value === null ||
      // value === '' ||
      r`^${phoneNumberValue}$`.test(value),
  )

  useLayoutEffect(() => {
    setTel(recoilTel)
  }, [setTel, recoilTel])

  const {
    attributes,
    listeners,
    setNodeRef: draggable,
    setActivatorNodeRef: handle,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: telId })

  const [
    deleteConfirmOpen,
    { open: openDeleteConfirm, close: closeDeleteConfirm },
  ] = useDisclosure()

  return (
    <Input.Wrapper
      ref={draggable}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.2 : undefined,
      }}
      error={
        !tel.valid && (
          <span
            dangerouslySetInnerHTML={{
              __html: formatMessage({
                defaultMessage:
                  'Should be a <i>phone-number-value</i> on p. 37, RFC 2426.',
              }),
            }}
          />
        )
      }
    >
      <Group gap="xs">
        <Checkbox
          checked={shared}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShared(event.currentTarget.checked)
          }}
        />
        <TextInput
          flex={1}
          // NOTE: This phone number does not exist because "3" (and "6") are exclusive area codes and local codes do not start with "0" in Japan (+81).
          placeholder="+81-3-0123-4567"
          autoComplete="tel"
          value={tel.value ?? ''}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setTel(nes(event.currentTarget.value))
            setRecoilTel(nes(event.currentTarget.value))
          }}
          error={!tel.valid}
        />
        <ActionIcon
          variant="light"
          onClick={() => {
            if (!(tel.value ?? '').match(/^\s*$/)) {
              openDeleteConfirm()
            } else {
              resetTel()
              setTelIds((telIds) => telIds.filter((t) => t !== telId))
            }
          }}
        >
          <IconBackspace />
        </ActionIcon>
        <DndContext modifiers={[restrictToWindowEdges]}>
          <Modal
            opened={deleteConfirmOpen}
            onClose={closeDeleteConfirm}
            title={
              <FormattedMessage
                defaultMessage="Delete the phone number: {tel}"
                values={{ tel: tel.value }}
              />
            }
          >
            <Group justify="end">
              <Button
                color="red"
                onClick={() => {
                  resetTel()
                  setTelIds((telIds) => telIds.filter((t) => t !== telId))
                }}
              >
                <FormattedMessage defaultMessage="Delete" />
              </Button>
            </Group>
          </Modal>
        </DndContext>
        <ThemeIcon
          color="gray"
          variant="transparent"
          ref={handle}
          {...listeners}
          style={{
            touchAction: 'none',
          }}
        >
          <IconGripVertical />
        </ThemeIcon>
      </Group>
    </Input.Wrapper>
  )
}

export default TelInput
