const React = require('react')
const { string, func } = React.PropTypes

const Select = require('react-select')

let BudgetItemTypeSelect = React.createClass({
  propTypes: {
    value: string,
    queryValue: string,
    handleChangeEvent: func
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
      this.props.handleChangeEvent({ value: queryValue })
    } else {
      this.props.handleChangeEvent({ value: 'total' })
    }
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
          onChange={this.props.handleChangeEvent}
          clearable={false}
        />
      </div>
    )
  }
})

module.exports = BudgetItemTypeSelect
