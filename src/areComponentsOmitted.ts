export default function areComponentsOmitted(nOrAdr: string) {
  return /^;*$/.test(nOrAdr)
}
