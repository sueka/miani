import { type AtomEffect } from 'recoil'
import { compareKeys } from './makePersist'

/**
 * @implNote `newDeserialize()` returns a `Record<K, V>` but it need not be a `Record<K, V>`.
 */
interface Options<J extends string, K extends string, U, V> {
  newSerialize?(value: Record<K, V>): string
  oldDeserialize?(text: string): Record<J, U> & Partial<Record<K, V>>
  newDeserialize?(text: string): Partial<Record<K, V>>
  oldStorage?: Pick<Storage, 'getItem' | 'setItem'>
  newStorage?: Pick<Storage, 'getItem' | 'setItem'>
}

export const key = 'recoil-atoms'

export default function makeMigration<
  J extends string,
  K extends string,
  U extends undefined,
  V,
>(
  atomKey: K,
  translate: (oldValue: Record<J, U>) => Record<K, V>,
  options?: Options<J, K, U, V>,
): {
  migrate: AtomEffect<V>
}

/**
 * @implNote `translate()` should accept `V` if the key does not change.
 */
export default function makeMigration<K extends string, U extends undefined, V>(
  atomKey: K,
  translate: (oldValue: Record<K, U | V>) => Record<K, V>,
  options?: Options<K, K, U, V>,
): {
  migrate: AtomEffect<V>
}

// NOTE: U may be undefined because persist() is not invoked when the atom is initialized.
export default function makeMigration<
  J extends string,
  K extends string,
  U extends undefined,
  V,
>(
  atomKey: K,
  translate: (oldValue: Record<J, U>) => Record<K, V>,
  options?: Options<J, K, U, V>,
): {
  migrate: AtomEffect<V>
} {
  const {
    newSerialize = JSON.stringify,
    oldDeserialize = JSON.parse,
    newDeserialize = JSON.parse,
    oldStorage = localStorage,
    newStorage = localStorage,
  }: Options<J, K, U, V> = options ?? {}

  return {
    migrate({ setSelf, node, trigger }) {
      if (trigger === 'get') {
        compareKeys(node.key, atomKey)

        const oldStore = oldStorage.getItem(key)
        const newStore = newStorage.getItem(key)

        if (oldStore === null) {
          return // no migration needed
        }

        const oldDeserialized = oldDeserialize(oldStore)
        const newDeserialized =
          newStore !== null ? newDeserialize(newStore) : {}

        const translated = translate(oldDeserialized)

        setSelf(translated[atomKey])

        const newSerialized = newSerialize({
          ...newDeserialized,
          ...translated,
        })

        newStorage.setItem(key, newSerialized)
      }
    },
  }
}
