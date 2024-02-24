interface Iso8601DateBrand {
  _iso8601DateBrand: never
}

interface IIso8601Date extends Iso8601DateBrand {}

type Iso8601Date = string & IIso8601Date
