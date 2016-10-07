const React = require('react')
const { Link } = require('react-router')
const LocaleLink = require('./LocaleLink')

module.exports = () => (
  <div className='app-navigation'>
    <Link
      to='/ka/explore'
      className='app-navigation-link'
    >
      Explore
    </Link>
    <Link
      to='/ka/about'
      className='app-navigation-link'
    >
      შესახებ
    </Link>
    <LocaleLink
      text='ქა'
      locale='ka'
      className='app-navigation-link'
    />
    <LocaleLink
      text='En'
      locale='en'
      className='app-navigation-link'
    />
    <a
      href='https://www.facebook.com/sharer/sharer.php'
      className='app-navigation-link'
    >
      Facebook
    </a>
    <a
      href='https://twitter.com/share'
      className='app-navigation-link'
    >
      Twitter
    </a>
  </div>
)