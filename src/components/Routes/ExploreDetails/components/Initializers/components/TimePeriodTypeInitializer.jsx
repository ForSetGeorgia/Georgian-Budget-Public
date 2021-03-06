const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { timePeriodTypes } = require('src/data/modules/timePeriod/types')

const {
  getTimePeriodType,
  setTimePeriodType
} = require('src/data/ducks/filters')

const StateInitializer = require('src/components/shared/StateInitializer')

const mapStateToProps = state => ({
  selectedTargetValue: getTimePeriodType(state),
  queryTargetName: 'timePeriodType',
  defaultTargetValue: 'month',
  permittedTargetValues: timePeriodTypes
})

const mapDispatchToProps = dispatch => ({
  setTargetValue (value) {
    dispatch(setTimePeriodType(value))
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(StateInitializer))
