import { TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import React, { useLayoutEffect } from 'react'
import { FormattedMessage, useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import exit from '../../lib/exit'
import r from '../../lib/tags/r'
import { textValue } from '../../patterns/vCard'
import { text } from '../../patterns/vCard4'
import fnState from '../../recoil/states/fnState'
import versionState from '../../recoil/states/vCard/versionState'

const FnInput: React.FC = () => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilFn, setRecoilFn] = useRecoilState(fnState)

  const [fn, setFn] = useValidatedState<string>(recoilFn, (value) => {
    switch (version) {
      case '3.0':
        return r`^${textValue}$`.test(value)

      case '4.0':
        return r`^${text}$`.test(value)
    }
  })

  useLayoutEffect(() => {
    setFn(recoilFn)
  }, [setFn, recoilFn])

  return (
    <TextInput
      required
      label={<FormattedMessage defaultMessage="Formatted name" />}
      placeholder="Mr. John Q. Public\, Esq."
      autoComplete="name"
      value={fn.value}
      error={
        !fn.valid && (
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
                          'Should be a <i>text</i> on p. 10, RFC 6350.',
                      })
                    : exit(),
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
