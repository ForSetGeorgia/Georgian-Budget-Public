const { defineMessages } = require('react-intl')

const messages = defineMessages({
  wholeBudget: {
    one: {
      id: 'budgetType.wholeBudget.one',
      description: 'Name of the whole Georgian budget',
      defaultMessage: 'Whole Budget'
    }
  },
  program: {
    one: {
      id: 'budgetType.program.one',
      description: 'Singular program',
      defaultMessage: 'Program'
    },
    other: {
      id: 'budgetType.program.other',
      description: 'The text for multiple programs',
      defaultMessage: 'Programs'
    }
  },
  spendingAgency: {
    one: {
      id: 'budgetType.spendingAgency.one',
      description: 'Singular spending agency',
      defaultMessage: 'Spending Agency'
    },
    other: {
      id: 'budgetType.spendingAgency.other',
      description: 'Multiple spending agencies',
      defaultMessage: 'Spending Agencies'
    }
  },
  priority: {
    one: {
      id: 'budgetType.priority.one',
      description: 'Singular priority',
      defaultMessage: 'Priority'
    },
    other: {
      id: 'budgetType.priority.other',
      description: 'Multiple priorities',
      defaultMessage: 'Priorities'
    }
  }
})

module.exports = messages
