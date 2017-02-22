const React = require('react')
const { defineMessages, injectIntl, intlShape } = require('react-intl')
const { connect } = require('react-redux')
const { string } = React.PropTypes

const { getDetailsItemId } = require('src/data/ducks/explore')
const { getAgencyIdForItem } = require('src/data/modules/entities/budgetItem')

const ItemDetailsLink = require('src/components/shared/ItemDetailsLink')

const messages = defineMessages({
  agency: {
    id: 'app.itemDetailsLink.agency',
    defaultMessage: 'Spending Agency'
  }
})

const AgencyLink = ({intl, agencyId}) => (
  !agencyId ? null
  : <p>
    <ItemDetailsLink
      beforeName={`${intl.formatMessage(messages.agency)}: `}
      itemId={agencyId}
    />
  </p>
)

AgencyLink.propTypes = {
  agencyId: string,
  intl: intlShape
}

const mapStateToProps = state => ({
  agencyId: getAgencyIdForItem(state, getDetailsItemId(state))
})

module.exports = injectIntl(connect(mapStateToProps)(AgencyLink))
