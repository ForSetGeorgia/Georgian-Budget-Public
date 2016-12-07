const { defineMessages } = require('react-intl')

module.exports = defineMessages({
  spentFinance: {
    adjective: {
      id: 'financeType.spentFinance.adjective',
      defaultMessage: 'Spent'
    },
    other: {
      id: 'financeType.spentFinance.other',
      description: 'Multiple spent finances',
      defaultMessage: 'Spent Finances'
    }
  },
  plannedFinance: {
    adjective: {
      id: 'financeType.plannedFinance.adjective',
      defaultMessage: 'Planned'
    },
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
