const React = require('react')
const { Link } = require('react-router')
const LocaleLink = require('js/components/header/LocaleLink')
const { object } = React.PropTypes

const Header = React.createClass({
  contextTypes: {
    location: object
  },

  currentUrlWithLocale (locale) {
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
        <LocaleLink
          currentUrlWithLocale={this.currentUrlWithLocale}
          text='ქართული'
          locale='ka'
        />
        <LocaleLink
          currentUrlWithLocale={this.currentUrlWithLocale}
          text='English'
          locale='en'
        />
      </div>
    )
  }
})

module.exports = Header
