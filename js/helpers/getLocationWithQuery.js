function QueryParamError(message) {
  this.message = message
  this.stack = (new Error()).stack
}

QueryParamError.prototype = Object.create(Error.prototype)
QueryParamError.prototype.name = 'QueryParamError'

module.exports = (location, query) => {
  const newQueryKeys = Object.getOwnPropertyNames(query)

  const allowedQueryKeys = ['financeType', 'budgetItemIds', 'budgetItemType']

  for (let i = 0; i < newQueryKeys.length; i++) {
    if (!allowedQueryKeys.includes(newQueryKeys[i])) {
      throw new QueryParamError(`Query key ${newQueryKeys[i]} is not allowed`)
    }
  }

  return (
    Object.assign(
      {},
      location,
      {
        query: Object.assign(
          {},
          location.query,
          query
        )
      }
    )
  )
}
