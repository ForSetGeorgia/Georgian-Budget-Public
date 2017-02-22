const React = require('react')
const { defineMessages, injectIntl, intlShape } = require('react-intl')
const { string } = React.PropTypes
const Griddle = require('griddle-react')

const messages = defineMessages({
  next: {
    id: 'app.table.next',
    defaultMessage: 'Next'
  },
  previous: {
    id: 'app.table.previous',
    defaultMessage: 'Previous'
  }
})

const CustomGriddle = props => (
  <Griddle
    rowMetadata={{ bodyCssClassName: 'gb-Table-row mod-darker-if-odd' }}
    useGriddleStyles={false}
    resultsPerPage={10}
    nextText={props.intl.formatMessage(messages.next)}
    previousText={props.intl.formatMessage(messages.previous)}
    {...props}
  />
)

CustomGriddle.propTypes = {
  modTableClassName: string,
  intl: intlShape
}

module.exports = injectIntl(CustomGriddle)
