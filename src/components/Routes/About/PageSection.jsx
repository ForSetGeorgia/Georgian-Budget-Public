const React = require('react')
const { string } = React.PropTypes
const { injectIntl, intlShape } = require('react-intl')
const axios = require('axios')

const AboutPresentation = require('./Presentation')

const PageSection = React.createClass({
  propTypes: {
    intl: intlShape,
    name: string.isRequired
  },

  getInitialState () {
    return {
      title: '',
      content: ''
    }
  },

  componentDidMount () {
    const { name, intl } = this.props

    axios.get(
      `${process.env.API_URL}/${intl.locale}/v1/page_contents/${name}`,
      {
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-Key-Inflection': 'camel'
        }
      }
    )
    .then(response => {
      if (!((response || {}).data || {}).content) {
        this.setState({
          title: `Unable to load page section: ${name}`
        })

        return
      }

      this.setState({
        title: response.data.title,
        content: response.data.content
      })
    })
  },

  render () {
    return (
      <AboutPresentation title={this.state.title} content={this.state.content} />
    )
  }
})

module.exports = injectIntl(PageSection)
