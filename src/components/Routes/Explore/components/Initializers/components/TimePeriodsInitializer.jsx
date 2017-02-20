const React = require('react')
const { arrayOf, func, object, string } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')
const isEqual = require('lodash.isequal')

const {
  getSelectedTimePeriods,
  setTimePeriods
 } = require('src/data/ducks/filters')

const TimePeriodsInitializer = React.createClass({
  contextTypes: {
    location: object
  },

  propTypes: {
    setTimePeriods: func.isRequired,
    selectedTimePeriods: arrayOf(string).isRequired
  },

  defaultTimePeriods: ['all'],

  getQueryTimePeriods () {
    const timePeriods = this.context.location.query.timePeriods
    return typeof timePeriods === 'string' ? [timePeriods] : timePeriods
  },

  initializeTimePeriods () {
    const { setTimePeriods, selectedTimePeriods } = this.props

    const queryTimePeriods = this.getQueryTimePeriods()

    if (isEqual(selectedTimePeriods, queryTimePeriods)) return

    if (queryTimePeriods && queryTimePeriods.length > 0) {
      setTimePeriods(queryTimePeriods)
    } else {
      setTimePeriods(this.defaultTimePeriods)
    }
  },

  componentDidUpdate () {
    this.initializeTimePeriods()
  },

  componentDidMount () {
    this.initializeTimePeriods()
  },

  render () {
    return null
  }
})

const mapStateToProps = state => ({
  selectedTimePeriods: getSelectedTimePeriods(state)
})

const mapDispatchToProps = dispatch => ({
  setTimePeriods: timePeriods => { dispatch(setTimePeriods(timePeriods)) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(TimePeriodsInitializer))
