const React = require('react')
const { object, string } = React.PropTypes

const Helmet = require('react-helmet')
const MetaContainer = require('js/components/MetaContainer')
const Header = require('js/components/Header')

const Layout = React.createClass({
  propTypes: {
    locale: string,
    children: object
  },

  render () {
    return (
      <div>
        <Helmet
          htmlAttributes={{'lang': this.props.locale}}
          title='Home'
          titleTemplate='%s | Georgian Budget'
          link={[
            {'rel': 'stylesheet', 'href': '/public/bundles/bundle.css'}
          ]}
        />

        <MetaContainer />
        <Header />

        <main className='main-content'>
          {this.props.children}
        </main>
      </div>
    )
  }
})

module.exports = Layout
