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
  spentFinanceCalculated: {
    adjective: {
      id: 'financeType.spentFinanceCalculated.adjective',
      defaultMessage: 'Spent (Calculated)'
    },
    other: {
      id: 'financeType.spentFinanceCalculated.other',
      description: 'Multiple spent finances(Calculated)',
      defaultMessage: 'Spent Finances (Calculated)'
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
  plannedFinanceCalculated: {
    adjective: {
      id: 'financeType.plannedFinanceCalculated.adjective',
      defaultMessage: 'Planned (Calculated)'
    },
    other: {
      id: 'financeType.plannedFinanceCalculated.other',
      description: 'Multiple planned finances(Calculated)',
      defaultMessage: 'Planned Finances (Calculated)'
    }
  },
  difference: {
    id: 'financeType.difference',
    defaultMessage: 'Difference'
  },
  missing: {
    id: 'financeType.missing',
    defaultMessage: 'Missing'
  }
})
