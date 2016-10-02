module.exports = (location, query) => (
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
