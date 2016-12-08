const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { setSelectedBudgetItemIds } = require('src/data/ducks/explore')
const { getBudgetItemName } = require('src/data/modules/entities/budgetItem')

const ItemDetailsLink = React.createClass({
  propTypes: {
    name: string,
    itemId: string,
    setSelectedBudgetItemIds: func
  },

  handleClickEvent () {
    const { itemId, setSelectedBudgetItemIds } = this.props
    setSelectedBudgetItemIds([itemId])
  },

  render () {
    const { name } = this.props
    return (
      <button type='button' onClick={this.handleClickEvent}>
        {name}
      </button>
    )
  }
})

const mapStateToProps = (state, ownProps) => ({
  name: getBudgetItemName(state, ownProps.itemId)
})

const mapDispatchToProps = dispatch => ({
  setSelectedBudgetItemIds: value => dispatch(setSelectedBudgetItemIds(value))
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ItemDetailsLink))
