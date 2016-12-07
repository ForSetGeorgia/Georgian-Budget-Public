const { defineMessages } = require('react-intl')

module.exports = defineMessages({
  spentFinance: {
    other: {
      id: 'financeType.spentFinance.other',
      description: 'Multiple spent finances',
      defaultMessage: 'Spent Finances'
    }
  },
  plannedFinance: {
    other: {
      id: 'financeType.plannedFinance.other',
      description: 'Multiple planned finances',
      defaultMessage: 'Planned Finances'
    }
  },
  difference: {
    id: 'financeType.difference',
    defaultMessage: 'Difference'
  }
})
