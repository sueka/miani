import { TextInput } from '@mantine/core'
import { useRecoilValue, useSetRecoilState } from 'recoil'

import nState from './recoil/atoms/nState'
import validatedNState from './recoil/selectors/validated/validatedNState'

const NInput: React.FC = () => {
  const n = useRecoilValue(validatedNState)
  const setN = useSetRecoilState(nState)

  return (
    <TextInput
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
