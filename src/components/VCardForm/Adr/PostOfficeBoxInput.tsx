import { Checkbox, Group, Input, Text, TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useLayoutEffect, useMemo } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 } from 'uuid'

import Hint from '../../../lib/components/Hint'
import exit from '../../../lib/exit'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { textValue } from '../../../patterns/vCard'
import { listComponent } from '../../../patterns/vCard4'
import postOfficeBoxState from '../../../recoil/atoms/adr/postOfficeBoxState'
import sharedState from '../../../recoil/atoms/sharedState'
import versionState from '../../../recoil/atoms/vCard/versionState'

interface Props {
  id?: string
}

const PostOfficeBoxInput: React.FC<Props> = ({ id }) => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilPostOfficeBox, setRecoilPostOfficeBox] =
    useRecoilState(postOfficeBoxState)
  const [shared, setShared] = useRecoilState(
    sharedState(postOfficeBoxState.key),
  )
  const inputId = useMemo(() => id ?? v4(), [id])

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
      labelProps={{ htmlFor: inputId }}
    >
      <Group gap="xs">
        <Checkbox
          checked={shared}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setShared(event.currentTarget.checked)
          }}
        />
        <TextInput
          id={inputId}
          flex={1}
          placeholder=""
          value={postOfficeBox.value ?? undefined}
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
          rightSection={
            version === '4.0' ? (
              <Hint variant="alert">
                <Text size="xs">
                  <span
                    dangerouslySetInnerHTML={{
                      __html: formatMessage({
                        defaultMessage:
                          'For interoperability, it SHOULD be left empty.',
                      }),
                    }}
                  />
                </Text>
              </Hint>
            ) : null
          }
        />
      </Group>
    </Input.Wrapper>
  )
}

export default PostOfficeBoxInput
