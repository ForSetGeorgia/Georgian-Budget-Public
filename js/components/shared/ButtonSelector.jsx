const React = require('react')
const { arrayOf, shape, string, func } = React.PropTypes

const SelectButton = require('./SelectButton')

const ButtonSelector = React.createClass({
  propTypes: {
    handleChangeEvent: func,
    selectedValue: string,
    labelText: string,
    options: arrayOf(shape({
      label: string,
      value: string
    }))
  },

  renderLabel () {
    const { labelText } = this.props

    return (
      <p>{labelText}:</p>
    )
  },

  renderOption (option) {
    const { selectedValue, labelText, handleChangeEvent } = this.props

    return (
      <SelectButton
        disabled={selectedValue === option.value}
        value={option.value}
        text={option.label}
        handleChangeEvent={handleChangeEvent}
        key={`${labelText}-${option.value}`}
      />
    )
  },

  render () {
    const { options } = this.props
    return (
      <div className='gb-ButtonSelector'>
        {this.renderLabel()}
        {options.map(option => this.renderOption(option))}
      </div>
    )
  }
})

module.exports = ButtonSelector
