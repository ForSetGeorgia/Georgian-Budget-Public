const React = require('react')
const { arrayOf, shape, string, func } = React.PropTypes

const SelectButton = require('./SelectButton')

const ButtonSelector = React.createClass({
  propTypes: {
    handleChangeEvent: func.isRequired,
    selectedValue: string.isRequired,
    labelText: string,
    options: arrayOf(shape({
      label: string.isRequired,
      value: string.isRequired
    })).isRequired
  },

  renderLabel () {
    const { labelText } = this.props
    if (!labelText) return null

    return (
      <p className='gb-ButtonSelector-label'>{labelText}:</p>
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
        <div className='gb-ButtonSelector-buttons'>
          {options.map(option => this.renderOption(option))}
        </div>
      </div>
    )
  }
})

module.exports = ButtonSelector
