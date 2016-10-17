const axios = require('axios')

function get (locale, version, options) {
  return axios.get(
    `${process.env.API_URL}/${locale}/${version}`,
    options
  )
}

module.exports = { get }
