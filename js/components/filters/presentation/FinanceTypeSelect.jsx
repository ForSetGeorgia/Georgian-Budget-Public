const React = require('react')
const Select = require('react-select')

const FinanceTypeSelect = (props) => {
  return (
    <div className='filter'>
      <label htmlFor='finance-type-select'>
        აირჩიე ფინანსები
      </label>
      <Select
        id='finance-type-select'
        name='finance-type-select'
        value={props.value}
        options={props.options}
        onChange={props.handleChange}
        clearable={false}
      />
    </div>
  )
}

const { string, func, arrayOf, shape } = React.PropTypes

FinanceTypeSelect.propTypes = {
  value: string.isRequired,
  handleChange: func.isRequired,
  options: arrayOf(shape({ value: string, label: string })).isRequired
}

module.exports = FinanceTypeSelect
