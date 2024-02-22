export default function compact<T>(xs: (T | null | undefined)[]) {
  return xs.filter((x): x is T => x != null)
}
