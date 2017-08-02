const { defineMessages } = require('react-intl')

module.exports = defineMessages({
  share_description: {
    id: 'app.share.description',
    defaultMessage: 'In {year1}, {amount1} GEL has been spent so far while {amount2} GEL was spent in {year2}. Click to learn more!'
  },
  share_description_short: {
    id: 'app.share.description_short',
    defaultMessage: 'In {year1}, {amount1} GEL has been spent so far. Click to learn more!'
  }
})
