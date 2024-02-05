import { Grid, TextInput } from '@mantine/core'
import { useValidatedState } from '@mantine/hooks'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

import { textValue, nValue } from './patterns'
import vCardState from './recoil/selectors/vCardState'

const VCardForm: React.FC = () => {
  const [vCard, setVCard] = useRecoilState<VCard.VCard>(vCardState)

  const [fn, setFn] = useValidatedState(vCard.fn, (value) =>
    new RegExp(`^${textValue.source}$`).test(value),
  )

  const [n, setN] = useValidatedState(vCard.n, (value) =>
    new RegExp(`^${nValue.source}$`).test(value),
  )

  useEffect(() => {
    setVCard({ fn: fn.value, n: n.value })
  }, [fn.value, n.value])

  return (
    <Grid>
      <Grid.Col span={4}>
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
        <TextInput
          label="N"
          description={
            <>
              Specifies the components of the <mark>name</mark> of the object
              the vCard represents.
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
      </Grid.Col>
    </Grid>
  )
}

export default VCardForm
