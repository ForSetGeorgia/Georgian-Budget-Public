const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')

const { injectIntl, intlShape, defineMessages } = require('react-intl')
const financeTypeMessages = require('js/messages/financeTypes')

const { financeTypes } = require('js/data/modules/entities/finance')

const { snakeToCamel } = require('js/helpers/utilities')

const {
  setFinanceType,
  getSelectedFinanceType
} = require('js/data/ducks/filters')

const ButtonSelector = require('js/components/shared/ButtonSelector')

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
    selectedFinanceType: string.isRequired,
    intl: intlShape
  },

  options () {
    const { intl } = this.props

    return financeTypes.map(financeType => ({
      value: financeType,
      label: intl.formatMessage(financeTypeMessages[snakeToCamel(financeType)].other)
    }))
  },

  handleChangeEvent (selectedFinanceType) {
    this.props.setFinanceType(selectedFinanceType)
  },

  render () {
    const { intl, selectedFinanceType } = this.props

    return (
      <ButtonSelector
        handleChangeEvent={this.handleChangeEvent}
        options={this.options()}
        selectedValue={selectedFinanceType}
        labelText={intl.formatMessage(messages.label)}
      />
    )
  }
})

const mapStateToProps = state => ({
  selectedFinanceType: getSelectedFinanceType(state)
})

const mapDispatchToProps = (dispatch) => ({
  setFinanceType (selectedFinanceType) {
    dispatch(setFinanceType(selectedFinanceType))
  }
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(FinanceTypeSelect))
