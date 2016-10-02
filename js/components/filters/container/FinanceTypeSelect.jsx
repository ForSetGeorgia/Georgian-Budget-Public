const React = require('react')
const { string, func } = React.PropTypes
const { connect } = require('react-redux')
const { setFinanceType, updateBudgetItems } = require('js/actions')
const FinanceTypeSelect = require('../presentation/FinanceTypeSelect')

const Container = React.createClass({
  propTypes: {
    dispatchNewFinanceType: func,
    selectedValue: string
  },

  options: [
    { value: 'spent_finance', label: 'დახარჯული ფინანსები' },
    { value: 'planned_finance', label: 'დაგეგმილი ფინანსები' }
  ],

  handleChangeEvent (selected) {
    this.props.dispatchNewFinanceType(selected.value)
  },

  render () {
    return (
      <FinanceTypeSelect
        handleChange={this.handleChangeEvent}
        selectedValue={this.props.selectedValue}
        options={this.options}
      />
    )
  }
})

const mapStateToProps = (state) => ({
  selectedValue: state.filters.financeType.value
})

const mapDispatchToProps = (dispatch) => ({
  dispatchNewFinanceType (value) {
    dispatch(setFinanceType(value))
    dispatch(updateBudgetItems())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Container)
