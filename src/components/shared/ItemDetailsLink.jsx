const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const switchDetailsItemId = require('src/data/thunks/switchDetailsItemId')

const { getBudgetItemName } = require('src/data/modules/entities/budgetItem')

const ItemDetailsLink = React.createClass({
  propTypes: {
    name: string,
    itemId: string,
    switchDetailsItemId: func
  },

  handleClickEvent () {
    const { itemId, switchDetailsItemId } = this.props
    switchDetailsItemId(itemId)
  },

  render () {
    const { name } = this.props
    return (
      <a href='#' onClick={this.handleClickEvent}>
        {name}
      </a>
    )
  }
})

const mapStateToProps = (state, ownProps) => ({
  name: getBudgetItemName(state, ownProps.itemId)
})

const mapDispatchToProps = dispatch => ({
  switchDetailsItemId: value => dispatch(switchDetailsItemId(value))
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ItemDetailsLink))
