import { TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import React, { useLayoutEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState } from 'recoil'

import r from '../../lib/tags/r'
import { textValue } from '../../patterns'
import fnState from '../../recoil/atoms/fnState'

const FnInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const [recoilFn, setRecoilFn] = useRecoilState(fnState)

  const [fn, setFn] = useValidatedState<string>(recoilFn, (value) =>
    r`^${textValue}$`.test(value),
  )

  useLayoutEffect(() => {
    setFn(recoilFn)
  }, [setFn, recoilFn])

  return (
    <TextInput
      required
      label={<FormattedMessage defaultMessage="Formatted name" />}
      placeholder="Mr. John Q. Public\, Esq."
      value={fn.value}
      error={
        !fn.valid && (
          <span
            dangerouslySetInnerHTML={{
              __html: formatMessage({
                defaultMessage:
                  'Should be a <i>text-value</i> on p. 37, RFC 2426.',
              }),
            }}
          />
        )
      }
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setFn(event.currentTarget.value)
        setRecoilFn(event.currentTarget.value)
      }}
    />
  )
}

export default FnInput
