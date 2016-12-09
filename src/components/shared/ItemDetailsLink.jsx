const React = require('react')
const { func, string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const {
  setDetailsItemId,
  switchDisplayToDetails
} = require('src/data/ducks/explore')

const { getBudgetItemName } = require('src/data/modules/entities/budgetItem')

const ItemDetailsLink = React.createClass({
  propTypes: {
    name: string,
    itemId: string,
    setDetailsItemId: func,
    switchDisplayToDetails: func
  },

  handleClickEvent () {
    const { itemId, setDetailsItemId, switchDisplayToDetails } = this.props
    setDetailsItemId(itemId)
    switchDisplayToDetails()
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
  setDetailsItemId: value => dispatch(setDetailsItemId(value)),
  switchDisplayToDetails: () => dispatch(switchDisplayToDetails())
})

module.exports = injectIntl(connect(mapStateToProps, mapDispatchToProps)(ItemDetailsLink))
