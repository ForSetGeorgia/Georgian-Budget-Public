// tells node to run all required files through babel
// Note: this file is not run through babel, so it cannot use all
// ES2015 syntax
require('babel-register')

require('dotenv').config()

const Env = process.env.NODE_ENV || 'development'
const DEV = Env === 'development'
const STAGING = Env === 'staging'
const PROD = Env === 'production'

console.log(`Starting app in ${process.env.NODE_ENV} environment`)

require('js/server.js')
