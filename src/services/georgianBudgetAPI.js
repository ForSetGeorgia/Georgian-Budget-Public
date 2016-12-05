const axios = require('axios')

const { addError } = require('src/data/ducks/errors')
const { dispatch } = require('src/data/store')

function get (locale, version, options) {
  return axios.get(
    `${process.env.API_URL}/${locale}/${version}`,
    Object.assign(
      {},
      options,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-Key-Inflection': 'camel'
        }
      }
    )
  ).catch((error) => {
    dispatch(addError(`Error communicating with API: ${error}`))
  })
}

module.exports = { get }
