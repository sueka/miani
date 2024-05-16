import { restrictToWindowEdges } from '@dnd-kit/modifiers'
import {
  ActionIcon,
  Button,
  Checkbox,
  Group,
  Input,
  TextInput,
} from '@mantine/core'
import { useDisclosure, useValidatedState } from '@mantine/hooks'
import { IconBackspace } from '@tabler/icons-react'
import React, { useLayoutEffect, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil'
import { v4 } from 'uuid'
import DndContext from '../../../extensions/@dnd-kit/providers/DndContext'
import Modal from '../../../extensions/@mantine/core/Modal'
import exit from '../../../lib/exit'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { value as valuePat } from '../../../patterns/vCard'
import { textList } from '../../../patterns/vCard4'
import anyIdsState from '../../../recoil/states/any/anyIdsState'
import anyNameState from '../../../recoil/states/any/anyNameState'
import anyValueState from '../../../recoil/states/any/anyValueState'
import sharedState from '../../../recoil/states/sharedState'
import versionState from '../../../recoil/states/vCard/versionState'

interface Props {
  anyId: string
}

const AnyInput: React.FC<Props> = ({ anyId }) => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [name, setName] = useRecoilState(anyNameState(anyId))
  const [recoilValue, setRecoilValue] = useRecoilState(anyValueState(anyId))
  const [shared, setShared] = useRecoilState(
    sharedState(anyValueState(anyId).key),
  )
  const resetName = useResetRecoilState(anyNameState(anyId))
  const resetValue = useResetRecoilState(anyValueState(anyId))
  const setAnyIds = useSetRecoilState(anyIdsState)
  const inputId = useMemo(v4, [])

  const [
    deleteConfirmOpen,
    { open: openDeleteConfirm, close: closeDeleteConfirm },
  ] = useDisclosure()

  const [value, setValue] = useValidatedState<string | null>(
    recoilValue,
    (value) => {
      switch (version) {
        case '3.0':
          return value === null || r`^${valuePat}$`.test(value)

        case '4.0':
          return value === null || r`^${textList}$`.test(value)
      }
    },
  )

  useLayoutEffect(() => {
    setValue(recoilValue)
  }, [setValue, recoilValue])

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
      error={
        !value.valid && (
          <span
            dangerouslySetInnerHTML={{
              __html:
                version === '3.0'
                  ? formatMessage({
                      defaultMessage:
                        'Should be a <i>value</i> on p. 29, RFC 2426.',
                    })
                  : version === '4.0'
                    ? formatMessage({
                        defaultMessage:
                          'Should be a <i>text-list</i> on p. 10, RFC 6350.',
                      })
                    : exit(),
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
          id={inputId}
          flex={1}
          value={value.value ?? undefined}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setValue(nes(event.currentTarget.value))
            setRecoilValue(nes(event.currentTarget.value))
          }}
          error={!value.valid}
        />
        <ActionIcon
          variant="light"
          onClick={() => {
            if (
              !(name ?? '').match(/^\s*$/) ||
              !(value.value ?? '').match(/^\s*$/)
            ) {
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
                values={{ name, value: recoilValue }}
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
