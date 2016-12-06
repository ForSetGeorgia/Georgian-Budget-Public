const axios = require('axios')

const { addError } = require('src/data/ducks/errors')
const { dispatch } = require('src/data/store')

function get (locale, version, options) {
  axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest'
  axios.defaults.headers.common['X-Key-Inflection'] = 'camel'
  return axios.get(
    `${process.env.API_URL}/${locale}/${version}`,
    {
      params: options.params
      // headers: Object.assign(
      //   {},
      //   axios.defaults.headers.common,
      //   {
      //     'X-Requested-With': 'XMLHttpRequest',
      //     'X-Key-Inflection': 'camel'
      //   }
      // )
    }
  ).catch((error) => {
    dispatch(addError(`Error communicating with API: ${error}`))
  })
}

module.exports = { get }
