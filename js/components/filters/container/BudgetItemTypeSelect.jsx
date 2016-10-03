const React = require('react')
const { string, func, object } = React.PropTypes
const { connect } = require('react-redux')
const getLocationWithQuery = require('js/helpers/getLocationWithQuery')
const BudgetItemTypeSelect = require('../presentation/BudgetItemTypeSelect')

const {
  setBudgetItemType,
  updateBudgetItemFilterOptions
} = require('js/actions')

const Container = React.createClass({
  contextTypes: {
    router: object
  },

  propTypes: {
    value: string,
    queryValue: string,
    dispatchBudgetItemType: func,
    location: object
  },

  defaultValue: 'total',

  options: [
    { value: 'total', label: 'საქართველოს მთლიანი ბიუჯეტი' },
    { value: 'program', label: 'პროგრამები' },
    { value: 'spending_agency', label: 'მხარჯავი დაწესებულებები' },
    { value: 'priority', label: 'პრიორიტეტები' }
  ],

  get optionValues () {
    return this.options.map((option) => option.value)
  },

  updateQueryWithNewType (value) {
    this.context.router.push(
      getLocationWithQuery(
        this.props.location,
        {
          budgetItemType: value,
          budgetItemIds: []
        }
      )
    )
  },

  handleChangeEvent (selected) {
    const { value } = selected
    if (!value) return

    this.props.dispatchBudgetItemType(selected)

    // If the value in the URL and the new value are not the same,
    // update the URL query param with the new value
    if (this.props.queryValue === value) return

    this.updateQueryWithNewType(value)
  },

  componentDidMount () {
    const { queryValue } = this.props

    if (this.optionValues.includes(queryValue)) {
      this.handleChangeEvent({ value: queryValue })
    } else {
      this.handleChangeEvent({ value: this.defaultValue })
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

const mapStateToProps = (state, ownProps) => {
  return {
    value: state.filters.budgetItemType.value,
    queryValue: ownProps.location.query.budgetItemType
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchBudgetItemType (selected) {
    dispatch(setBudgetItemType(selected.value))
    dispatch(updateBudgetItemFilterOptions())
  }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(Container)
