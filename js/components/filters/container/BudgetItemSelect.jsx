const React = require('react')
const BudgetItemSelect = require('../presentation/BudgetItemSelect')
const { func, number, arrayOf, shape, string, bool } = React.PropTypes
const { connect } = require('react-redux')

const {
  setSelectedBudgetItemIds,
  updateBudgetItems,
  updateBudgetItemFilterOptions
} = require('js/actions')

const Container = React.createClass({
  propTypes: {
    budgetItemType: string,
    selectedIds: arrayOf(number).isRequired,
    options: arrayOf(shape({
      id: number.isRequired,
      name: string.isRequired
    })).isRequired,
    hidden: bool,
    loading: bool,
    handleChange: func,
    loadOptions: func
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

  render () {
    return (
      <BudgetItemSelect
        budgetItemType={this.props.budgetItemType}
        selectedIds={this.props.selectedIds}
        options={this.props.options}
        hidden={this.props.hidden}
        loading={this.props.loading}
        handleChange={this.props.handleChange}
        labelText={this.labelText()}
      />
    )
  }
})

const mapStateToProps = (state) => ({
  selectedIds: state.filters.budgetItems.selectedIds,
  options: state.filters.budgetItems.options,
  hidden: state.filters.budgetItems.hidden,
  loading: state.filters.budgetItems.loading,
  budgetItemType: state.filters.budgetItemType.value
})

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

module.exports = connect(mapStateToProps, mapDispatchToProps)(Container)
