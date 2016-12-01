const React = require('react')
const { arrayOf, func, object, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getSelectedTimePeriods,
  setTimePeriods
 } = require('js/data/ducks/filters')

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
    const { setTimePeriods } = this.props

    const queryTimePeriods = this.getQueryTimePeriods()

    if (queryTimePeriods && queryTimePeriods.length > 0) {
      setTimePeriods(queryTimePeriods)
    } else {
      setTimePeriods(this.defaultTimePeriods)
    }
  },

  componentDidMount () {
    const { selectedTimePeriods } = this.props
    if (selectedTimePeriods && selectedTimePeriods.length > 0) return
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

module.exports = connect(mapStateToProps, mapDispatchToProps)(TimePeriodsInitializer)
