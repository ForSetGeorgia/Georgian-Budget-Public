const { getSpentFinances } = require('js/data/ducks/spentFinances')

const getSpentFinance = (state, financeId) => (
  getSpentFinances(state)[financeId]
)

module.exports = {
  getSpentFinance
}
