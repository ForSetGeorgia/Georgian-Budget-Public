const React = require('react')
const { arrayOf, func, object, string } = React.PropTypes
const { connect } = require('react-redux')

const {
  getSelectedBudgetItemIds,
  setSelectedBudgetItemIds
} = require('js/redux/ducks/explore')

const SelectedIdsInitializer = React.createClass({
  contextTypes: {
    location: object
  },

  propTypes: {
    selectedIds: arrayOf(string).isRequired,
    setSelectedBudgetItemIds: func.isRequired
  },

  getQuerySelectedIds () {
    const ids = this.context.location.query.budgetItemIds
    return typeof ids === 'string' ? [ids] : ids
  },

  updateSelectedIdsFromURL () {
    const querySelectedIds = this.getQuerySelectedIds()

    if (!querySelectedIds || querySelectedIds.length === 0) return

    this.props.setSelectedBudgetItemIds(querySelectedIds)
  },

  componentDidMount () {
    if (this.props.selectedIds && this.props.selectedIds.length > 0) return
    this.updateSelectedIdsFromURL()
  },

  render () {
    return null
  }
})

const mapStateToProps = state => ({
  selectedIds: getSelectedBudgetItemIds(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedBudgetItemIds: ids => { dispatch(setSelectedBudgetItemIds(ids)) }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(SelectedIdsInitializer)
