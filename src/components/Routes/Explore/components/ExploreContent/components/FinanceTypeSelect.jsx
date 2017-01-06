const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')

const { injectIntl, intlShape } = require('react-intl')
const financeTypeMessages = require('src/messages/financeTypes')

const { financeTypes } = require('src/data/modules/entities/finance')

const snakeToCamel = require('src/utilities/snakeToCamel')

const {
  setFinanceType,
  getSelectedFinanceType
} = require('src/data/ducks/filters')

const ButtonSelector = require('src/components/shared/ButtonSelector')

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
      label: intl.formatMessage(financeTypeMessages[snakeToCamel(financeType)].adjective)
    }))
  },

  handleChangeEvent (selectedFinanceType) {
    this.props.setFinanceType(selectedFinanceType)
  },

  render () {
    const { selectedFinanceType } = this.props

    return (
      <ButtonSelector
        handleChangeEvent={this.handleChangeEvent}
        options={this.options()}
        selectedValue={selectedFinanceType}
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
