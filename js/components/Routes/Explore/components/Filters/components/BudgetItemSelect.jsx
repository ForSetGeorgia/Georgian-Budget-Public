const React = require('react')
const { object, func, arrayOf, shape, string, bool } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape, defineMessages } = require('react-intl')

const budgetItemTypeMessages = require('js/messages/budgetItemTypes')
const GBSelect = require('./GBSelect')

const {
  setSelectedBudgetItemIds,
  getSelectedBudgetItemIds
} = require('js/redux/ducks/explore')

const { getBudgetItemsFilterLoading } = require('js/redux/ducks/filters/budgetItems')


const messages = defineMessages({
  label: {
    id: 'app.filters.budgetItem.label',
    description: 'Budget item filter label',
    defaultMessage: 'Select {type}'
  }
})

const BudgetItemSelect = React.createClass({
  propTypes: {
    budgetItemType: string,
    selectedIds: arrayOf(string).isRequired,
    querySelectedIds: arrayOf(string),
    options: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired
    })).isRequired,
    visible: bool,
    loading: bool,
    dispatchNewSelectedBudgetItemIds: func,
    location: object,
    intl: intlShape
  },

  handleChangeEvent (selected) {
    const selectedIds = selected.length === 0 ? [] : selected.split(',')

    this.props.dispatchNewSelectedBudgetItemIds(selectedIds)
  },

  componentDidMount () {
    const { querySelectedIds } = this.props

    if (!querySelectedIds || querySelectedIds.length === 0) return

    this.handleChangeEvent(querySelectedIds.join(','))
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
      <GBSelect
        id='budget-item-select'
        name='budget-item-select'
        additionalClassNames='mod-longer'
        value={this.props.selectedIds}
        options={this.props.options}
        visible={this.props.visible}
        isLoading={this.props.loading}
        handleChangeEvent={this.handleChangeEvent}
        labelText={this.labelText()}
        labelKey='name'
        valueKey='id'
        clearable
        multi
        simpleValue
      />
    )
  }
})

const mapStateToProps = (state, ownProps) => {
  const { budgetItemIds } = ownProps.location.query

  return {
    selectedIds: getSelectedBudgetItemIds(state),
    querySelectedIds: typeof budgetItemIds === 'string' ? [budgetItemIds] : budgetItemIds,
    options: state.filters.budgetItems.options,
    visible: state.filters.budgetItems.visible,
    loading: getBudgetItemsFilterLoading(state),
    budgetItemType: state.filters.budgetItemType.value
  }
}

const mapDispatchToProps = (dispatch) => {
  return {

    dispatchNewSelectedBudgetItemIds: function (selectedIds) {
      dispatch(setSelectedBudgetItemIds(selectedIds))
    }
  }
}

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemSelect))
