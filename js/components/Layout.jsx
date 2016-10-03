const React = require('react')
const Helmet = require('react-helmet')
const MetaContainer = require('js/components/MetaContainer')

const Layout = (props) => {
  return (
    <div className='layout'>
      <Helmet
        htmlAttributes={{'lang': 'ka'}}
        title='Home'
        titleTemplate='%s | Georgian Budget'
        link={[
          {'rel': 'stylesheet', 'href': 'https://unpkg.com/react-select/dist/react-select.css'},
          {'rel': 'stylesheet', 'href': '/public/bundle.css'}
        ]}
      />
      <MetaContainer />
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
