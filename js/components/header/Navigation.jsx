const React = require('react')
const { Link } = require('react-router')
const LocaleLink = require('./LocaleLink')
const Svg = require('js/components/Svg')
const { FormattedMessage } = require('react-intl')

const Navigation = (props, { currentLocale }) => {
  let className = 'app-navigation'
  if (props.showOnSmallScreens) {
    className += ' is-shown-on-small-screens'
  }

  const enableSharing = false

  return (
    <div className={className}>
      <Link
        to={`/${currentLocale}/explore`}
        className='app-navigation-link'
      >
        <FormattedMessage
          id='app.header.explore'
          description='Explore link in the Header navigation'
          defaultMessage='Explore'
        />
      </Link>
      <Link
        to={`/${currentLocale}/about`}
        className='app-navigation-link'
      >
        <FormattedMessage
          id='app.header.about'
          description='About link in the Header navigation'
          defaultMessage='About'
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
        href={enableSharing ? 'https://www.facebook.com/sharer/sharer.php' : '#'}
        className='app-navigation-link'
      >
        <Svg
          className='app-navigation-link-img'
          markup={require('public/images/facebook_icon')}
        />
      </a>
      <a
        href={enableSharing ? 'https://twitter.com/share' : '#'}
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

const { bool, string } = React.PropTypes

Navigation.propTypes = {
  showOnSmallScreens: bool
}

Navigation.contextTypes = {
  currentLocale: string
}

module.exports = Navigation
