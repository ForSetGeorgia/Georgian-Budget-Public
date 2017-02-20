const React = require('react')
const { func, object } = React.PropTypes
const { withRouter } = require('react-router')
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')
const timePeriodTypeMessages = require('src/messages/timePeriodTypes')
const { timePeriodTypes } = require('src/data/modules/timePeriod/types')
const changeQueryOption = require('src/data/modules/changeQueryOption')

const {
  setTimePeriodType,
  getTimePeriodType
} = require('src/data/ducks/filters')

const ButtonSelector = require('src/components/shared/ButtonSelector')

const TimePeriodTypeSelect = React.createClass({
  contextTypes: {
    location: object.isRequired
  },

  propTypes: {
    router: object.isRequired,
    setTimePeriodType: func.isRequired
  },

  handleChangeEvent (selectedTimePeriodType) {
    const { setTimePeriodType, router } = this.props
    const { location } = this.context

    changeQueryOption(router, location, { timePeriodType: selectedTimePeriodType })
    setTimePeriodType(selectedTimePeriodType)
  },

  render () {
    return (
      <ButtonSelector
        handleChangeEvent={this.handleChangeEvent}
        {...this.props}
      />
    )
  }
})

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
  setTimePeriodType: value => dispatch(setTimePeriodType(value))
})

module.exports = injectIntl(withRouter(
  connect(mapStateToProps, mapDispatchToProps)(TimePeriodTypeSelect)
))
