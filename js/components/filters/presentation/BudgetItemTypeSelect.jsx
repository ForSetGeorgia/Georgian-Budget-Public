const React = require('react')
const { string, func, object } = React.PropTypes

const Select = require('react-select')

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
      <div>
        <label htmlFor='budget-item-type-select'>
          აირჩიე Budget Item Type
        </label>
        <Select
          id='budget-item-type-select'
          name='budget-item-type-select'
          value={this.props.value}
          options={this.options}
          onChange={this.handleChangeEvent}
          clearable={false}
        />
      </div>
    )
  }
})

module.exports = BudgetItemTypeSelect
