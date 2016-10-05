const React = require('react')
const { Link } = require('react-router')
const LocaleLink = require('js/components/header/LocaleLink')

const Header = () => (
  <div>
    <Link to='/ka/explore'>
      Explore
    </Link>
    <Link to='/ka/about'>
      შესახებ
    </Link>
    <LocaleLink
      text='ქართული'
      locale='ka'
    />
    <LocaleLink
      text='English'
      locale='en'
    />
  </div>
)

module.exports = Header
