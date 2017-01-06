const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const {
  getSelectedTimePeriods,
  getTimePeriodType
} = require('src/data/ducks/filters')

const { getDetailsItemId } = require('src/data/ducks/explore')

const FinancesTimeSeries = require('./FinancesTimeSeries')

const getSelectedTimePeriod = state => (
  getSelectedTimePeriods(state)[0]
)

const getSurroundingTimePeriod = state => {
  if (getTimePeriodType(state) === 'year') {
    return 'all'
  } else {
    return getSelectedTimePeriod(state)
  }
}

const getKey = state => (
  `${getTimePeriodType(state)}-${getSelectedTimePeriod(state)}`
)

const mapStateToProps = state => ({
  itemIds: [getDetailsItemId(state)],
  key: getKey(state),
  showSpentFinances: true,
  showPlannedFinances: true,
  timePeriodType: getTimePeriodType(state),
  inTimePeriod: getSurroundingTimePeriod(state)
})

module.exports = injectIntl(connect(mapStateToProps)(FinancesTimeSeries))
