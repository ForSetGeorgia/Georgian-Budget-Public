const React = require('react')
const Helmet = require('react-helmet')

const MetaContainer = require('js/components/MetaContainer')
const Header = require('js/components/Header')

const Layout = (props) => {
  return (
    <div className='layout'>
      <Helmet
        htmlAttributes={{'lang': 'ka'}}
        title='Home'
        titleTemplate='%s | Georgian Budget'
        link={[
          {'rel': 'stylesheet', 'href': '/public/bundle.css'}
        ]}
      />

      <MetaContainer />
      <Header />

      {props.children}
    </div>
  )
}

const { object } = React.PropTypes

Layout.propTypes = {
  location: object.isRequired,
  children: object.isRequired
}

module.exports = Layout
