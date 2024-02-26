import { TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import r from './lib/tags/r'
import { textValues } from './patterns'
import additionalNamesState from './recoil/atoms/n/additionalNamesState'

const AdditionalNamesInput: React.FC = () => {
  const [recoilAdditionalNames, setRecoilAdditionalNames] =
    useRecoilState(additionalNamesState)

  const [additionalNames, setAdditionalNames] = useValidatedState<
    string | null
  >(
    recoilAdditionalNames?.join(',') ?? null,
    (value) => value === null || r`^${textValues}$`.test(value),
  )

  useEffect(() => {
    setAdditionalNames(recoilAdditionalNames?.join(',') ?? null)
  }, [setAdditionalNames, recoilAdditionalNames])

  return (
    <TextInput
      label="Additional Names"
      placeholder="Quinlan"
      value={additionalNames.value ?? undefined}
      error={
        !additionalNames.valid && (
          <>
            Should be comma-separated <i>text-value</i>s on p. 37, RFC 2426.
          </>
        )
      }
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setAdditionalNames(event.currentTarget.value)
        setRecoilAdditionalNames(event.currentTarget.value.split(',')) //
      }}
    />
  )
}

export default AdditionalNamesInput
