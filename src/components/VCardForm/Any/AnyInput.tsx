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
import anyValueState from '../../../recoil/atoms/any/anyValueState'
import anyNameState from '../../../recoil/atoms/any/anyNameState'
import sharedState from '../../../recoil/atoms/sharedState'

interface Props {
  anyId: string
}

const AnyInput: React.FC<Props> = ({ anyId }) => {
  const { formatMessage } = useIntl()
  const [name, setName] = useRecoilState(anyNameState(anyId))
  const [value, setValue] = useRecoilState(anyValueState(anyId))
  const [shared, setShared] = useRecoilState(sharedState(anyValueState(anyId).key))
  const resetName = useResetRecoilState(anyNameState(anyId))
  const resetValue = useResetRecoilState(anyValueState(anyId))
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
          value={name ?? undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(nes(event.currentTarget.value))
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
            if (!(name ?? '').match(/^\s*$/) || !(value ?? '').match(/^\s*$/)) {
              openDeleteConfirm()
            } else {
              resetName()
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
                defaultMessage="Delete the line: {name}:{value}"
                values={{ name, value }}
              />
            }
          >
            <Group justify="end">
              <Button
                color="red"
                onClick={() => {
                  resetName()
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
