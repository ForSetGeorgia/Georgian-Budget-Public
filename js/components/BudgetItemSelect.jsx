const React = require('react')
const { func, number, arrayOf, shape, string, bool } = React.PropTypes
const { connect } = require('react-redux')

const Select = require('react-select')
const LoadingIndicator = require('js/components/LoadingIndicator')

const { setSelectedBudgetItemIds, updateBudgetItems, updateBudgetItemFilterOptions } = require('../actions')

let BudgetItemSelect = React.createClass({
  propTypes: {
    handleChange: func.isRequired,
    loadOptions: func.isRequired,
    selectedIds: arrayOf(number).isRequired,
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
  render: function () {
    if (this.props.loading) {
      return <LoadingIndicator hidden={this.props.hidden} />
    } else {
      let style = {}
      if (this.props.hidden) style.display = 'none'

      return (
        <Select
          name='budget-item-select'
          style={style}
          value={this.props.selectedIds}
          options={this.props.options}
          onChange={this.props.handleChange}
          disabled={this.props.options.length === 0}
          labelKey='name'
          valueKey='id'
          multi
          simpleValue
        />
      )
    }
  }
})

const mapStateToProps = (state) => {
  return state.filters.budgetItems
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
