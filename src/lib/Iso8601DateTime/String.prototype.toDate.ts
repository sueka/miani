import assert from '../assert'
import isIso8601DateTime from './isIso8601DateTime'
import toDate from './toDate'

declare global {
  interface IIso8601DateTime {
    toDate(): Date
  }
}

Object.defineProperty(String.prototype, 'toDate', {
  value(this: string) {
    assert(isIso8601DateTime(this))

    return toDate(this)
  },
})
