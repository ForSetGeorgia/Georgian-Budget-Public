const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')

const { injectIntl, intlShape, defineMessages } = require('react-intl')
const financeTypeMessages = require('js/messages/financeTypes')

const { financeTypes } = require('js/redux/entities/finance')

const { snakeToCamel } = require('js/helpers/utilities')

const {
  setFinanceType,
  getSelectedFinanceType
} = require('js/redux/ducks/filters')

const GBSelect = require('./GBSelect')

const messages = defineMessages({
  label: {
    id: 'app.filters.financeType.label',
    description: 'Label for finance type filter',
    defaultMessage: 'Select finance type'
  }
})

const FinanceTypeSelect = React.createClass({
  propTypes: {
    setFinanceType: func.isRequired,
    value: string.isRequired,
    intl: intlShape
  },

  options () {
    const { intl } = this.props

    return financeTypes.map(financeType => ({
      value: financeType,
      label: intl.formatMessage(financeTypeMessages[snakeToCamel(financeType)].other)
    }))
  },

  handleChangeEvent ({ value }) {
    this.props.setFinanceType(value)
  },

  render () {
    const { intl, value } = this.props

    return (
      <GBSelect
        id='finance-type-select'
        name='finance-type-select'
        handleChangeEvent={this.handleChangeEvent}
        value={value}
        options={this.options()}
        labelText={intl.formatMessage(messages.label)}
      />
    )
  }
})

const mapStateToProps = state => ({
  value: getSelectedFinanceType(state)
})

const mapDispatchToProps = (dispatch) => ({
  setFinanceType (value) {
    dispatch(setFinanceType(value))
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(FinanceTypeSelect))
