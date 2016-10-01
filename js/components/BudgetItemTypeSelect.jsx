const React = require('react')
const { string, func } = React.PropTypes
const { connect } = require('react-redux')

const Select = require('react-select')

const { setBudgetItemType, updateBudgetItemFilterOptions } = require('../actions')

let BudgetItemTypeSelect = React.createClass({
  propTypes: {
    value: string,
    queryValue: string,
    handleChange: func
  },

  options: [
    { value: 'total', label: 'საქართველოს მთლიანი ბიუჯეტი' },
    { value: 'program', label: 'პროგრამები' },
    { value: 'spending_agency', label: 'მხარჯავი დაწესებულებები' },
    { value: 'priority', label: 'პრიორიტეტები' }
  ],

  componentDidMount () {
    const { handleChange, queryValue } = this.props
    const optionValues = this.options.map((option) => option.value)

    if (queryValue && optionValues.includes(queryValue)) {
      handleChange({ value: queryValue })
    } else {
      handleChange({ value: 'total' })
    }
  },

  render: function () {
    return (
      <Select
        name='budget-item-type-select'
        value={this.props.value}
        options={this.options}
        onChange={this.props.handleChange}
        clearable={false}
      />
    )
  }
})

const mapStateToProps = (state) => {
  const locationBeforeTransitions = state.routing.locationBeforeTransitions
  const props = {
    value: state.filters.budgetItemType.value
  }

  if (locationBeforeTransitions && locationBeforeTransitions.query) {
    props.queryValue = locationBeforeTransitions.query.budgetItemType
  }

  return props
}

const mapDispatchToProps = (dispatch) => ({
  handleChange (selected) {
    dispatch(setBudgetItemType(selected.value))
    dispatch(updateBudgetItemFilterOptions())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeSelect)
