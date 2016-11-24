const { getSpentFinances } = require('js/redux/ducks/spentFinances')

const getSpentFinance = (state, financeId) => (
  getSpentFinances(state)[financeId]
)

module.exports = {
  getSpentFinance
}
