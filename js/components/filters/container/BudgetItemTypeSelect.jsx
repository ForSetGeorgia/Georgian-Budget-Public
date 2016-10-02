const React = require('react')
const { string, func } = React.PropTypes
const { connect } = require('react-redux')
const BudgetItemTypeSelect = require('../presentation/BudgetItemTypeSelect')

const {
  setBudgetItemType,
  updateBudgetItemFilterOptions
} = require('js/actions')

const Container = React.createClass({

  propTypes: {
    value: string,
    queryValue: string,
    dispatchBudgetItemType: func
  },

  render () {
    return <BudgetItemTypeSelect
      value={this.props.value}
      queryValue={this.props.queryValue}
      dispatchBudgetItemType={this.props.dispatchBudgetItemType}
    />
  }

})

const mapStateToProps = (state) => {
  const props = {
    value: state.filters.budgetItemType.value
  }

  const { locationBeforeTransitions } = state.routing

  if (!locationBeforeTransitions || !locationBeforeTransitions.query) {
    props.queryValue = undefined
  } else {
    props.queryValue = locationBeforeTransitions.query.budgetItemType
  }

  return props
}

const mapDispatchToProps = (dispatch) => ({
  dispatchBudgetItemType (selected) {
    dispatch(setBudgetItemType(selected.value))
    dispatch(updateBudgetItemFilterOptions())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Container)
