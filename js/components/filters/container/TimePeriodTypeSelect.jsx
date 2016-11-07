const React = require('react')
const { string, func } = React.PropTypes
const { connect } = require('react-redux')

const { setTimePeriodType } = require('js/redux/ducks/filters/timePeriodType')
const fetchBudgetItems = require('js/redux/fetchers/budgetItems')

const GBSelect = require('../GBSelect')

const TimePeriodTypeSelect = React.createClass({
  propTypes: {
    value: string.isRequired,
    setTimePeriodType: func.isRequired,
    fetchBudgetItems: func.isRequired
  },

  options () {
    return [
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'yearly', label: 'Yearly' }
    ]
  },

  handleChangeEvent (selected) {
    const { value } = selected
    this.props.setTimePeriodType(value)
    this.props.fetchBudgetItems()
  },

  render () {
    return (
      <GBSelect
        id='time-period-type-select'
        name='time-period-type-select'
        value={this.props.value}
        handleChangeEvent={this.handleChangeEvent}
        options={this.options()}
        labelText='Select the Time Period Type'
      />
    )
  }
})

const mapStateToProps = (state) => ({
  value: state.filters.timePeriodType.value
})

const mapDispatchToProps = (dispatch) => ({
  setTimePeriodType: (value) => {
    dispatch(setTimePeriodType(value))
  },
  fetchBudgetItems: () => {
    dispatch(fetchBudgetItems())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(TimePeriodTypeSelect)
