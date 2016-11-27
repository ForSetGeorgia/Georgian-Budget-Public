const React = require('react')
const { arrayOf, object, oneOf, oneOfType, string } = React.PropTypes

const UpdateUrlParam = React.createClass({
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

    if (value === [] || value === '') return

    const newParamObject = {}
    newParamObject[param] = value

    router.push(
      Object.assign(
        {},
        location,
        {
          query: Object.assign(
            {},
            location.query,
            newParamObject
          )
        }
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

module.exports = UpdateUrlParam
