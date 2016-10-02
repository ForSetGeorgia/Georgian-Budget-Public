const React = require('react')
const { string, func, object } = React.PropTypes
const { connect } = require('react-redux')
const BudgetItemTypeSelect = require('../presentation/BudgetItemTypeSelect')

const {
  setBudgetItemType,
  updateBudgetItemFilterOptions
} = require('js/actions')

const Container = React.createClass({
  contextTypes: {
    location: object,
    router: object
  },

  propTypes: {
    value: string,
    queryValue: string,
    dispatchBudgetItemType: func
  },

  handleChangeEvent (selected) {
    const { value } = selected
    if (!value) return

    this.props.dispatchBudgetItemType(selected)

    // If the value in the URL and the new value are not the same,
    // update the URL query param with the new value
    if (this.props.queryValue === value) return

    const newLocation = Object.assign(
      {},
      this.context.location,
      {
        query: Object.assign(
          {},
          this.context.location.query,
          { budgetItemType: value }
        )
      }
    )

    this.context.router.push(newLocation)
  },

  currentValue () {
    return this.props.value
  },

  render () {
    return <BudgetItemTypeSelect
      value={this.currentValue()}
      queryValue={this.props.queryValue}
      handleChangeEvent={this.handleChangeEvent}
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
