module.exports = (a, b) => {
  if (a.startDate > b.startDate) return 1
  if (a.startDate < b.startDate) return -1
  return 0
}
