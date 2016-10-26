// tells node to run all required files through babel
// Note: this file is not run through babel, so it cannot use all
// ES2015 syntax
require('babel-register')
require('dotenv').config()

const paths = require('config/paths')
const Webpack_isomorphic_tools = require('webpack-isomorphic-tools')

const project_base_path = require('path').resolve(__dirname)

global.webpack_isomorphic_tools = new Webpack_isomorphic_tools(
  require('./config/webpack/isomorphic-tools.config.js')
)

global.webpack_isomorphic_tools.server(
  paths.ROOT,
  function() {
    require('js/server.js')
  }
)
