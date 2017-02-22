const React = require('react')
const { defineMessages, injectIntl, intlShape } = require('react-intl')
const { connect } = require('react-redux')
const { string } = React.PropTypes

const { getDetailsItemId } = require('src/data/ducks/explore')
const {
  getParentProgramIdForItem
} = require('src/data/modules/entities/budgetItem')

const ItemDetailsLink = require('src/components/shared/ItemDetailsLink')

const messages = defineMessages({
  parentProgram: {
    id: 'app.itemDetailsLink.parentProgram',
    defaultMessage: 'Parent Program'
  }
})

const ParentProgramLink = ({intl, parentProgramId}) => (
  !parentProgramId ? null
  : <p>
    <ItemDetailsLink beforeName={`${intl.formatMessage(messages.parentProgram)}: `} itemId={parentProgramId} />
  </p>
)

ParentProgramLink.propTypes = {
  parentProgramId: string,
  intl: intlShape
}

const mapStateToProps = state => ({
  parentProgramId: getParentProgramIdForItem(state, getDetailsItemId(state))
})

module.exports = injectIntl(connect(mapStateToProps)(ParentProgramLink))
