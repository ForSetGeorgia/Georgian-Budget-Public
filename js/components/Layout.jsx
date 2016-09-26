const React = require('react')
const Helmet = require('react-helmet')
const Meta = require('./Meta')

const Layout = (props) => {
  return (
    <div>
      <Helmet
        htmlAttributes={{"lang": "ka"}}
        title='Home'
        titleTemplate="%s | Georgian Budget"
        link={[
          {"rel": "stylesheet", "href": "https://unpkg.com/react-select/dist/react-select.css"}
        ]}
      />
      <Meta url={props.location.pathname}/>
      {props.children}
    </div>
  )
}

const { object } = React.PropTypes

Layout.propTypes = {
  children: object.isRequired
}

module.exports = Layout
