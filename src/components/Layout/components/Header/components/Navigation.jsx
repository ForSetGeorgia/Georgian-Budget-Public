const React = require('react')
const { bool, string } = React.PropTypes
const { intlShape, injectIntl } = require('react-intl')
const { Link } = require('react-router')
const LocaleLink = require('./LocaleLink')
const Svg = require('src/components/shared/Svg')
const { FormattedMessage } = require('react-intl')

const Navigation = (props) => {
  const { locale } = props.intl
  let className = 'app-navigation'
  if (props.showOnSmallScreens) {
    className += ' is-shown-on-small-screens'
  }
  const { shareUrl } = props

  const enableSharing = true

  return (
    <div className={className}>
      <Link
        to={`/${locale}/explore/details`}
        className='app-navigation-link'
      >
        <FormattedMessage
          id='app.header.explore'
          description='Explore link in the Header navigation'
          defaultMessage='Explore'
        />
      </Link>
      <Link
        to={`/${locale}/media`}
        className='app-navigation-link'
      >
        <FormattedMessage
          id='app.header.media'
          description='Media link in the Header navigation'
          defaultMessage='In Media'
        />
      </Link>
      <Link
        to={`/${locale}/about`}
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
        href={enableSharing ? `https://www.facebook.com/sharer/sharer.php?u=${shareUrl}` : '#'}
        className='app-navigation-link'
        target='_blank'
      >
        <Svg
          className='app-navigation-link-img'
          markup={require('public/images/facebook_icon')}
        />
      </a>
      <a
        href={enableSharing ? `https://twitter.com/share?url=${shareUrl}` : '#'}
        className='app-navigation-link'
        target='_blank'
      >
        <Svg
          className='app-navigation-link-img'
          markup={require('public/images/twitter_icon')}
        />
      </a>
    </div>
  )
}

Navigation.propTypes = {
  showOnSmallScreens: bool,
  intl: intlShape,
  shareUrl: string
}

module.exports = injectIntl(Navigation)
