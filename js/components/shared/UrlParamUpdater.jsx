const React = require('react')
const { arrayOf, object, oneOf, oneOfType, string } = React.PropTypes

const getLocationWithQuery = require('js/helpers/getLocationWithQuery')

const UrlParamUpdater = React.createClass({
  contextTypes: {
    location: object,
    router: object
  },

  propTypes: {
    param: oneOf(['budgetItemType', 'financeType', 'budgetItemIds']),
    value: oneOfType([string, arrayOf(string)])
  },

  updateQueryWithNewType () {
    const { param, value } = this.props
    const { location, router } = this.context

    const newParamObject = {}
    newParamObject[param] = value

    router.push(
      getLocationWithQuery(
        location,
        newParamObject
      )
    )
  },

  componentDidMount () {
    this.updateQueryWithNewType()
  },

  render () {
    return null
  }
})

module.exports = UrlParamUpdater
