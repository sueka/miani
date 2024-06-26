import {
  ActionIcon,
  CopyButton,
  Input,
  SegmentedControl,
  Stack,
  Textarea,
  type TextareaProps,
  Tooltip,
  rem,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import {
  IconCheck,
  IconCopy,
  IconDownload,
  IconSettings,
} from '@tabler/icons-react'
import { FormattedMessage } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import assert from '../../lib/assert'
import fnState from '../../recoil/states/fnState'
import versionState from '../../recoil/states/vCard/versionState'
import vCardState from '../../recoil/states/vCardState'
import Settings from './Settings'

type Props = Pick<TextareaProps, 'classNames'>

const VCardTextarea: React.FC<Props> = ({ classNames }) => {
  const vCard = useRecoilValue(vCardState)
  const fn = useRecoilValue(fnState)
  const [version, setVersion] = useRecoilState(versionState)
  const [settingsOpen, { open: openSettings, close: closeSettings }] =
    useDisclosure()

  return (
    <Input.Wrapper label="vCard">
      <Stack gap="xs">
        <SegmentedControl
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
          onChange={(value) => {
            assert(value === '3.0' || value === '4.0')
            setVersion(value)
          }}
        />
        <Textarea
          autosize
          readOnly
          value={vCard}
          classNames={classNames}
          rightSection={
            <ActionIcon.Group orientation="vertical">
              <CopyButton value={vCard}>
                {({ copied, copy }) => (
                  <Tooltip
                    label={
                      copied ? (
                        <FormattedMessage defaultMessage="Copied" />
                      ) : (
                        <FormattedMessage defaultMessage="Copy" />
                      )
                    }
                    withArrow
                    position="right"
                    openDelay={300}
                  >
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
              <Tooltip
                label={<FormattedMessage defaultMessage="Download" />}
                withArrow
                position="right"
                openDelay={300}
              >
                <ActionIcon
                  color="gray"
                  variant="subtle"
                  component="a"
                  download={`${fn !== '' ? fn : 'Unnamed'}.vcf`}
                  href={`data:text/plain,${encodeURIComponent(vCard)}`}
                >
                  <IconDownload style={{ width: rem(16) }} />
                </ActionIcon>
              </Tooltip>
              <Settings open={settingsOpen} onClose={closeSettings} />
              <Tooltip
                label={<FormattedMessage defaultMessage="Settings" />}
                withArrow
                position="right"
                openDelay={300}
              >
                <ActionIcon
                  color="gray"
                  variant="subtle"
                  onClick={openSettings}
                >
                  <IconSettings style={{ width: rem(16) }} />
                </ActionIcon>
              </Tooltip>
            </ActionIcon.Group>
          }
        />
      </Stack>
    </Input.Wrapper>
  )
}

export default VCardTextarea
