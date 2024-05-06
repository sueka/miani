import { Checkbox, NativeSelect, Stack } from '@mantine/core'
import cls from 'classnames'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'
import Modal from '../../extensions/@mantine/core/Modal'
import assert from '../../lib/assert'
import charsetState from '../../recoil/atoms/vCard/charsetState'
import versionState from '../../recoil/atoms/vCard/versionState'
import classes from './Settings.module.css'

interface Props {
  open: boolean
  onClose(): void
}

const Settings: React.FC<Props> = ({ open, onClose }) => {
  const { formatMessage } = useIntl()
  const [version, setVersion] = useRecoilState(versionState)
  const [charset, setCharset] = useRecoilState(charsetState)

  return (
    <Modal
      opened={open}
      onClose={onClose}
      title={<FormattedMessage defaultMessage="vCard Settings" />}
    >
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
    </Modal>
  )
}

export default Settings
