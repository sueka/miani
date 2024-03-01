import { TextInput, type TextInputProps } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useLayoutEffect } from 'react'
import { useRecoilState } from 'recoil'

import r from '../../../lib/tags/r'
import { nValue } from '../../../patterns'
import nState from '../../../recoil/selectors/nState'

type Props = Pick<TextInputProps, 'id'>

const PlainNInput: React.FC<Props> = ({ id }) => {
  const [recoilN, setRecoilN] = useRecoilState(nState)

  const [n, setN] = useValidatedState<string>(recoilN, (value) =>
    r`^${nValue}$`.test(value),
  )

  useLayoutEffect(() => {
    setN(recoilN)
  }, [setN, recoilN])

  return (
    <TextInput
      id={id}
      required
      placeholder="Public;John;Quinlan;Mr.;Esq."
      value={n.value}
      error={
        !n.valid && (
          <>
            Should be an <i>n-value</i> on p. 30, RFC 2426.
          </>
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
