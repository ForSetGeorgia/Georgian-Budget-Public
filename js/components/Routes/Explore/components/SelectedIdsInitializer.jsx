const React = require('react')
const { arrayOf, func, object, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getSelectedBudgetItemIds,
  setSelectedBudgetItemIds
} = require('js/redux/ducks/explore')

const fetchBudgetItemDetails = require('js/redux/fetchers/fetchBudgetItemDetails')

const SelectedIdsInitializer = React.createClass({
  contextTypes: {
    location: object
  },

  propTypes: {
    fetchBudgetItemDetails: func.isRequired,
    selectedIds: arrayOf(string).isRequired,
    setSelectedBudgetItemIds: func.isRequired
  },

  // By default, show the complete budget
  defaultSelectedIds: ['8b03adb43773622088d7291c38fbf87b82cbe626'],

  getQuerySelectedIds () {
    const ids = this.context.location.query.budgetItemIds
    return typeof ids === 'string' ? [ids] : ids
  },

  initializeSelectedIds () {
    const querySelectedIds = this.getQuerySelectedIds()

    let newIds

    if (querySelectedIds && querySelectedIds.length > 0) {
      newIds = querySelectedIds
    } else {
      newIds = this.defaultSelectedIds
    }

    this.props.setSelectedBudgetItemIds(newIds)
    return newIds
  },

  componentDidMount () {
    if (this.props.selectedIds && this.props.selectedIds.length > 0) return
    const newIds = this.initializeSelectedIds()
    newIds.forEach(newId => this.props.fetchBudgetItemDetails(newId))
  },

  render () {
    return null
  }
})

const mapStateToProps = state => ({
  selectedIds: getSelectedBudgetItemIds(state)
})

const mapDispatchToProps = dispatch => ({
  fetchBudgetItemDetails: itemId => {
    dispatch(fetchBudgetItemDetails(itemId))
  },
  setSelectedBudgetItemIds: ids => { dispatch(setSelectedBudgetItemIds(ids)) }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(SelectedIdsInitializer)
