const React = require('react')
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')
const { string } = React.PropTypes

const { getDetailsItemId } = require('src/data/ducks/explore')
const { getAgencyIdForItem } = require('src/data/modules/entities/budgetItem')

const ItemDetailsLink = require('src/components/shared/ItemDetailsLink')

const AgencyLink = ({agencyId}) => (
  !agencyId ? null
  : <p>
    Agency: <ItemDetailsLink itemId={agencyId} />
  </p>
)

AgencyLink.propTypes = {
  agencyId: string
}

const mapStateToProps = state => ({
  agencyId: getAgencyIdForItem(state, getDetailsItemId(state))
})

module.exports = injectIntl(connect(mapStateToProps)(AgencyLink))
