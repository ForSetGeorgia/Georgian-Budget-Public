const React = require('react')
const { intlShape, injectIntl } = require('react-intl')
const { string, array, number } = React.PropTypes

// const englishLocaleData = require('node_modules/react-intl/locale-data/en')[0]
// const georgianLocaleData = require('node_modules/react-intl/locale-data/ka')[0]

// addLocaleData([
//   englishLocaleData,
//   georgianLocaleData
// ])

const appMessages = require('src/messages/app')
const shareMessages = require('src/messages/share')

const Share = React.createClass({
  propTypes: {
    locale: string.isRequired,
    title: string.isRequired,
    descriptionData: array,
    url: string.isRequired,
    imageUrl: string.isRequired,
    intl: intlShape,
    appId: number
    // intl: intlShape.isRequired
  },
  getDefaultProps: function () {
    return {
      descriptionData: []
    }
  },
  getTitle () {
    const title = this.props.title
    const appName = this.props.intl.formatMessage(appMessages.name)
    return (title !== '' ? (title + ' | ') : '') + appName // this.props.title //
  },
  getDescription () {
    const { intl } = this.props
    const data = this.props.descriptionData
    let msg
    if (data.length === 1) {
      msg = intl.formatMessage(shareMessages.share_description_short, {year1: data[0][0], amount1: intl.formatNumber(Math.round(data[0][1]))})
    } else if (data.length === 2) {
      msg = intl.formatMessage(shareMessages.share_description, {year1: data[0][0], amount1: intl.formatNumber(Math.round(data[0][1])), year2: data[1][0], amount2: intl.formatNumber(Math.round(data[1][1]))})
    } else {
      msg = intl.formatMessage(appMessages.description)
    }
    return msg
  },
  render () {
    const { locale, url, imageUrl, appId } = this.props
    const title = this.getTitle()
    const description = this.getDescription() // formatMessage(messages.feesMessage) //
    return (
      <html lang={locale}>
        <head>
          <meta charSet="UTF-8" />
          <meta name="description" content={description} />

          <meta property="og:title" content={title} />
          <meta property="og:site_name" content={title} />
          <meta property="og:image" content={imageUrl} />
          <meta property='og:image:width' content='1200' />
          <meta property='og:image:height' content='750' />
          <meta property="og:description" content={description} />
          <meta property="og:url" content={url} />
          <meta property="og:type" content="website" />
          <meta property='fb:app_id' content={appId} />

          <meta name="twitter:card" content="summary_large_image" />
          <meta name="twitter:title" content={title} />
          <meta name="twitter:description" content={description} />
          <meta name="twitter:image" content={imageUrl} />

          <title>{title}</title>
          <link rel='shortcut icon' type='image/png' href={process.env.APP_URL + '/public/favicon.ico'} />
        </head>
        <body>
          <a href={url}>{title}</a>
          <p>{description}</p>
        </body>
      </html>
    )
  }
})

module.exports = injectIntl(Share) //, shareInitializer: shareInitializer }
