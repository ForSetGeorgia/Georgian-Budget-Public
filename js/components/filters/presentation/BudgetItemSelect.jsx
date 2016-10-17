const React = require('react')
const Select = require('react-select')

const BudgetItemSelect = (props) => {
  let style = {}
  if (!props.visible) style.display = 'none'

  return (
    <div className='filter' style={style}>
      <label htmlFor='budget-item-select'>
        {props.labelText}
      </label>
      <Select
        id='budget-item-select'
        name='budget-item-select'
        value={props.selectedIds}
        options={props.options}
        onChange={props.handleChange}
        disabled={props.options.length === 0}
        isLoading={props.loading}
        labelKey='name'
        valueKey='id'
        multi
        simpleValue
      />
    </div>
  )
}

const { func, number, arrayOf, shape, string, bool } = React.PropTypes

BudgetItemSelect.propTypes = {
  handleChange: func.isRequired,
  selectedIds: arrayOf(number).isRequired,
  budgetItemType: string,
  options: arrayOf(shape({
    id: number.isRequired,
    name: string.isRequired
  })).isRequired,
  visible: bool,
  labelText: string,
  loading: bool
}

module.exports = BudgetItemSelect
