import { TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import r from './lib/tags/r'
import { textValue } from './patterns'
import fnState from './recoil/atoms/fnState'

const FnInput: React.FC = () => {
  const [recoilFn, setRecoilFn] = useRecoilState(fnState)

  const [fn, setFn] = useValidatedState<string>(recoilFn, (value) =>
    r`^${textValue}$`.test(value),
  )

  useEffect(() => {
    setFn(recoilFn)
  }, [setFn, recoilFn])

  return (
    <TextInput
      required
      label="FN"
      description={
        <>
          Specifies the <mark>formatted</mark> text corresponding to the{' '}
          <mark>name</mark> of the object the vCard represents.
        </>
      }
      placeholder="Mr. John Q. Public\, Esq."
      value={fn.value}
      error={
        !fn.valid && (
          <>
            Should be a <i>text-value</i> on p. 37, RFC 2426.
          </>
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
