import { TextInput, type TextInputProps } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useLayoutEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'

import exit from '../../../lib/exit'
import r from '../../../lib/tags/r'
import { nValueV3, nValueV4 } from '../../../patterns'
import versionState from '../../../recoil/atoms/vCard/versionState'
import nState from '../../../recoil/selectors/nState'

type Props = Pick<TextInputProps, 'id'>

const PlainNInput: React.FC<Props> = ({ id }) => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilN, setRecoilN] = useRecoilState(nState)

  const [n, setN] = useValidatedState<string>(recoilN, (value) => {
    switch (version) {
      case '3.0':
        return r`^${nValueV3}$`.test(value)

      case '4.0':
        return value === '' || r`^${nValueV4}$`.test(value)
    }
  })

  useLayoutEffect(() => {
    setN(recoilN)
  }, [setN, recoilN])

  return (
    <TextInput
      id={id}
      required={version === '3.0'}
      placeholder="Public;John;Quinlan;Mr.;Esq."
      value={n.value}
      error={
        !n.valid && (
          <span
            dangerouslySetInnerHTML={{
              __html:
                version === '3.0'
                  ? formatMessage({
                      defaultMessage:
                        'Should be an <i>n-value</i> on p. 30, RFC 2426.',
                    })
                  : version === '4.0'
                    ? formatMessage({
                        defaultMessage:
                          'Should be an <i>N-value</i> on p. 29, RFC 6350.',
                      })
                    : exit(),
            }}
          />
        )
      }
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setN(event.currentTarget.value)
        setRecoilN(event.currentTarget.value)
      }}
    />
  )
}

export default PlainNInput
