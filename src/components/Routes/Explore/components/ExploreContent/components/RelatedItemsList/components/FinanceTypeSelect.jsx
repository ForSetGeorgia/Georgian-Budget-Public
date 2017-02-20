const React = require('react')
const { func, object, string } = React.PropTypes
const { connect } = require('react-redux')
const { withRouter } = require('react-router')

const { injectIntl, intlShape } = require('react-intl')
const financeTypeMessages = require('src/messages/financeTypes')

const { financeTypes } = require('src/data/modules/entities/finance')

const snakeToCamel = require('src/utilities/snakeToCamel')
const changeQueryOption = require('src/data/modules/changeQueryOption')

const {
  setFinanceType,
  getSelectedFinanceType
} = require('src/data/ducks/filters')

const ButtonSelector = require('src/components/shared/ButtonSelector')

const FinanceTypeSelect = React.createClass({
  contextTypes: {
    location: object.isRequired
  },

  propTypes: {
    setFinanceType: func.isRequired,
    selectedFinanceType: string.isRequired,
    intl: intlShape.isRequired,
    router: object.isRequired
  },

  options () {
    const { intl } = this.props

    return financeTypes.map(financeType => ({
      value: financeType,
      label: intl.formatMessage(financeTypeMessages[snakeToCamel(financeType)].adjective)
    }))
  },

  handleChangeEvent (selectedFinanceType) {
    const { setFinanceType, router } = this.props
    const { location } = this.context

    changeQueryOption(router, location, { financeType: selectedFinanceType })
    setFinanceType(selectedFinanceType)
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

module.exports = injectIntl(withRouter(
  connect(mapStateToProps, mapDispatchToProps)(FinanceTypeSelect)
))
