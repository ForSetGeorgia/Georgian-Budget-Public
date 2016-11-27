const React = require('react')
const { arrayOf, string } = React.PropTypes
const { connect } = require('react-redux')

const { getSelectedBudgetItemIds } = require('js/redux/ducks/explore')

const UpdateUrlParam = require('js/components/shared/UpdateUrlParam')

const StateToUrlParamUpdater = React.createClass({
  propTypes: {
    budgetItemType: string.isRequired,
    budgetItemIds: arrayOf(string).isRequired
  },

  createKey (param, value) {
    return `update-url-param-${param}-${value}`
  },

  render () {
    return (
      <div>
        <UpdateUrlParam
          param='budgetItemType'
          value={this.props.budgetItemType}
          key={this.createKey('budgetItemType', this.props.budgetItemType)}
        />
        <UpdateUrlParam
          param='budgetItemIds'
          value={this.props.budgetItemIds}
          key={this.createKey('budgetItemIds', this.props.budgetItemIds.join(','))}
        />
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  budgetItemType: state.filters.budgetItemType.value,
  budgetItemIds: getSelectedBudgetItemIds(state)
})

module.exports = connect(mapStateToProps)(StateToUrlParamUpdater)
