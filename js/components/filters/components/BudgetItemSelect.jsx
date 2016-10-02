const React = require('react')
const { func, number, arrayOf, shape, string, bool } = React.PropTypes
const { connect } = require('react-redux')

const Select = require('react-select')

const { setSelectedBudgetItemIds, updateBudgetItems, updateBudgetItemFilterOptions } = require('js/actions')

let BudgetItemSelect = React.createClass({
  propTypes: {
    handleChange: func.isRequired,
    loadOptions: func.isRequired,
    selectedIds: arrayOf(number).isRequired,
    budgetItemType: string,
    options: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired
    })).isRequired,
    hidden: bool,
    loading: bool
  },
  componentDidMount () {
    this.props.loadOptions()
  },
  labelText () {
    switch (this.props.budgetItemType) {
      case 'program':
        return 'აირჩიე პროგრამა'
      case 'priority':
        return 'აირჩიე პრიორიტეტი'
      case 'spending_agency':
        return 'აირჩიე მხარჯავი დაწესებულება'
      default:
        return 'none'
    }
  },
  render: function () {
    let style = {}
    if (this.props.hidden) style.display = 'none'

    return (
      <div style={style}>
        <label htmlFor='budget-item-select'>
          {this.labelText()}
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

const mapStateToProps = (state) => {
  return Object.assign(
    {},
    state.filters.budgetItems,
    {
      budgetItemType: state.filters.budgetItemType.value
    }
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOptions: function (selected) {
      dispatch(updateBudgetItemFilterOptions())
    },
    handleChange: function (selected) {
      let selectedIds
      if (selected.length === 0) {
        selectedIds = []
      } else {
        selectedIds = selected.split(',').map((id) => Number(id))
      }

      dispatch(setSelectedBudgetItemIds(selectedIds))
      dispatch(updateBudgetItems())
    }
  }
}

BudgetItemSelect = connect(mapStateToProps, mapDispatchToProps)(BudgetItemSelect)

module.exports = BudgetItemSelect
