import { TextInput, type TextInputProps } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useLayoutEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 } from 'uuid'

import exit from '../../../lib/exit'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { adrValueV3, adrValueV4 } from '../../../patterns'
import versionState from '../../../recoil/atoms/vCard/versionState'
import adrState from '../../../recoil/selectors/adrState'

type Props = Partial<Pick<TextInputProps, 'id'>>

const PlainAdrInput: React.FC<Props> = ({ id = v4() }) => {
  const { formatMessage } = useIntl()
  const version = useRecoilValue(versionState)
  const [recoilAdr, setRecoilAdr] = useRecoilState(adrState)

  const [adr, setAdr] = useValidatedState<string | null>(recoilAdr, (value) => {
    switch (version) {
      case '3.0':
        return (
          value === null ||
          // value === '' ||
          r`^${adrValueV3}$`.test(value)
        )

      case '4.0':
        return (
          value === null ||
          // value === '' ||
          r`^${adrValueV4}$`.test(value)
        )
    }
  })

  useLayoutEffect(() => {
    setAdr(recoilAdr)
  }, [setAdr, recoilAdr])

  return (
    <TextInput
      id={id}
      placeholder={
        version === '3.0'
          ? ';;123 Main Street;Any Town;CA;91921-1234'
          : version === '4.0'
            ? ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.'
            : exit()
      }
      value={adr.value}
      error={
        !adr.valid && (
          <span
            dangerouslySetInnerHTML={{
              __html:
                version === '3.0'
                  ? formatMessage({
                      defaultMessage:
                        'Should be an <i>adr-value</i> on p. 36, RFC 2426.',
                    })
                  : version === '4.0'
                    ? formatMessage({
                        defaultMessage:
                          'Should be an <i>ADR-value</i> on p. 34, RFC 6350.',
                      })
                    : exit(),
            }}
          />
        )
      }
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setAdr(nes(event.currentTarget.value))
        setRecoilAdr(nes(event.currentTarget.value))
      }}
    />
  )
}

export default PlainAdrInput
