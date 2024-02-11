import { ActionIcon, CopyButton, Textarea, Tooltip, rem } from '@mantine/core'
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useRecoilValue } from 'recoil'

import vCardState from './recoil/selectors/vCardState'

const VCardTextarea: React.FC = () => {
  const vCard = useRecoilValue(vCardState)

  return (
    <Textarea
      autosize
      readOnly
      label="vCard"
      value={vCard}
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
