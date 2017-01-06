const React = require('react')
const { string } = React.PropTypes
const Select = require('react-select')

const CustomSelect = props => {
  return (
    <span className='gb-CustomSelect'>
      <span className='gb-CustomSelect-label'>{props.labelText}:</span>
      <Select
        className='gb-CustomSelect-select'
        {...props}
      />
    </span>
  )
}

CustomSelect.propTypes = {
  labelText: string
}

module.exports = CustomSelect
