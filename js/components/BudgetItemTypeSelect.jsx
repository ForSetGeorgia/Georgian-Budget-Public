const React = require('react')
const { string, func, object } = React.PropTypes
const { connect } = require('react-redux')

const Select = require('react-select')

const { setBudgetItemType, updateBudgetItemFilterOptions } = require('../actions')

let BudgetItemTypeSelect = React.createClass({
  contextTypes: {
    location: object,
    router: object
  },

  propTypes: {
    value: string,
    queryValue: string,
    dispatchBudgetItemType: func
  },

  options: [
    { value: 'total', label: 'საქართველოს მთლიანი ბიუჯეტი' },
    { value: 'program', label: 'პროგრამები' },
    { value: 'spending_agency', label: 'მხარჯავი დაწესებულებები' },
    { value: 'priority', label: 'პრიორიტეტები' }
  ],

  componentDidMount () {
    const { queryValue } = this.props
    const optionValues = this.options.map((option) => option.value)

    if (queryValue && optionValues.includes(queryValue)) {
      this.handleChangeEvent({ value: queryValue })
    } else {
      this.handleChangeEvent({ value: 'total' })
    }
  },

  handleChangeEvent (selected) {
    const { value } = selected
    if (!value) return

    this.props.dispatchBudgetItemType(selected)

    // If the value in the URL and the new value are not the same,
    // update the URL query param with the new value
    if (this.props.queryValue === value) return

    const newLocation = Object.assign(
      {},
      this.context.location,
      {
        query: Object.assign(
          {},
          this.context.location.query,
          { budgetItemType: value }
        )
      }
    )

    this.context.router.push(newLocation)
  },

  render: function () {
    return (
      <Select
        name='budget-item-type-select'
        value={this.props.value}
        options={this.options}
        onChange={this.handleChangeEvent}
        clearable={false}
      />
    )
  }
})

const mapStateToProps = (state) => {
  const props = {
    value: state.filters.budgetItemType.value
  }

  const { locationBeforeTransitions } = state.routing

  if (!locationBeforeTransitions || !locationBeforeTransitions.query) return props
  props.queryValue = locationBeforeTransitions.query.budgetItemType

  return props
}

const mapDispatchToProps = (dispatch) => ({
  dispatchBudgetItemType (selected) {
    dispatch(setBudgetItemType(selected.value))
    dispatch(updateBudgetItemFilterOptions())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(BudgetItemTypeSelect)
