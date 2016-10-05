const React = require('react')
const { Link } = require('react-router')
const { object } = React.PropTypes

const Header = React.createClass({
  contextTypes: {
    location: object
  },

  urlWithLocale (locale) {
    const { pathname, search } = this.context.location

    const newPathname = pathname.replace(/\/\w{2}\//, `/${locale}/`)
    return `${newPathname}${search}`
  },

  render () {
    return (
      <div>
        <Link to='/ka/explore'>
          Explore
        </Link>
        <Link to='/ka/about'>
          შესახებ
        </Link>
        <Link to={this.urlWithLocale('ka')}>
          ქართული
        </Link>
        <Link to={this.urlWithLocale('en')}>
          English
        </Link>
      </div>
    )
  }
})

module.exports = Header
