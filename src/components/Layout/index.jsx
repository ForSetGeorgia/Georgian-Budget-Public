const React = require('react')
const { object, string } = React.PropTypes

const HelmetContainer = require('./components/HelmetContainer')
const MetaContainer = require('./components/MetaContainer')
const LocaleInitializer = require('./components/LocaleInitializer')
const Header = require('./components/Header/index')
const FooterContainer = require('./components/FooterContainer')

const Layout = React.createClass({
  propTypes: {
    locale: string,
    children: object,
    shareUrl: string
  },

  render () {
    return (
      <div className='gb-Layout'>
        <HelmetContainer />
        <MetaContainer />
        <LocaleInitializer />

        <div>
          <Header shareUrl={this.props.shareUrl} />

          <main className='gb-Layout-mainContent'>
            {this.props.children}
          </main>
        </div>

        <FooterContainer />
      </div>
    )
  }
})

module.exports = Layout
