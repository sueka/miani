import {
  ActionIcon,
  CopyButton,
  Textarea,
  type TextareaProps,
  Tooltip,
  rem,
} from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useRecoilValue } from 'recoil'

import vCardState from './recoil/selectors/vCardState'

type Props = Pick<TextareaProps, 'classNames'>

const VCardTextarea: React.FC<Props> = ({ classNames }) => {
  const vCard = useRecoilValue(vCardState)

  return (
    <Textarea
      autosize
      readOnly
      label="vCard"
      value={vCard}
      classNames={classNames}
      rightSection={
        <CopyButton value={vCard}>
          {({ copied, copy }) => (
            <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow>
              <ActionIcon
                color={copied ? 'green' : 'gray'}
                variant="subtle"
                onClick={copy}
              >
                {copied ? (
                  <IconCheck style={{ width: rem(16) }} />
                ) : (
                  <IconCopy style={{ width: rem(16) }} />
                )}
              </ActionIcon>
            </Tooltip>
          )}
        </CopyButton>
      }
    />
  )
}

export default VCardTextarea
