const React = require('react')
const Select = require('react-select')

const FinanceTypeSelect = (props) => {
  const options = [
    { value: 'spent_finance', label: 'დახარჯული ფინანსები' },
    { value: 'planned_finance', label: 'დაგეგმილი ფინანსები' }
  ]

  return (
    <div>
      <label htmlFor='finance-type-select'>
        აირჩიე ფინანსები
      </label>
      <Select
        id='finance-type-select'
        name='finance-type-select'
        value={props.selectedValue}
        options={options}
        onChange={props.handleChange}
        clearable={false}
      />
    </div>
  )
}

const { string, func } = React.PropTypes

FinanceTypeSelect.propTypes = {
  selectedValue: string.isRequired,
  handleChange: func.isRequired
}

module.exports = FinanceTypeSelect
