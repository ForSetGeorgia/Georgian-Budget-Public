const { defineMessages } = require('react-intl')

module.exports = defineMessages({
  month: {
    adjective: {
      id: 'timePeriodType.month.adjective',
      defaultMessage: 'Monthly'
    }
  },
  quarter: {
    adjective: {
      id: 'timePeriodType.quarter.adjective',
      defaultMessage: 'Quarterly'
    }
  },
  year: {
    adjective: {
      id: 'timePeriodType.year.adjective',
      defaultMessage: 'Yearly'
    },
    noun: {
      id: 'timePeriodType.year.noun',
      defaultMessage: 'Year'
    }
  }
})
