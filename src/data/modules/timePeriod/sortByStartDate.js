const compareStartDates = (a, b) => {
  if (a.startDate > b.startDate) return 1
  if (a.startDate < b.startDate) return -1
  return 0
}

module.exports = items => Object.assign([], items).sort(compareStartDates)
