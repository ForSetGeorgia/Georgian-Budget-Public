const React = require('react')
const { arrayOf, func, object, string } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')

const {
  getSelectedBudgetItemIds,
  setSelectedBudgetItemIds,
  setExploreDisplay
} = require('src/data/ducks/explore')

const CountDisplay = require('./CountDisplay')
const Griddle = require('griddle-react')

const BudgetItemSelectList = React.createClass({
  propTypes: {
    selectedIds: arrayOf(string).isRequired,
    items: arrayOf(object),
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

  render () {
    const { items } = this.props

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
          {...this.props}
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
