const React = require('react')
const { string } = React.PropTypes
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')
const Helmet = require('react-helmet')

const { getDetailsItemId } = require('src/data/ducks/explore')
const { getBudgetItemName } = require('src/data/modules/entities/budgetItem')

const TitleBudgetItemNameSetter = props => (
  <Helmet
    title={props.name}
  />
)

TitleBudgetItemNameSetter.propTypes = {
  name: string.isRequired
}

const mapStateToProps = state => ({
  name: getBudgetItemName(state, getDetailsItemId(state))
})

module.exports = injectIntl(connect(mapStateToProps)(TitleBudgetItemNameSetter))
