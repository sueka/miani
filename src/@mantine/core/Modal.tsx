import { useDraggable, useDroppable } from '@dnd-kit/core'
import { Modal as OrigModal, type ModalProps } from '@mantine/core'
import { useLayoutEffect, useMemo, useState } from 'react'
import { tss } from 'tss-react'
import { v4 } from 'uuid'
import assert from '../../lib/assert'

interface Inset {
  top: number
  left: number
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

const Modal: React.FC<ModalProps> = ({
  opened,
  onClose,
  title,
  children,
  ...props
}) => {
  const id = useMemo(v4, [])
  const [dragging, setDragging] = useState<Inset | null>(null)

  const {
    setNodeRef: draggable,
    setActivatorNodeRef: handler,
    active,
    listeners,
    attributes,
  } = useDraggable({
    id,
  })

  const { setNodeRef: droppable } = useDroppable({
    id,
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

      if (active.id === id) {
        setDragging({
          top: translated.top - initial.top,
          left: translated.left - initial.left,
        })
      }
    }
  }, [active, active?.rect.current])

  return (
    <OrigModal.Root
      opened={opened}
      onClose={onClose}
      ref={droppable}
      {...props}
    >
      <OrigModal.Overlay />
      <OrigModal.Content
        ref={draggable}
        classNames={draggableClasses}
        {...attributes}
      >
        <OrigModal.Header ref={handler} {...listeners}>
          <OrigModal.Title>{title}</OrigModal.Title>
          <OrigModal.CloseButton data-no-dnd />
        </OrigModal.Header>
        <OrigModal.Body>{children}</OrigModal.Body>
      </OrigModal.Content>
    </OrigModal.Root>
  )
}

export default Modal
