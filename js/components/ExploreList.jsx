const React = require('react')
const { array, arrayOf, string } = React.PropTypes
const { connect } = require('react-redux')
const Griddle = require('griddle-react')

const LoadingIndicator = require('./LoadingIndicator')
const { getSelectedBudgetItemIds } = require('js/redux/ducks/explore')

const ExploreList = React.createClass({
  propTypes: {
    items: array,
    selectedIds: arrayOf(string)
  },

  handleClick (row) {
    console.log(row.props.data.id)
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

    if (this.props.items.length === 0) {
      content = <LoadingIndicator />
    } else {
      content = <Griddle
        results={this.props.items}
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
  items: state.filters.budgetItems.options
})

module.exports = connect(mapStateToProps)(ExploreList)
