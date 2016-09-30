const React = require('react')

const LoadingIndicator = (props) => {
  let style = {}
  if (props.hidden) style.display = 'none'
  return (
    <div style={style}>
      Data Loading
    </div>
  )
}

const { bool } = React.PropTypes

LoadingIndicator.propTypes = {
  hidden: bool
}

module.exports = LoadingIndicator
