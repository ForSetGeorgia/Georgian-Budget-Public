const Env = process.env.NODE_ENV || 'development'
const DEV = Env === 'development'
const STAGING = Env === 'staging'
const PROD = Env === 'production'

// Express is a node-based server
const express = require('express')

const React = require('react')

// Renders react components as a string
const ReactDOMServer = require('react-dom/server')

const ReactRouter = require('react-router')
const RouterContext = ReactRouter.RouterContext
const match = ReactRouter.match

const IntlProvider = require('react-intl').IntlProvider

const ReactRedux = require('react-redux')
const Provider = ReactRedux.Provider

// Must specify .js because node does not use webpack
const store = require('js/redux/store.js')

// The port we've chosen to run our app on
const port = 8080

const Routes = require('js/components/Routes.jsx')
const Helmet = require('react-helmet')
const Meta = require('js/components/Meta.jsx')
const Html = require('js/components/Html.jsx')

const app = express()

app.use('/public', express.static('./public'))

const UGLIFY = PROD || STAGING
const bundleJSFileName = UGLIFY ? 'bundle.min.js' : 'bundle.js'

app.use((req, res) => {
  var url = req.protocol + '://' + req.get('host') + req.originalUrl

  if (DEV) {
    webpack_isomorphic_tools.refresh()
  }

  match(
    { routes: Routes(), location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        const body = ReactDOMServer.renderToString(
          React.createElement(Provider, {store},
            React.createElement(RouterContext, renderProps)
          )
        )

        React.createElement(Meta, { url })

        const head = Helmet.rewind()
        const htmlAttributes = head.htmlAttributes.toComponent()
        const title = head.title.toComponent()
        const meta = head.meta.toComponent()
        const link = head.link.toComponent()

        const html = '<!DOCTYPE html>' + ReactDOMServer.renderToStaticMarkup(
          React.createElement(
            Html,
            {
              htmlAttributes,
              title,
              meta,
              body,
              link,
              bundleJSFileName,
              url,
              Env
            }
          )
        )

        res.status(200).send(html)
      } else {
        res.status(404).send('Not found')
      }
    }
  )
})

app.set('trust proxy', true);
app.set('trust proxy', 'loopback');

console.log('listening on port ' + port)
app.listen(port)
