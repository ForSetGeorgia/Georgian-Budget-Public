const React = require('react')
const { injectIntl, intlShape } = require('react-intl')
const axios = require('axios')

const AboutPresentation = require('./Presentation')

const AboutContainer = React.createClass({
  propTypes: {
    intl: intlShape
  },

  getInitialState () {
    return {
      content: ''
    }
  },

  componentDidMount () {
    const { intl } = this.props

    axios.get(
      `${process.env.API_URL}/${intl.locale}/v1/page_contents/about`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-Key-Inflection': 'camel'
        }
      }
    )
    .then(response => {
      if (!((response || {}).data || {}).content) return

      this.setState({
        content: response.data.content
      })
    })
  },

  render () {
    return (
      <AboutPresentation content={this.state.content} />
    )
  }
})

module.exports = injectIntl(AboutContainer)
