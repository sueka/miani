import { TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import r from '../../../lib/tags/r'
import { textValues } from '../../../patterns'
import honorificSuffixesState from '../../../recoil/atoms/n/honorificSuffixesState'

const HonorificSuffixesInput: React.FC = () => {
  const [recoilHonorificSuffixes, setRecoilHonorificSuffixes] = useRecoilState(
    honorificSuffixesState,
  )

  const [honorificSuffixes, setHonorificSuffixes] = useValidatedState<
    string | null
  >(
    recoilHonorificSuffixes?.join(',') ?? null,
    (value) => value === null || r`^${textValues}$`.test(value),
  )

  useEffect(() => {
    setHonorificSuffixes(recoilHonorificSuffixes?.join(',') ?? null)
  }, [setHonorificSuffixes, recoilHonorificSuffixes])

  return (
    <TextInput
      label="Honorific Suffixes"
      placeholder="Esq."
      value={honorificSuffixes.value ?? undefined}
      error={
        !honorificSuffixes.valid && (
          <>
            Should be comma-separated <i>text-value</i>s on p. 37, RFC 2426.
          </>
        )
      }
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
        setHonorificSuffixes(event.currentTarget.value)
        setRecoilHonorificSuffixes(event.currentTarget.value.split(',')) //
      }}
    />
  )
}

export default HonorificSuffixesInput