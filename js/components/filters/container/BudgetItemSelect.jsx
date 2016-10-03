const React = require('react')
const { object, func, number, arrayOf, shape, string, bool } = React.PropTypes
const { connect } = require('react-redux')
const getLocationWithQuery = require('js/helpers/getLocationWithQuery')
const BudgetItemSelect = require('../presentation/BudgetItemSelect')

const {
  setSelectedBudgetItemIds,
  updateBudgetItems,
  updateBudgetItemFilterOptions
} = require('js/actions')

const Container = React.createClass({
  contextTypes: {
    router: object
  },

  propTypes: {
    budgetItemType: string,
    selectedIds: arrayOf(number).isRequired,
    querySelectedIds: arrayOf(string),
    options: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired
    })).isRequired,
    hidden: bool,
    loading: bool,
    dispatchNewSelectedBudgetItemIds: func,
    loadOptions: func,
    location: object
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

  handleChange (selected) {
    const selectedIds = selected.length === 0 ? [] : selected.split(',').map(
      (id) => Number(id)
    )

    this.props.dispatchNewSelectedBudgetItemIds(selectedIds)

    this.context.router.push(
      getLocationWithQuery(
        this.props.location,
        {
          budgetItemIds: selectedIds
        }
      )
    )
  },

  componentDidMount () {
    this.props.loadOptions()

    if (this.props.querySelectedIds.length === 0) return

    this.handleChange(this.props.querySelectedIds.join(','))
  },

  render () {
    return (
      <BudgetItemSelect
        budgetItemType={this.props.budgetItemType}
        selectedIds={this.props.selectedIds}
        options={this.props.options}
        hidden={this.props.hidden}
        loading={this.props.loading}
        handleChange={this.handleChange}
        labelText={this.labelText()}
      />
    )
  }
})

const mapStateToProps = (state, ownProps) => {
  const { budgetItemIds } = ownProps.location.query

  return {
    selectedIds: state.filters.budgetItems.selectedIds,
    querySelectedIds: typeof budgetItemIds === 'string' ? [budgetItemIds] : budgetItemIds,
    options: state.filters.budgetItems.options,
    hidden: state.filters.budgetItems.hidden,
    loading: state.filters.budgetItems.loading,
    budgetItemType: state.filters.budgetItemType.value
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOptions: function (selected) {
      dispatch(updateBudgetItemFilterOptions())
    },
    dispatchNewSelectedBudgetItemIds: function (selectedIds) {
      dispatch(setSelectedBudgetItemIds(selectedIds))
      dispatch(updateBudgetItems())
    }
  }
}

module.exports = connect(mapStateToProps, mapDispatchToProps)(Container)
