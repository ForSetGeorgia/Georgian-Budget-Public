const React = require('react')
const { object, func, number, arrayOf, shape, string, bool } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape, defineMessages } = require('react-intl')

const budgetItemTypeMessages = require('js/messages/budgetItemTypes')
const getLocationWithQuery = require('js/helpers/getLocationWithQuery')
const BudgetItemSelect = require('../presentation/BudgetItemSelect')

const { setSelectedBudgetItemIds } = require('js/redux/ducks/filters/budgetItems')

const fetchBudgetItemFilterOptions =
require('js/redux/fetchers/budgetItemFilterOptions')

const fetchBudgetItems = require('js/redux/fetchers/budgetItems')

const messages = defineMessages({
  label: {
    id: 'app.filters.budgetItem.label',
    description: 'Budget item filter label',
    defaultMessage: 'Select {type}'
  }
})

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
    visible: bool,
    loading: bool,
    dispatchNewSelectedBudgetItemIds: func,
    loadOptions: func,
    location: object,
    intl: intlShape
  },

  updateURLWithSelected (selectedIds) {
    this.context.router.push(
      getLocationWithQuery(
        this.props.location,
        {
          budgetItemIds: selectedIds
        }
      )
    )
  },

  handleChange (selected) {
    const selectedIds = selected.length === 0 ? [] : selected.split(',').map(
      (id) => Number(id)
    )

    this.props.dispatchNewSelectedBudgetItemIds(selectedIds)
    this.updateURLWithSelected(selectedIds)
  },

  componentDidMount () {
    const { loadOptions, querySelectedIds } = this.props
    loadOptions()

    if (!querySelectedIds || querySelectedIds.length === 0) return

    this.handleChange(querySelectedIds.join(','))
  },

  labelText () {
    let type

    switch (this.props.budgetItemType) {
      case 'spending_agency':
        type = 'spendingAgency'
        break
      case 'total':
        type = 'wholeBudget'
        break
      default:
        type = this.props.budgetItemType
    }

    return this.props.intl.formatMessage(
      messages.label,
      {
        type: type ? this.props.intl.formatMessage(
          budgetItemTypeMessages[type].one
        ) : ''
      }
    )
  },

  render () {
    return (
      <BudgetItemSelect
        budgetItemType={this.props.budgetItemType}
        selectedIds={this.props.selectedIds}
        options={this.props.options}
        visible={this.props.visible}
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
    visible: state.filters.budgetItems.visible,
    loading: state.filters.budgetItems.loading,
    budgetItemType: state.filters.budgetItemType.value
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    loadOptions: function (selected) {
      dispatch(fetchBudgetItemFilterOptions())
    },
    dispatchNewSelectedBudgetItemIds: function (selectedIds) {
      dispatch(setSelectedBudgetItemIds(selectedIds))
      dispatch(fetchBudgetItems())
    }
  }
}

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(Container))
