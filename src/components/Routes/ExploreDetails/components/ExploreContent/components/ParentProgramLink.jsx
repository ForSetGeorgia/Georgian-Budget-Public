const React = require('react')
const { injectIntl } = require('react-intl')
const { connect } = require('react-redux')
const { string } = React.PropTypes

const { getDetailsItemId } = require('src/data/ducks/explore')
const {
  getParentProgramIdForItem
} = require('src/data/modules/entities/budgetItem')

const ItemDetailsLink = require('src/components/shared/ItemDetailsLink')

const ParentProgramLink = ({parentProgramId}) => (
  !parentProgramId ? null
  : <p>
    Parent Program: <ItemDetailsLink itemId={parentProgramId} />
  </p>
)

ParentProgramLink.propTypes = {
  parentProgramId: string
}

const mapStateToProps = state => ({
  parentProgramId: getParentProgramIdForItem(state, getDetailsItemId(state))
})

module.exports = injectIntl(connect(mapStateToProps)(ParentProgramLink))
