const React = require('react')
const { Link } = require('react-router')
const LocaleLink = require('./LocaleLink')
const Svg = require('js/components/Svg')

const NavigationMenu = (props) => (
  <div className={props.className}>
    <Link
      to='/ka/explore'
      className='app-navigation-menu-link'
    >
      Explore
    </Link>
    <Link
      to='/ka/about'
      className='app-navigation-menu-link'
    >
      შესახებ
    </Link>
    <LocaleLink
      text='ქა'
      locale='ka'
      className='app-navigation-menu-link'
    />
    <LocaleLink
      text='En'
      locale='en'
      className='app-navigation-menu-link'
    />
    <a
      href='https://www.facebook.com/sharer/sharer.php'
      className='app-navigation-menu-link'
    >
      <Svg
        className='app-navigation-menu-link-img'
        markup={require('public/images/facebook_icon')}
      />
    </a>
    <a
      href='https://twitter.com/share'
      className='app-navigation-menu-link'
    >
      <Svg
        className='app-navigation-menu-link-img'
        markup={require('public/images/twitter_icon')}
      />
    </a>
  </div>
)

const { string } = React.PropTypes

NavigationMenu.propTypes = {
  className: string
}

module.exports = NavigationMenu
