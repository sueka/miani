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
import { IconCheck, IconCopy } from '@tabler/icons-react'
import { useRecoilState, useRecoilValue } from 'recoil'

import assert from '../lib/assert'
import versionState from '../recoil/atoms/vCard/versionState'
import vCardState from '../recoil/selectors/vCardState'

type Props = Pick<TextareaProps, 'classNames'>

const VCardTextarea: React.FC<Props> = ({ classNames }) => {
  const vCard = useRecoilValue(vCardState)
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
      </Stack>
    </Input.Wrapper>
  )
}

export default VCardTextarea
