const React = require('react')
const { arrayOf, object } = React.PropTypes
const Griddle = require('griddle-react')
const LoadingIndicator = require('js/components/shared/LoadingIndicator')

const ClickableList = (props) => {
  const { listedItems } = props
  if (listedItems.length === 0) {
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
  listedItems: arrayOf(object)
}

module.exports = ClickableList
