const React = require('react')
const { arrayOf, bool, object } = React.PropTypes

const LoadingIndicator = require('src/components/shared/LoadingIndicator')
const CountDisplay = require('./CountDisplay')
const Griddle = require('griddle-react')

const BudgetItemSelectList = (props) => {
  const { listedItems, loading } = props

  if (loading) return <LoadingIndicator />

  return (
    <div>
      <CountDisplay items={listedItems} />
      <Griddle
        results={listedItems}
        {...props}
      />
    </div>
  )
}

BudgetItemSelectList.propTypes = {
  listedItems: arrayOf(object),
  loading: bool
}

module.exports = BudgetItemSelectList
