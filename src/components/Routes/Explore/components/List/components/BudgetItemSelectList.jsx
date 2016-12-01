const React = require('react')
const { arrayOf, func, shape, string } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')

const {
  getSelectedBudgetItemIds,
  setSelectedBudgetItemIds,
  setExploreDisplay
} = require('src/data/ducks/explore')

const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const CountDisplay = require('./CountDisplay')
const Griddle = require('griddle-react')

const BudgetItemSelectList = React.createClass({
  propTypes: {
    selectedIds: arrayOf(string).isRequired,
    items: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired
    })).isRequired,
    setSelectedBudgetItemIds: func.isRequired,
    setExploreDisplay: func.isRequired
  },

  handleClick (row) {
    const selectedIds = [row.props.data.id]
    this.props.setSelectedBudgetItemIds(selectedIds)
    this.props.setExploreDisplay('details')
  },

  rowClassName (row) {
    let className = 'gb-ExploreList-row'

    if (this.props.selectedIds.includes(row.id)) {
      className += ' is-selected'
    }

    return className
  },

  isLoading () {
    return this.props.items.length === 0
  },

  render () {
    const { items } = this.props

    if (this.isLoading()) return <LoadingIndicator />

    return (
      <div>
        <CountDisplay items={items} />
        <Griddle
          results={items}
          onRowClick={this.handleClick}
          showFilter
          enableInfiniteScroll
          bodyHeight='400'
          useGriddleStyles={false}
          columns={['name']}
          rowMetadata={{ bodyCssClassName: this.rowClassName }}
        />
      </div>
    )
  }
})

const mapStateToProps = state => ({
  selectedIds: getSelectedBudgetItemIds(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedBudgetItemIds: ids => { dispatch(setSelectedBudgetItemIds(ids)) },
  setExploreDisplay: display => { dispatch(setExploreDisplay(display)) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(BudgetItemSelectList))
