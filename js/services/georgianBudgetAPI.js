const axios = require('axios')

const { addBudgetItemsError } = require('js/redux/ducks/budgetItems/errors')
const { dispatch } = require('js/redux/store')

function get (locale, version, options) {
  return axios.get(
    `${process.env.API_URL}/${locale}/${version}`,
    options
  ).catch((error) => {
    dispatch(addBudgetItemsError(`Error communicating with API: ${error}`))
  })
}

module.exports = { get }
