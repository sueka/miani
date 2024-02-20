import { TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import r from './lib/tags/r'
import { nValue } from './patterns'
import nState from './recoil/selectors/nState'

const NInput: React.FC = () => {
  const [recoilN, setRecoilN] = useRecoilState(nState)

  const [n, setN] = useValidatedState<string>(recoilN, (value) =>
    r`^${nValue}$`.test(value),
  )

  useEffect(() => {
    setRecoilN(n.value)
  }, [setRecoilN, n])

  return (
    <TextInput
      required
      label="N"
      description={
        <>
          Specifies the components of the <mark>name</mark> of the object the
          vCard represents.
        </>
      }
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
      }}
    />
  )
}

export default NInput
