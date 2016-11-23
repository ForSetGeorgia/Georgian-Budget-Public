const React = require('react')
const { FormattedMessage } = require('react-intl')

const LoadingIndicator = (props) => {
  let style = {}
  if (props.hidden) style.display = 'none'
  return (
    <div style={style}>
      <FormattedMessage
        id='app.loading'
        description='The message seen when data is loading'
        defaultMessage='Data is Loading' />
    </div>
  )
}

const { bool } = React.PropTypes

LoadingIndicator.propTypes = {
  hidden: bool
}

module.exports = LoadingIndicator
