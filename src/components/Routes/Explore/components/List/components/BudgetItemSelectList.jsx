const React = require('react')
const { arrayOf, object, func } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')

const {
  setSelectedBudgetItemIds,
  setExploreDisplay
} = require('src/data/ducks/explore')

const CountDisplay = require('./CountDisplay')
const Griddle = require('griddle-react')

const BudgetItemSelectList = React.createClass({
  propTypes: {
    items: arrayOf(object),
    setSelectedBudgetItemIds: func.isRequired,
    setExploreDisplay: func.isRequired
  },

  handleClick (row) {
    const selectedIds = [row.props.data.id]
    this.props.setSelectedBudgetItemIds(selectedIds)
    this.props.setExploreDisplay('details')
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
          {...this.props}
        />
      </div>
    )
  }
})

const mapDispatchToProps = dispatch => ({
  setSelectedBudgetItemIds: ids => { dispatch(setSelectedBudgetItemIds(ids)) },
  setExploreDisplay: display => { dispatch(setExploreDisplay(display)) }
})

module.exports = injectIntl(connect(null, mapDispatchToProps)(BudgetItemSelectList))
