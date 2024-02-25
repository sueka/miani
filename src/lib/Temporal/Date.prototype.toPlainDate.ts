import toPlainDate from './toPlainDate'

declare global {
  interface Date {
    toPlainDate(): Temporal.PlainDate
  }
}

Object.defineProperty(Date.prototype, 'toPlainDate', {
  value(this: Date) {
    return toPlainDate(this)
  },
})
