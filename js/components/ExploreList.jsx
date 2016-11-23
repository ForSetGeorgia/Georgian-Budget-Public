const React = require('react')
const { arrayOf, shape, string, func } = React.PropTypes
const { connect } = require('react-redux')
const Griddle = require('griddle-react')

const LoadingIndicator = require('./LoadingIndicator')

const {
  getSelectedBudgetItemIds,
  setSelectedBudgetItemIds
} = require('js/redux/ducks/explore')

const { getListedItems } = require('js/redux/ducks/explore/list')

const ExploreList = React.createClass({
  propTypes: {
    selectedIds: arrayOf(string).isRequired,
    listedItems: arrayOf(shape({
      id: string.isRequired,
      name: string.isRequired
    })).isRequired,
    setSelectedBudgetItemIds: func.isRequired
  },

  handleClick (row) {
    this.props.setSelectedBudgetItemIds([row.props.data.id])
  },

  rowClassName (row) {
    let className = 'gb-ExploreList-row'

    if (this.props.selectedIds.includes(row.id)) {
      className += ' is-selected'
    }

    return className
  },

  render () {
    let content

    if (this.props.listedItems.length === 0) {
      content = <LoadingIndicator />
    } else {
      content = <Griddle
        results={this.props.listedItems}
        columns={['name']}
        onRowClick={this.handleClick}
        rowMetadata={{ bodyCssClassName: this.rowClassName }}
        useGriddleStyles={false}
        showFilter
        enableInfiniteScroll
        bodyHeight='400'
      />
    }

    return (
      <div className='gb-ExploreList'>
        {content}
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  selectedIds: getSelectedBudgetItemIds(state),
  listedItems: getListedItems(state)
})

const mapDispatchToProps = dispatch => ({
  setSelectedBudgetItemIds: (ids) => { dispatch(setSelectedBudgetItemIds(ids)) }
})

module.exports = connect(mapStateToProps, mapDispatchToProps)(ExploreList)
