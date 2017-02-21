const React = require('react')
const { string } = React.PropTypes
const { connect } = require('react-redux')
const { injectIntl } = require('react-intl')

const { getBudgetItemName } = require('src/data/modules/entities/budgetItem')
const { getDetailsItemId } = require('src/data/ducks/explore')
const appMessages = require('src/messages/app')

const Meta = require('src/components/shared/Meta')

const MetaContainer = React.createClass({
  propTypes: {
    pathname: string,
    search: string
  },

  getInitialState () {
    return {
      host: ''
    }
  },

  componentDidMount () {
    this.setState({
      host: window.location.origin
    })
  },

  url () {
    let url = ''

    if (!this.props) return url
    if (this.state.host.length > 0) url = url + this.state.host
    if (this.props.pathname) url = url + this.props.pathname
    if (this.props.search) url = url + this.props.search
    return url
  },

  render () {
    return <Meta
      url={this.url()}
      {...this.props}
    />
  }
})

const mapStateToProps = (state, ownProps) => {
  const locationBeforeTransitions = (((state || {}).routing || {}).locationBeforeTransitions || {})

  return {
    title: getBudgetItemName(state, getDetailsItemId(state)),
    siteName: ownProps.intl.formatMessage(appMessages.name),
    pathname: locationBeforeTransitions.pathname,
    search: locationBeforeTransitions.search
  }
}

module.exports = injectIntl(connect(mapStateToProps)(MetaContainer))
