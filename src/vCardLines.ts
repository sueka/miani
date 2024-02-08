export default function* vCardLines(vCardObject: VCard.VCard) {
  yield 'BEGIN:VCARD'
  yield 'VERSION:3.0'

  if (vCardObject.fn !== '') {
    yield `FN:${vCardObject.fn}`
  }

  if (vCardObject.n !== '') {
    yield `N:${vCardObject.n}`
  }

  yield 'END:VCARD'
}
