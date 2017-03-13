const React = require('react')
const { string } = React.PropTypes
const Helmet = require('react-helmet')

const LoadingIndicator = require('src/components/shared/LoadingIndicator')

const About = React.createClass({
  propTypes: {
    content: string
  },

  createContentMarkup () {
    return { __html: this.props.content }
  },

  renderContent () {
    if (!this.props.content) {
      return <LoadingIndicator />
    }

    return (
      <div dangerouslySetInnerHTML={this.createContentMarkup()} />
    )
  },

  render () {
    return (
      <div>
        <Helmet
          title='About'
        />

        {this.renderContent()}
      </div>
    )
  }
})

module.exports = About
