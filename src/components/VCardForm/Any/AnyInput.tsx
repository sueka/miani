import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Input,
  TextInput,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { IconBackspace } from '@tabler/icons-react'
import React, { useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil'
import { v4 } from 'uuid'
import DndContext from '../../../extensions/@dnd-kit/providers/DndContext'
import Modal from '../../../extensions/@mantine/core/Modal'
import nes from '../../../lib/nes'
import anyIdsState from '../../../recoil/atoms/any/anyIdsState'
import anyState from '../../../recoil/atoms/any/anyState'
import anyTypeState from '../../../recoil/atoms/any/anyTypeState'
import sharedState from '../../../recoil/atoms/sharedState'

interface Props {
  anyId: string
}

const AnyInput: React.FC<Props> = ({ anyId }) => {
  const { formatMessage } = useIntl()
  const [type, setType] = useRecoilState(anyTypeState(anyId))
  const [value, setValue] = useRecoilState(anyState(anyId))
  const [shared, setShared] = useRecoilState(sharedState(anyState(anyId).key))
  const resetType = useResetRecoilState(anyTypeState(anyId))
  const resetValue = useResetRecoilState(anyState(anyId))
  const setAnyIds = useSetRecoilState(anyIdsState)
  const inputId = useMemo(v4, [])

  const [
    deleteConfirmOpen,
    { open: openDeleteConfirm, close: closeDeleteConfirm },
  ] = useDisclosure()

  return (
    <Input.Wrapper
      label={
        <TextInput
          variant="unstyled"
          placeholder={formatMessage({ defaultMessage: 'Type name' })}
          value={type ?? undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setType(nes(event.currentTarget.value))
          }}
        />
      }
      labelProps={{ htmlFor: inputId }}
    >
      <Group gap="xs">
        <Checkbox
          checked={shared}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShared(event.currentTarget.checked)
          }}
        />
        <TextInput
          id={inputId}
          flex={1}
          value={value ?? undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(nes(event.currentTarget.value))
          }}
        />
        <ActionIcon
          variant="light"
          onClick={() => {
            if (!(type ?? '').match(/^\s*$/) || !(value ?? '').match(/^\s*$/)) {
              openDeleteConfirm()
            } else {
              resetType()
              resetValue()
              setAnyIds((anyIds) => anyIds.filter((t) => t !== anyId))
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
                defaultMessage="Delete the line: {type}:{value}"
                values={{ type, value }}
              />
            }
          >
            <Group justify="end">
              <Button
                color="red"
                onClick={() => {
                  resetType()
                  resetValue()
                  setAnyIds((anyIds) => anyIds.filter((t) => t !== anyId))
                }}
              >
                <FormattedMessage defaultMessage="Delete" />
              </Button>
            </Group>
          </Modal>
        </DndContext>
      </Group>
    </Input.Wrapper>
  )
}

export default AnyInput
