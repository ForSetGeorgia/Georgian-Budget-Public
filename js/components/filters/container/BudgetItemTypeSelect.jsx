const React = require('react')
const { string, func, object } = React.PropTypes
const { connect } = require('react-redux')
const { updateLocationWithQuery } = require('js/helpers/updateLocationWithQuery')
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

  options: [
    { value: 'total', label: 'საქართველოს მთლიანი ბიუჯეტი' },
    { value: 'program', label: 'პროგრამები' },
    { value: 'spending_agency', label: 'მხარჯავი დაწესებულებები' },
    { value: 'priority', label: 'პრიორიტეტები' }
  ],

  get optionValues () {
    return this.options.map((option) => option.value)
  },

  handleChangeEvent (selected) {
    const { value } = selected
    if (!value) return

    this.props.dispatchBudgetItemType(selected)

    // If the value in the URL and the new value are not the same,
    // update the URL query param with the new value
    if (this.props.queryValue === value) return

    this.context.router.push(
      updateLocationWithQuery(
        this.context.location,
        { budgetItemType: value }
      )
    )
  },

  componentDidMount () {
    const { queryValue } = this.props

    if (queryValue && this.optionValues.includes(queryValue)) {
      this.handleChangeEvent({ value: queryValue })
    } else {
      this.handleChangeEvent({ value: 'total' })
    }
  },

  render () {
    return <BudgetItemTypeSelect
      value={this.props.value}
      handleChangeEvent={this.handleChangeEvent}
      options={this.options}
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
