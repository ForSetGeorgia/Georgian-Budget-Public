const path = require('path')

const ROOT = path.resolve('.')
const BUNDLES_RELATIVE = path.join('public', 'bundles')
const BUNDLES = path.join(ROOT, BUNDLES_RELATIVE)

module.exports = {
  ROOT,
  BUNDLES_RELATIVE,
  BUNDLES
}
