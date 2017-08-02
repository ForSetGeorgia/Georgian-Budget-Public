const React = require('react')
// Renders react components as a string
const ReactDOMServer = require('react-dom/server')

const DEV = (process.env.NODE_ENV || 'development') === 'development'

const Helmet = require('react-helmet')
// const Meta = require('src/components/shared/Meta.jsx')




const helpers = {
  shareDataFetcher: function (locale, detailsItemId, callback) {
    const axios = require('axios')
    const defaultResonse = {title: '', descriptionData: []}
    axios
    .get(
      `${process.env.API_URL}/${locale}/v1/budget_items/${detailsItemId}`,
      {
        params: {
          budgetItemFields: 'id,name,spentFinances,plannedFinances' // type,code,
        },
        headers: {
          'X-Requested-With': 'XMLHttpRequest',
          'X-Key-Inflection': 'camel'
        }
      }
    )
    .then(response => {
      let d = (!response || !response.data || typeof response.data !== 'object') ? null : response.data
      if (response.data.errors.length) { d = null }

      if (d !== null) {
        const { name, spentFinances } = d.budgetItem // , plannedFinances
        let yearlySpentFinances = spentFinances
          .filter((f) => { return f.timePeriodType === 'year' })
          .sort((x, y) => { return x.timePeriod - y.timePeriod })
          .map((m) => { return [Number(m.timePeriod.replace('y', '')), Number(m.amount)] })

        yearlySpentFinances = [yearlySpentFinances.pop(), yearlySpentFinances.pop()].filter((f) => { return f !== undefined })

        callback({title: name, descriptionData: yearlySpentFinances})
      } else {
        callback(defaultResonse)
      }
    })
    .catch((error) => {
      console.log(`Error communicating with API: ${error}`)
      callback(defaultResonse)
    })
  },
  urlWithPath: (req, path) => (
    req.protocol + '://' + req.get('Host') + path
  ),
  fullUrl: (req) => helpers.urlWithPath(req, req.originalUrl)
}

const pages = {
  generic: function ({ res, renderProps, head, locale, imageUrl, pageUrl, mainJs, mainCss }) {
    const RouterContext = require('react-router').RouterContext
    const Html = require('src/components/Html.jsx')
    const Provider = require('react-redux').Provider

    // Must specify .js because node does not use webpack
    const store = require('src/data/store.js')

    const body = ReactDOMServer.renderToString(
      React.createElement(Provider, {store},
        React.createElement(RouterContext, renderProps)
      )
    )

    const htmlAttributes = head.htmlAttributes.toComponent()
    const title = head.title.toComponent()
    const meta = head.meta.toComponent()

    const html = '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
      React.createElement(
        Html,
        {
          htmlAttributes,
          title,
          meta,
          body,
          mainJs,
          mainCss,
          url: pageUrl,
          imageUrl: imageUrl,
          appId: process.env.FB_APP_ID
        }
      )
    )
    res.status(200).send(html)
  },
  share: function ({ res, params, locale, imageUrl, pageUrl, canonicalPageUrl }) {

    const IntlProvider = require('react-intl').IntlProvider
    const Share = require('src/components/Share')

    const detailsItemId = params.detailsItemId

    helpers.shareDataFetcher(locale, detailsItemId, function (itemData) {
      const html = '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
        React.createElement(IntlProvider, {locale: locale, messages: require(`locales/${locale}.json`)},
          React.createElement(
            Share,
            {
              locale: locale,
              title: itemData.title,
              descriptionData: itemData.descriptionData,
              url: pageUrl,
              canonicalUrl: canonicalPageUrl,
              imageUrl: imageUrl
            }
          )
        )
      )
      res.status(200).send(html)
    })
  }
}

module.exports = {
  getPage: function (page, options) {
    if (DEV) { // global variable
      webpack_isomorphic_tools.refresh()
    }

    const isomorphic_assets = webpack_isomorphic_tools.assets()

    const head = Helmet.rewind()
    const { req, res, renderProps } = options
    const params = renderProps.params
    const locale = params.locale

    const imageUrl = helpers.urlWithPath(
      req,
      isomorphic_assets.assets[`./public/images/share_${locale}.jpg`]
    )
    const pageUrl = helpers.fullUrl(req) // req.url is not the whole URL

    if(page === 'share') {
      const canonicalPageUrl = helpers.urlWithPath(req, req.path) // req.url is not the whole URL
      pages.share({res, params, locale, imageUrl, pageUrl: pageUrl, canonicalPageUrl: canonicalPageUrl })
    } else {
      const mainJs = isomorphic_assets.javascript.main
      const mainCss = isomorphic_assets.styles.main
      pages.generic({res, renderProps, head, locale, imageUrl, pageUrl, mainJs, mainCss})
    }
  }
}


