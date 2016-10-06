const React = require('react')
const { Link } = require('react-router')
const LocaleLink = require('js/components/header/LocaleLink')

const Header = () => (
  <div className='app-header'>
    <header className='app-header-content'>
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
    </header>
  </div>
)

module.exports = Header
