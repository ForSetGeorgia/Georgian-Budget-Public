const React = require('react')
const { string } = React.PropTypes
const Select = require('react-select')

const CustomSelect = props => {
  return (
    <span>
      {props.labelText}: <Select
        {...props}
      />
    </span>
  )
}

CustomSelect.propTypes = {
  labelText: string
}

module.exports = CustomSelect
