import { TextInput } from '@mantine/core'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import fnState from './recoil/atoms/fnState'
import validatedFnState from './recoil/selectors/validated/validatedFnState'

const FnInput: React.FC = () => {
  const fn = useRecoilValue(validatedFnState)
  const setFn = useSetRecoilState(fnState)

  return (
    <TextInput
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
      }}
    />
  )
}

export default FnInput
