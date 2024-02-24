import toLegacyDate from './toLegacyDate'

declare global {
  namespace Temporal {
    interface PlainDate {
      toLegacyDate(): Date
    }
  }
}

Object.defineProperty(Temporal.PlainDate.prototype, 'toLegacyDate', {
  value(this: Temporal.PlainDate) {
    return toLegacyDate(this)
  },
})
