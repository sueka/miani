import { type TextInputProps, Textarea } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useLayoutEffect } from 'react'
import { useIntl } from 'react-intl'
import { useRecoilState, useRecoilValue } from 'recoil'
import { v4 } from 'uuid'

import exit from '../../../lib/exit'
import nes from '../../../lib/nes'
import r from '../../../lib/tags/r'
import { adrValue as adrValueV3 } from '../../../patterns/vCard'
import { adrValue as adrValueV4 } from '../../../patterns/vCard4'
import adrState from '../../../recoil/states/adrState'
import versionState from '../../../recoil/states/vCard/versionState'

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
    <Textarea
      minRows={1}
      autosize
      id={id}
      placeholder={
        version === '3.0'
          ? ';;123 Main Street;Any Town;CA;91921-1234'
          : version === '4.0'
            ? ';;123 Main Street;Any Town;CA;91921-1234;U.S.A.'
            : exit()
      }
      // NOTE: <TextInput value={null}> can cause no re-rendering, esp. if it is changed twice and the first time there are no changes. This NOTE can have expired.
      value={adr.value ?? undefined}
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
      onChange={(event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setAdr(nes(event.currentTarget.value))
        setRecoilAdr(nes(event.currentTarget.value))
      }}
    />
  )
}

export default PlainAdrInput
