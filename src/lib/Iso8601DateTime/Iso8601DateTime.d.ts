interface Iso8601DateTimeBrand {
  _iso8601DateTimeBrand: never
}

interface IIso8601DateTime extends Iso8601DateTimeBrand {}

type Iso8601DateTime = string & IIso8601DateTime
