const React = require('react')
const { func, number, arrayOf, shape, string, bool } = React.PropTypes

const Select = require('react-select')

let BudgetItemSelect = React.createClass({
  propTypes: {
    handleChange: func.isRequired,
    selectedIds: arrayOf(number).isRequired,
    budgetItemType: string,
    options: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired
    })).isRequired,
    hidden: bool,
    labelText: string,
    loading: bool
  },

  render: function () {
    let style = {}
    if (this.props.hidden) style.display = 'none'

    return (
      <div className='filter' style={style}>
        <label htmlFor='budget-item-select'>
          {this.props.labelText}
        </label>
        <Select
          id='budget-item-select'
          name='budget-item-select'
          value={this.props.selectedIds}
          options={this.props.options}
          onChange={this.props.handleChange}
          disabled={this.props.options.length === 0}
          isLoading={this.props.loading}
          labelKey='name'
          valueKey='id'
          multi
          simpleValue
        />
      </div>
    )
  }
})

module.exports = BudgetItemSelect
