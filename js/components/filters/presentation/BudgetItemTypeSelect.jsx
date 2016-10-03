const React = require('react')
const { string, func, arrayOf, shape } = React.PropTypes

const Select = require('react-select')

let BudgetItemTypeSelect = React.createClass({
  propTypes: {
    value: string,
    handleChangeEvent: func,
    options: arrayOf(shape({ value: string, label: string }))
  },

  render: function () {
    return (
      <div className='filter'>
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
