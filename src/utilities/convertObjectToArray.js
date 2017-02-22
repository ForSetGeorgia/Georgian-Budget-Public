module.exports = obj => (
  Object.keys(obj).map(function (key) { return obj[key] })
)
