const React = require('react')
const { arrayOf, string } = React.PropTypes
const { connect } = require('react-redux')

const { getSelectedBudgetItemIds } = require('js/redux/ducks/explore')

const UpdateUrlParam = require('js/components/shared/UpdateUrlParam')

const StateToUrlParamUpdater = React.createClass({
  propTypes: {
    budgetItemType: string.isRequired,
    budgetItemIds: arrayOf(string).isRequired,
    financeType: string.isRequired
  },

  createKey (param, value) {
    return `update-url-param-${param}-${value}`
  },

  renderUpdateUrlParam (param, value) {
    return (
      <UpdateUrlParam
        param={param}
        value={value}
        key={this.createKey(param, value)}
      />
    )
  },

  render () {
    const { budgetItemIds, budgetItemType, financeType } = this.props

    return (
      <div>
        {this.renderUpdateUrlParam('budgetItemType', budgetItemType)}
        {this.renderUpdateUrlParam('budgetItemIds', budgetItemIds)}
        {this.renderUpdateUrlParam('financeType', financeType)}
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  budgetItemType: state.filters.budgetItemType.value,
  budgetItemIds: getSelectedBudgetItemIds(state),
  financeType: state.filters.financeType.value
})

module.exports = connect(mapStateToProps)(StateToUrlParamUpdater)
