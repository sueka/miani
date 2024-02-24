type JsonPrimitive = null | boolean | number | string
type JsonArray = readonly Json[]
type JsonObject = { [member in string]: Json }
type Json = JsonPrimitive | JsonArray | JsonObject
