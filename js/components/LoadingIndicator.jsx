const React = require('react')

const LoadingIndicator = (props) => {
  let style = {}
  if (props.hidden) style.display = 'none'
  return (
    <div style={style}>
      მონაცემები ჩაიტვირთება
    </div>
  )
}

const { bool } = React.PropTypes

LoadingIndicator.propTypes = {
  hidden: bool
}

module.exports = LoadingIndicator
