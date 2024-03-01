import { mock } from 'bun:test'
import { NIL as NIL_UUID } from 'uuid'

mock.module('uuid', () => ({
  v4() {
    return NIL_UUID
  },
}))
