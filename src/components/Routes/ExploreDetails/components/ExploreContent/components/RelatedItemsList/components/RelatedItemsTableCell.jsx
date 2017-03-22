const React = require('react')
const { number, object, oneOfType, string } = React.PropTypes
const { Link } = require('react-router')
const { injectIntl } = require('react-intl')
const GriddleFormattedAmount = require('src/components/shared/GriddleFormattedAmount')

const RelatedItemsTableCell = (props, { location }) => {
  const { intl, rowData, data } = props

  const getContentOfLink = () => (
    typeof data === 'string' ? <span>
      {data}
    </span> : <GriddleFormattedAmount {...props} />
  )

  return (
    <Link to={{
      pathname: `/${intl.locale}/explore/details/${rowData.id}`,
      query: location.query
    }}>
      {getContentOfLink()}
    </Link>
  )
}

RelatedItemsTableCell.contextTypes = {
  location: object
}

RelatedItemsTableCell.propTypes = {
  intl: object,
  rowData: object,
  data: oneOfType([number, string])
}

module.exports = injectIntl(RelatedItemsTableCell)
