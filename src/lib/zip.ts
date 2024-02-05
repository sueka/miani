export default function* zip<A, B>(
  xs: Iterable<A>,
  ys: Iterable<B>,
): Generator<[A, B], void, undefined> {
  const xIter = xs[Symbol.iterator]()
  const yIter = ys[Symbol.iterator]()

  while (true) {
    const x = xIter.next()
    const y = yIter.next()

    if (x.done || y.done) {
      break
    }

    const values: [A, B] = [x.value, y.value]

    yield values
  }
}
