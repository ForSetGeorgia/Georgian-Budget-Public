const React = require('react')
const Helmet = require('react-helmet')
const { string, shape, object } = React.PropTypes

const MetaContainer = require('js/components/MetaContainer')
const Header = require('js/components/Header')

const Layout = React.createClass({
  propTypes: {
    location: object.isRequired,
    children: object.isRequired,
    params: shape({ shape: string })
  },

  childContextTypes: {
    location: object
  },

  getChildContext () {
    return { location: this.props.location }
  },

  render () {
    return (
      <div className='layout'>
        <Helmet
          htmlAttributes={{'lang': this.props.params.locale}}
          title='Home'
          titleTemplate='%s | Georgian Budget'
          link={[
            {'rel': 'stylesheet', 'href': '/public/bundle.css'}
          ]}
        />

        <MetaContainer />
        <Header />

        {this.props.children}
      </div>
    )
  }
})

module.exports = Layout
