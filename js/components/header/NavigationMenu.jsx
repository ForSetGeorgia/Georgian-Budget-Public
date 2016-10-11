const React = require('react')
const { Link } = require('react-router')
const LocaleLink = require('./LocaleLink')
const Svg = require('js/components/Svg')

const NavigationMenu = (props) => (
  <div className={props.className}>
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
      <Svg
        className='app-navigation-link-img'
        markup={require('public/images/facebook_icon')}
      />
    </a>
    <a
      href='https://twitter.com/share'
      className='app-navigation-link'
    >
      <Svg
        className='app-navigation-link-img'
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
