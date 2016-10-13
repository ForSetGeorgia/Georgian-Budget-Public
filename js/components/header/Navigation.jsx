const React = require('react')
const { Link } = require('react-router')
const LocaleLink = require('./LocaleLink')
const Svg = require('js/components/Svg')
const { FormattedMessage } = require('react-intl')

const Navigation = (props) => {
  let className = 'app-navigation'
  if (props.showOnSmallScreens) {
    className += ' is-shown-on-small-screens'
  }

  return (
    <div className={className}>
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
        <FormattedMessage
          id='about'
          defaultMessage='Default'
        />
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
}

const { bool } = React.PropTypes

Navigation.propTypes = {
  showOnSmallScreens: bool
}

module.exports = Navigation
