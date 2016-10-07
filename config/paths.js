const path = require('path')

const ROOT = path.resolve('.')
const PUBLIC = path.join(ROOT, 'public')
const BUNDLES = path.join(PUBLIC, 'bundles')

module.exports = {
  ROOT,
  PUBLIC,
  BUNDLES
}
