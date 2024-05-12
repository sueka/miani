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
import { textValues } from '../../../patterns/vCard'
import { listComponent } from '../../../patterns/vCard4'
import familyNameState from '../../../recoil/states/n/familyNameState'
import sharedState from '../../../recoil/states/sharedState'
import versionState from '../../../recoil/states/vCard/versionState'

type Props = Partial<Pick<TextInputProps, 'id'>>

const FamilyNameInput: React.FC<Props> = ({ id = v4() }) => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilFamilyName, setRecoilFamilyName] =
    useRecoilState(familyNameState)
  const [shared, setShared] = useRecoilState(sharedState(familyNameState.key))

  const [familyName, setFamilyName] = useValidatedState<string | null>(
    recoilFamilyName,
    (value) => {
      switch (version) {
        case '3.0':
          return value === null || r`^${textValues}$`.test(value)

        case '4.0':
          return value === null || r`^${listComponent}$`.test(value)
      }
    },
  )

  useLayoutEffect(() => {
    setFamilyName(recoilFamilyName)
  }, [setFamilyName, recoilFamilyName])

  return (
    <Input.Wrapper
      label={<FormattedMessage defaultMessage="Family Name" />}
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
          placeholder="Public"
          autoComplete="family-name"
          value={familyName.value ?? undefined}
          error={
            !familyName.valid && (
              <span
                dangerouslySetInnerHTML={{
                  __html:
                    version === '3.0'
                      ? formatMessage({
                          defaultMessage:
                            'Should be comma-separated <i>text-value</i>s on p. 37, RFC 2426.',
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
            setFamilyName(nes(event.currentTarget.value))
            setRecoilFamilyName(nes(event.currentTarget.value))
          }}
        />
      </Group>
    </Input.Wrapper>
  )
}

export default FamilyNameInput
