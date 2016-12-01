const React = require('react')
const { arrayOf, bool, object } = React.PropTypes
const Griddle = require('griddle-react')
const LoadingIndicator = require('src/components/shared/LoadingIndicator')

const BudgetItemSelectList = (props) => {
  const { listedItems, loading } = props
  if (loading) {
    return <LoadingIndicator />
  }

  return (
    <Griddle
      results={listedItems}
      {...props}
    />
  )
}

BudgetItemSelectList.propTypes = {
  listedItems: arrayOf(object),
  loading: bool
}

module.exports = BudgetItemSelectList
