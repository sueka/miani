import { useDraggable, useDroppable } from '@dnd-kit/core'
import { Checkbox, Modal, NativeSelect, Stack } from '@mantine/core'
import cls from 'classnames'
import { useLayoutEffect, useMemo, useState } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'
import { tss } from 'tss-react'
import { v4 } from 'uuid'
import assert from '../../lib/assert'
import charsetState from '../../recoil/atoms/vCard/charsetState'
import versionState from '../../recoil/atoms/vCard/versionState'
import classes from './Settings.module.css'

interface Inset {
  top: number
  left: number
}

interface Props {
  open: boolean
  onClose(): void
}

const useDraggableStyles = tss
  .withParams<{
    dragging: Inset | null
  }>()
  .create(({ dragging }) => ({
    content:
      dragging !== null
        ? {
            position: 'relative',
            top: `${dragging.top}px`,
            left: `${dragging.left}px`,
          }
        : {},
  }))

const Settings: React.FC<Props> = ({ open, onClose }) => {
  const { formatMessage } = useIntl()
  const [version, setVersion] = useRecoilState(versionState)
  const [charset, setCharset] = useRecoilState(charsetState)
  const settingsId = useMemo(v4, [])
  const [dragging, setDragging] = useState<Inset | null>(null)

  const {
    setNodeRef: draggable,
    setActivatorNodeRef: handler,
    active,
    listeners,
    attributes,
  } = useDraggable({
    id: settingsId,
  })

  const { setNodeRef: droppable } = useDroppable({
    id: settingsId,
  })

  const { classes: draggableClasses } = useDraggableStyles({
    dragging,
  })

  useLayoutEffect(() => {
    // dragging
    if (active !== null) {
      const { initial, translated } = active.rect.current

      assert(initial !== null)
      assert(translated !== null)

      setDragging({
        top: translated.top - initial.top,
        left: translated.left - initial.left,
      })
    }
  }, [active, active?.rect.current])

  return (
    <Modal.Root opened={open} onClose={onClose} ref={droppable}>
      <Modal.Overlay />
      <Modal.Content
        ref={draggable}
        classNames={draggableClasses}
        {...attributes}
      >
        <Modal.Header ref={handler} {...listeners}>
          <Modal.Title>
            <FormattedMessage defaultMessage="vCard Settings" />
          </Modal.Title>
          <Modal.CloseButton data-no-dnd />
        </Modal.Header>
        <Modal.Body>
          <Stack gap="xs">
            <NativeSelect
              label={<FormattedMessage defaultMessage="Version" />}
              data={[
                {
                  value: '3.0',
                  label: '3.0 (RFC 2426)',
                },
                {
                  value: '4.0',
                  label: '4.0 (RFC 6350)',
                },
              ]}
              value={version}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                assert(
                  event.currentTarget.value === '3.0' ||
                    event.currentTarget.value === '4.0',
                )
                setVersion(event.currentTarget.value)
              }}
            />
            <Checkbox
              disabled={version !== '4.0'}
              checked={charset === 'UTF-8'}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setCharset(event.currentTarget.checked ? 'UTF-8' : null)
              }}
              label={
                <span
                  dangerouslySetInnerHTML={{
                    __html: formatMessage({
                      defaultMessage: 'Set CHARSET if needed',
                    }),
                  }}
                />
              }
              classNames={{
                body: cls(classes['Checkbox'], classes['Labeled']),
              }}
            />
          </Stack>
        </Modal.Body>
      </Modal.Content>
    </Modal.Root>
  )
}

export default Settings
