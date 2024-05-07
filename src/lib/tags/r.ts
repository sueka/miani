import assert from '../assert'
import zip from '../zip'

/**
 * @throws `Error` if {substitutions} have different flags
 */
export default function r(
  cooked: TemplateStringsArray,
  ...substitutions: RegExp[]
): RegExp {
  // Uses raw (i.e., w/o processing escape sequences) segments.
  const [carSegment, ...segments] = cooked.raw

  assert(carSegment !== undefined)
  assert(segments.length === substitutions.length)

  let pattern = carSegment
  const flags = substitutions[0]?.flags

  if (substitutions[0] === undefined) {
    return RegExp(pattern)
  }

  if (new Set(substitutions.map((re) => re.flags)).size !== 1) {
    throw new Error(
      'The r`` tag function should take regexes with the same flags as arguments.',
    )
  }

  for (const [substitution, segment] of zip(substitutions, segments)) {
    pattern += `(?:${substitution.source})`
    pattern += segment
  }

  return new RegExp(pattern, flags)
}
