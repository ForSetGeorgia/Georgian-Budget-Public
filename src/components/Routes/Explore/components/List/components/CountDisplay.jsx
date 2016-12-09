const React = require('react')
const { number, object } = React.PropTypes
const { FormattedMessage, injectIntl, intlShape } = require('react-intl')

const CountDisplay = ({ count, itemTranslations, intl }) => {
  return (
    <FormattedMessage
      id='app.explore.list.count'
      description='Displays the number of items in the explore list'
      defaultMessage='Showing {count} {count, plural,
        one {{one}}
        other {{other}}
      }.'
      values={{
        count: count,
        one: intl.formatMessage(itemTranslations.one),
        other: intl.formatMessage(itemTranslations.afterNumber)
      }}
    />
  )
}

CountDisplay.propTypes = {
  count: number,
  itemTranslations: object,
  intl: intlShape
}

module.exports = injectIntl(CountDisplay)
