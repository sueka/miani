import { type AtomEffect } from 'recoil'
import assert, { AssertionError } from '../../lib/assert'

type FamilyKey<K extends string> = `${K}__${string}`

interface Options<K extends string, V> {
  serialize?(value: Record<K, V>): string
  deserialize?(text: string): Partial<Record<K, V>>
  storage?: Pick<Storage, 'getItem' | 'setItem'>
}

export const key = 'recoil-atoms'

// TODO: Delete this overloads if https://github.com/microsoft/TypeScript/issues/26242 is fixed
export default function makePersist<V, K extends string = string>(
  atomKey: K,
  options?: Options<K | FamilyKey<K>, V>,
): { persist: AtomEffect<V>; restore: AtomEffect<V> }

export default function makePersist<K extends string, V>(
  atomKey: K,
  options?: Options<K | FamilyKey<K>, V>,
): { persist: AtomEffect<V>; restore: AtomEffect<V> }

// TODO: Make persist() be invoked when the atom is initialized or reset
export default function makePersist<K extends string, V>(
  atomKey: K,
  options?: Options<K | FamilyKey<K>, V>,
): {
  persist: AtomEffect<V>
  restore: AtomEffect<V>
} {
  const {
    serialize = JSON.stringify,
    deserialize = JSON.parse,
    storage = localStorage,
  }: Options<K | FamilyKey<K>, V> = options ?? {}

  return {
    persist({ onSet, node }) {
      onSet((newValue) => {
        checkKey(node.key, atomKey)

        const store = storage.getItem(key)

        const deserialized: Partial<Record<K, V>> =
          store !== null ? deserialize(store) : {}

        const newEntry = {
          [node.key]: newValue,
        } as Record<K | FamilyKey<K>, V>

        const serialized = serialize({
          ...deserialized,
          ...newEntry,
        })

        storage.setItem(key, serialized)
      })
    },

    restore({ setSelf, node }) {
      checkKey(node.key, atomKey)

      const store = storage.getItem(key)

      if (store === null) {
        return
      }

      const deserialized = deserialize(store)
      const persisted = deserialized[node.key]

      if (persisted === undefined) {
        return
      }

      setSelf(persisted)
    },
  }
}

// TODO: Remove it
function checkKey<K extends string>(
  nodeKey: string,
  atomKey: K,
): asserts nodeKey is K | FamilyKey<K> {
  const familyKey = /^(?<key>.*)__(?<param>.*)$/

  // atom
  if (nodeKey === atomKey) {
    return
  }

  // atomFamily
  const matched = nodeKey.match(familyKey)
  assert(matched?.groups != null)

  const { key } = matched.groups

  if (key === atomKey) {
    return
  }

  throw new AssertionError()
}
