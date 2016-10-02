const React = require('react')
const { string, func, arrayOf, shape } = React.PropTypes

const Select = require('react-select')

let BudgetItemTypeSelect = React.createClass({
  propTypes: {
    value: string,
    queryValue: string,
    handleChangeEvent: func,
    options: arrayOf(shape({ value: string, label: string }))
  },

  componentDidMount () {
    const { queryValue } = this.props
    const optionValues = this.props.options.map((option) => option.value)

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
          options={this.props.options}
          onChange={this.props.handleChangeEvent}
          clearable={false}
        />
      </div>
    )
  }
})

module.exports = BudgetItemTypeSelect
