require('dotenv').config();

const Env = process.env.NODE_ENV || 'development'
const DEV = Env === 'development'
const STAGING = Env === 'staging'
const PROD = Env === 'production'

console.log(`Starting app in ${process.env.NODE_ENV} environment`)

// tells node to run all required files through babel
// Note: this file is not run through babel, so it cannot use all
// ES2015 syntax
require('babel-register')

// Express is a node-based server
const express = require('express')

const React = require('react')

// Renders react components as a string
const ReactDOMServer = require('react-dom/server')

const ReactRouter = require('react-router')
const RouterContext = ReactRouter.RouterContext
const match = ReactRouter.match

const ReactRedux = require('react-redux')
const Provider = ReactRedux.Provider

// Must specify .js because node does not use webpack
const store = require('js/store.js')

// Provides templating language used in index.html
const _template = require('lodash.template')

// Node package, stands for file system. Will be used to read index.html
// into memory
const fs = require('fs')

// The port we've chosen to run our app on
const port = 8080

const Routes = require('js/components/Routes.jsx')
const Helmet = require('react-helmet')
const Meta = require('js/components/Meta')

// Read index.html into memory
const baseTemplate = fs.readFileSync('index.html')

// Create a template function that returns a string based on index.html
const template = _template(baseTemplate)

const app = express()

app.use('/public', express.static('./public'))

const UGLIFY = PROD || STAGING
const bundleJSFileName = UGLIFY ? 'bundle.min.js' : 'bundle.js'

app.use((req, res) => {
  var url = req.protocol + '://' + req.get('host') + req.originalUrl

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
        const title = head.title.toString()
        const meta = head.meta.toString()
        const link = head.link.toString()

        res.status(200).send(template({
          title,
          meta,
          body,
          link,
          bundleJSFileName,
          url
        }))
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
