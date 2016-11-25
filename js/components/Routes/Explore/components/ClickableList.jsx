const React = require('react')
const { arrayOf, bool, object } = React.PropTypes
const Griddle = require('griddle-react')
const LoadingIndicator = require('js/components/shared/LoadingIndicator')

const ClickableList = (props) => {
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

ClickableList.propTypes = {
  listedItems: arrayOf(object),
  loading: bool
}

module.exports = ClickableList
