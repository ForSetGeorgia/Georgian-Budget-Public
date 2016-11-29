const React = require('react')
const { bool, func, string } = React.PropTypes

const SelectButton = React.createClass({
  propTypes: {
    disabled: bool,
    handleChangeEvent: func,
    value: string,
    text: string
  },

  selectValue () {
    const { value, handleChangeEvent } = this.props

    handleChangeEvent(value)
  },

  render () {
    const { disabled, text } = this.props

    if (disabled) {
      return <p>{text}</p>
    } else {
      return (
        <button type='button' onClick={this.selectValue}>
          {text}
        </button>
      )
    }
  }
})

module.exports = SelectButton
