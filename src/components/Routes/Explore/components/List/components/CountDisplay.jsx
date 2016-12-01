const React = require('react')
const { array } = React.PropTypes

const { FormattedMessage } = require('react-intl')

const CountDisplay = (props) => {
  const { items } = props

  return (
    <FormattedMessage
      id='app.explore.list.count'
      description='Displays the number of items in the explore list'
      defaultMessage='Showing {count} items.'
      values={{count: items.length}}
    />
  )
}

CountDisplay.propTypes = {
  items: array
}

module.exports = CountDisplay
