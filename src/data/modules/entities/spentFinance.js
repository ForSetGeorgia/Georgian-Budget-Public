const { getSpentFinances } = require('src/data/ducks/spentFinances')

const getSpentFinance = (state, financeId) => (
  getSpentFinances(state)[financeId]
)

module.exports = {
  getSpentFinance
}
