import {
  Checkbox,
  Group,
  Input,
  TextInput,
  type TextInputProps,
} from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useLayoutEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 } from 'uuid'

import exit from '../../../lib/exit'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { listComponent, textValue } from '../../../patterns'
import postOfficeBoxState from '../../../recoil/atoms/adr/postOfficeBoxState'
import sharedState from '../../../recoil/atoms/sharedState'
import versionState from '../../../recoil/atoms/vCard/versionState'

type Props = Partial<Pick<TextInputProps, 'id'>>

const PostOfficeBoxInput: React.FC<Props> = ({ id = v4() }) => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilPostOfficeBox, setRecoilPostOfficeBox] =
    useRecoilState(postOfficeBoxState)
  const [shared, setShared] = useRecoilState(
    sharedState(postOfficeBoxState.key),
  )

  const [postOfficeBox, setPostOfficeBox] = useValidatedState<string | null>(
    recoilPostOfficeBox,
    (value) => {
      switch (version) {
        case '3.0':
          return value === null || r`^${textValue}$`.test(value)

        case '4.0':
          return value === null || r`^${listComponent}$`.test(value)
      }
    },
  )

  useLayoutEffect(() => {
    setPostOfficeBox(recoilPostOfficeBox)
  }, [setPostOfficeBox, recoilPostOfficeBox])

  return (
    <Input.Wrapper
      label={<FormattedMessage defaultMessage="Post Office Box" />}
      labelProps={{ htmlFor: id }}
    >
      <Group gap="xs">
        <Checkbox
          checked={shared}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShared(event.currentTarget.checked)
          }}
        />
        <TextInput
          id={id}
          flex={1}
          placeholder=""
          value={postOfficeBox.value}
          error={
            !postOfficeBox.valid && (
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    version === '3.0'
                      ? formatMessage({
                          defaultMessage:
                            'Should be a <i>text-value</i> on p. 37, RFC 2426.',
                        })
                      : version === '4.0'
                        ? formatMessage({
                            defaultMessage:
                              'Should be a <i>list-component</i> on p. 10, RFC 6350.',
                          })
                        : exit(),
                }}
              />
            )
          }
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPostOfficeBox(nes(event.currentTarget.value))
            setRecoilPostOfficeBox(nes(event.currentTarget.value))
          }}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default PostOfficeBoxInput