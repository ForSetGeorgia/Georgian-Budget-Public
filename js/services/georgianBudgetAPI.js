const axios = require('axios')

const { addError } = require('js/redux/ducks/errors')
const { dispatch } = require('js/redux/store')

function get (locale, version, options) {
  return axios.get(
    `${process.env.API_URL}/${locale}/${version}`,
    options
  ).catch((error) => {
    dispatch(addError(`Error communicating with API: ${error}`))
  })
}

module.exports = { get }
