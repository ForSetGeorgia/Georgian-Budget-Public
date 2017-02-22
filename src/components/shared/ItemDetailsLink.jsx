const React = require('react')
const { object, string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl, intlShape } = require('react-intl')
const { Link, withRouter } = require('react-router')

const { getBudgetItemName } = require('src/data/modules/entities/budgetItem')

const ItemDetailsLink = React.createClass({
  contextTypes: {
    location: object
  },

  propTypes: {
    name: string,
    itemId: string,
    intl: intlShape,
    router: object
  },

  navigateToBudgetItem (e) {
    e.preventDefault()

    const { itemId, intl, router } = this.props
    const { location } = this.context

    router.push({
      pathname: `/${intl.locale}/explore/details/${itemId}`,
      query: location.query
    })
  },

  render () {
    const { name } = this.props

    return (
      <Link className='gb-ItemDetailsLink' onClick={this.navigateToBudgetItem}>
        ← {name}
      </Link>
    )
  }
})

const mapStateToProps = (state, ownProps) => ({
  name: getBudgetItemName(state, ownProps.itemId),
  itemId: ownProps.itemId
})

module.exports = injectIntl(withRouter(
  connect(mapStateToProps, null)(ItemDetailsLink)
))
