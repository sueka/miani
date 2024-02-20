export default function* zipAll<A, B>(
  xs: Iterable<A>,
  ys: Iterable<B>,
): Generator<[A | undefined, B | undefined], void, undefined> {
  const xIter: Iterator<A, undefined> = xs[Symbol.iterator]()
  const yIter: Iterator<B, undefined> = ys[Symbol.iterator]()

  while (true) {
    const x = xIter.next()
    const y = yIter.next()

    if (x.done && y.done) {
      break
    }

    const values: [A | undefined, B | undefined] = [x.value, y.value]

    yield values
  }
}
