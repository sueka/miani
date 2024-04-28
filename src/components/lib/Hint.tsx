import { ActionIcon, HoverCard, type PopoverProps, rem } from '@mantine/core'
import { IconAlertTriangle, IconInfoCircle } from '@tabler/icons-react'
import exit from '../../lib/exit'
import classes from './Hint.module.css'

interface HintProps {
  variant?: 'info' | 'alert'
  popoverProps?: PopoverProps
  children?: React.ReactNode
}

const Hint: React.FC<HintProps> = ({
  variant = 'info',
  popoverProps,
  children,
}) => (
  <HoverCard withArrow shadow="md" {...popoverProps} openDelay={1000}>
    <HoverCard.Target>
      <ActionIcon
        variant="subtle"
        size="sm"
        // m="xs"
        classNames={{ root: classes['ActionIcon'] }}
      >
        {variant === 'info' ? (
          <IconInfoCircle style={{ width: rem(16) }} />
        ) : variant === 'alert' ? (
          <IconAlertTriangle style={{ width: rem(16) }} />
        ) : (
          exit()
        )}
      </ActionIcon>
    </HoverCard.Target>
    <HoverCard.Dropdown>{children}</HoverCard.Dropdown>
  </HoverCard>
)

export default Hint
