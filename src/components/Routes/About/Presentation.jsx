const React = require('react')
const { string } = React.PropTypes
const Helmet = require('react-helmet')

const LoadingIndicator = require('src/components/shared/LoadingIndicator')

const About = React.createClass({
  propTypes: {
    title: string,
    content: string
  },

  createContentMarkup () {
    return { __html: this.props.content }
  },

  renderTitle () {
    if (!this.props.title) return

    return (
      <h2>
        {this.props.title}
      </h2>
    )
  },

  renderContent () {
    if (!this.props.content && !this.props.title) {
      return <LoadingIndicator />
    }

    return (
      <div>
        {this.renderTitle()}
        <div dangerouslySetInnerHTML={this.createContentMarkup()} />
      </div>
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
