const React = require('react')
const { arrayOf, string } = React.PropTypes
const { connect } = require('react-redux')

const { getSelectedBudgetItemIds } = require('js/redux/ducks/explore')

const UpdateUrlParam = require('js/components/shared/UpdateUrlParam')

const StateToUrlParamUpdater = React.createClass({
  propTypes: {
    selectedIds: arrayOf(string).isRequired
  },

  render () {
    return (
      <div>
        <UpdateUrlParam
          param='budgetItemIds'
          value={this.props.selectedIds}
          key={this.props.selectedIds}
        />
      </div>
    )
  }
})

const mapStateToProps = (state) => ({
  selectedIds: getSelectedBudgetItemIds(state)
})

module.exports = connect(mapStateToProps)(StateToUrlParamUpdater)
