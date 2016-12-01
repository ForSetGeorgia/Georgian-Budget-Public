const React = require('react')
const { number } = React.PropTypes

const { FormattedMessage } = require('react-intl')

const CountDisplay = (props) => {
  const { count } = props

  return (
    <FormattedMessage
      id='app.explore.list.count'
      description='Displays the number of items in the explore list'
      defaultMessage='Showing {count} items.'
      values={{count: count}}
    />
  )
}

CountDisplay.propTypes = {
  count: number
}

module.exports = CountDisplay
