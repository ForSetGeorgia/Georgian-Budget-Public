const React = require('react')
const Select = require('react-select')

const GBSelect = (props) => {
  let style = {}
  if (!props.visible) style.display = 'none'

  return (
    <div className={`gb-Filter ${props.additionalClassNames}`} style={style}>
      <label htmlFor='budget-item-select'>
        {props.labelText}
      </label>
      <Select
        id={props.id}
        name={props.name}
        value={props.value}
        options={props.options}
        onChange={props.handleChangeEvent}
        disabled={props.options.length === 0}
        isLoading={props.isLoading}
        labelKey={props.labelKey}
        valueKey={props.valueKey}
        multi={props.multi}
        simpleValue={props.simpleValue}
        clearable={props.clearable}
      />
    </div>
  )
}

const { func, number, arrayOf, oneOfType, string, bool, object } = React.PropTypes

GBSelect.propTypes = {
  id: string.isRequired,
  name: string.isRequired,
  handleChangeEvent: func.isRequired,
  value: oneOfType([string, arrayOf(number)]).isRequired,
  options: arrayOf(object).isRequired,
  additionalClassNames: string,
  visible: bool,
  labelText: string,
  isLoading: bool,
  labelKey: string,
  valueKey: string,
  multi: bool,
  simpleValue: bool,
  clearable: bool
}

GBSelect.defaultProps = {
  labelKey: 'label',
  valueKey: 'value',
  isLoading: false,
  visible: true,
  multi: false,
  simpleValue: false,
  clearable: false
}

module.exports = GBSelect
