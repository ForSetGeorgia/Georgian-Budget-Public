const React = require('react')
const { arrayOf, shape, string } = React.PropTypes
const Error = require('./Error')

const ErrorsDisplay = (props) => {
  return (
    <div>
      {
        props.errors.map((error) => (
          <Error text={error.text} key={error.id} />
        ))
      }
    </div>
  )
}

ErrorsDisplay.propTypes = {
  errors: arrayOf(shape({
    id: string.isRequired,
    text: string.isRequired
  })).isRequired
}

module.exports = ErrorsDisplay
