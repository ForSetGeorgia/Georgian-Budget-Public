const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')
const timePeriodTypeMessages = require('src/messages/timePeriodTypes')
const { timePeriodTypes } = require('src/data/modules/timePeriod/types')

const {
  setTimePeriodType,
  getTimePeriodType
} = require('src/data/ducks/filters')

const ButtonSelector = require('src/components/shared/ButtonSelector')

const getOptions = intl => (
  timePeriodTypes.map(timePeriodType => ({
    value: timePeriodType,
    label: intl.formatMessage(timePeriodTypeMessages[timePeriodType].adjective)
  }))
)

const mapStateToProps = (state, ownProps) => ({
  options: getOptions(ownProps.intl),
  selectedValue: getTimePeriodType(state)
})

const mapDispatchToProps = dispatch => ({
  handleChangeEvent: value => dispatch(setTimePeriodType(value))
})

module.exports = injectIntl(
  connect(mapStateToProps, mapDispatchToProps)(ButtonSelector)
)
