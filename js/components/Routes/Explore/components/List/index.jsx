const React = require('react')
const { arrayOf, shape, string, func } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')

const BudgetItemTypeSelect = require('./components/BudgetItemTypeSelect')
const FinanceTypeSelect = require('./components/FinanceTypeSelect')
const ClickableList = require('./components/ClickableList')
const CountDisplay = require('./components/CountDisplay')
const BudgetItemListFetcher = require('./components/BudgetItemListFetcher')

const {
  getSelectedBudgetItemIds,
  setSelectedBudgetItemIds,
  setExploreDisplay
} = require('js/redux/ducks/explore')

const { getListedItems } = require('js/redux/ducks/explore')

const ExploreList = React.createClass({
  propTypes: {
    selectedIds: arrayOf(string).isRequired,
    listedItems: arrayOf(shape({
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
    return this.props.listedItems.length === 0
  },

  render () {
    return (
      <div className='gb-ExploreList'>
        <BudgetItemListFetcher />
        <BudgetItemTypeSelect />
        <FinanceTypeSelect />
        <CountDisplay
          show={!this.isLoading()}
          items={this.props.listedItems}
        />
        <ClickableList
          listedItems={this.props.listedItems}
          loading={this.isLoading()}
          columns={['name']}
          onRowClick={this.handleClick}
          rowMetadata={{ bodyCssClassName: this.rowClassName }}
          useGriddleStyles={false}
          showFilter
          enableInfiniteScroll
          bodyHeight='400'
        />
      </div>
    )
  }
})

const mapStateToProps = state => ({
  selectedIds: getSelectedBudgetItemIds(state),
  listedItems: getListedItems(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedBudgetItemIds: ids => { dispatch(setSelectedBudgetItemIds(ids)) },
  setExploreDisplay: display => { dispatch(setExploreDisplay(display)) }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ExploreList))
