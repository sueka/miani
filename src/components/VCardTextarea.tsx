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
import { IconCheck, IconCopy, IconDownload } from '@tabler/icons-react'
import { FormattedMessage } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import assert from '../lib/assert'
import fnState from '../recoil/atoms/fnState'
import versionState from '../recoil/atoms/vCard/versionState'
import vCardState from '../recoil/selectors/vCardState'

type Props = Pick<TextareaProps, 'classNames'>

const VCardTextarea: React.FC<Props> = ({ classNames }) => {
  const vCard = useRecoilValue(vCardState)
  const fn = useRecoilValue(fnState)
  const [version, setVersion] = useRecoilState(versionState)

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
            <Stack gap="xs">
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
            </Stack>
          }
        />
      </Stack>
    </Input.Wrapper>
  )
}

export default VCardTextarea
