export default function isNOmitted(n: string | null) {
  return (
    n !== null && // omitted
    !/^;*$/.test(n) // all components omitted
  )
}
