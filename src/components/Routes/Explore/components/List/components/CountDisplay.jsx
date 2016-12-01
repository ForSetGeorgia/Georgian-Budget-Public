const React = require('react')
const { array, bool } = React.PropTypes

const { FormattedMessage } = require('react-intl')

const CountDisplay = (props) => {
  const { show, items } = props
  let content

  if (show) {
    content = (
      <FormattedMessage
        id='app.explore.list.count'
        description='Displays the number of items in the explore list'
        defaultMessage='Showing {count} items.'
        values={{count: items.length}}
      />
    )
  }

  return (
    <p>
      {content}
    </p>
  )
}

CountDisplay.propTypes = {
  show: bool,
  items: array
}

module.exports = CountDisplay
