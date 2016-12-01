const React = require('react')
const { arrayOf, object } = React.PropTypes

const CountDisplay = require('./CountDisplay')
const Griddle = require('griddle-react')

const BudgetItemSelectList = React.createClass({
  propTypes: {
    items: arrayOf(object)
  },

  render () {
    const { items } = this.props

    return (
      <div>
        <CountDisplay items={items} />
        <Griddle
          results={items}
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

module.exports = BudgetItemSelectList
