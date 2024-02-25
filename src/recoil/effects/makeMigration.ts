import { type AtomEffect } from 'recoil'
import { checkKey } from './makePersist'

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

export default function makeMigration<J extends string, K extends string, U, V>(
  atomKey: K,
  translate: (a: Record<J, U>) => Record<K, V>,
  options?: Options<J, K, U, V>,
): {
  migrate: AtomEffect<V>
}

/**
 * @implNote `translate()` should accept `V` if `oldAtomKey` is equal to `atomKey`.
 */
export default function makeMigration<K extends string, U, V>(
  atomKey: K,
  translate: (a: Record<K, U | V>) => Record<K, V>,
  options?: Options<K, K, U, V>,
): {
  migrate: AtomEffect<V>
}

export default function makeMigration<J extends string, K extends string, U, V>(
  atomKey: K,
  translate: (a: Record<J, U>) => Record<K, V>,
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
        checkKey(node.key, atomKey)

        const oldStore = oldStorage.getItem(key)
        const newStore = newStorage.getItem(key)

        if (oldStore === null) {
          return // no migration needed
        }

        const oldDeserialized = oldDeserialize(oldStore)
        const newDeserialized =
          newStore !== null ? newDeserialize(newStore) : {}

        const moved = translate(oldDeserialized)

        setSelf(moved[atomKey])

        const newSerialized = newSerialize({
          ...newDeserialized,
          ...moved,
        })

        newStorage.setItem(key, newSerialized)
      }
    },
  }
}
