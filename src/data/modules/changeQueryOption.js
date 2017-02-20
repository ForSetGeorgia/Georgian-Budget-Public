module.exports = (router, location, queryChange) => {
  router.replace(
    Object.assign(
      {},
      location,
      {
        query: Object.assign(
          {},
          location.query,
          queryChange
        )
      }
    )
  )
}
