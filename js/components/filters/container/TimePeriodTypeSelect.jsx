const React = require('react')
const { connect } = require('react-redux')

const GBSelect = require('../GBSelect')

const TimePeriodTypeSelect = React.createClass({
  options () {
    return [
      { value: 'monthly', label: 'Monthly' },
      { value: 'quarterly', label: 'Quarterly' },
      { value: 'yearly', label: 'Yearly' }
    ]
  },

  handleChangeEvent () {

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
  value: 'quarterly'
})

module.exports = connect(mapStateToProps)(TimePeriodTypeSelect)
