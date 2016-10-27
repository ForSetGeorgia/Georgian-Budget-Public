const React = require('react')
const { object, string } = React.PropTypes

const Helmet = require('react-helmet')
const MetaContainer = require('js/components/MetaContainer')
const Header = require('js/components/Header')
const Footer = require('js/components/Footer')

const Layout = React.createClass({
  propTypes: {
    locale: string,
    children: object
  },

  render () {
    return (
      <div className='gb-Layout'>
        <Helmet
          htmlAttributes={{'lang': this.props.locale}}
          title='Home'
          titleTemplate='%s | Georgian Budget'
          link={[
            {'rel': 'stylesheet', 'href': '/public/bundles/bundle.css'},
            {'rel': 'shortcut icon', 'type': 'image/png', 'href': '/public/favicon.ico'}
          ]}
        />
        <MetaContainer />

        <div>
          <Header />

          <main className='gb-Layout-mainContent'>
            {this.props.children}
          </main>
        </div>

        <Footer />
      </div>
    )
  }
})

module.exports = Layout
