export class AssertionError extends Error {}

/**
 * @throws `AssertionError` if {cond} is a false proposition
 */
export default function assert(cond: boolean): asserts cond {
  if (!cond) {
    throw new AssertionError()
  }
}
