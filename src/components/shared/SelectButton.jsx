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

  className () {
    let className = 'gb-ButtonSelector-button'
    if (this.props.disabled) className += ' is-disabled'
    return className
  },

  render () {
    const { disabled, text } = this.props

    if (disabled) {
      return <p className={this.className()}>{text}</p>
    } else {
      return (
        <button className={this.className()} type='button' onClick={this.selectValue}>
          {text}
        </button>
      )
    }
  }
})

module.exports = SelectButton
