import { TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import r from '../../../lib/tags/r'
import { textValues } from '../../../patterns'
import givenNameState from '../../../recoil/atoms/n/givenNameState'

const GivenNameInput: React.FC = () => {
  const [recoilGivenName, setRecoilGivenName] = useRecoilState(givenNameState)

  const [givenName, setGivenName] = useValidatedState<string | null>(
    recoilGivenName,
    (value) => value === null || r`^${textValues}$`.test(value),
  )

  useEffect(() => {
    setGivenName(recoilGivenName)
  }, [setGivenName, recoilGivenName])

  return (
    <TextInput
      label="Given Name"
      placeholder="John"
      value={givenName.value ?? undefined}
      error={
        !givenName.valid && (
          <>
            Should be comma-separated <i>text-value</i>s on p. 37, RFC 2426.
          </>
        )
      }
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setGivenName(event.currentTarget.value)
        setRecoilGivenName(event.currentTarget.value)
      }}
    />
  )
}

export default GivenNameInput
