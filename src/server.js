// The port we've chosen to run our app on
const port = 8080
// Express is a node-based server
const express = require('express')

const React = require('react')
const match = require('react-router').match
const Routes = require('src/components/Routes/index.jsx')
const getPage = require('src/serverPages').getPage

const app = express()

app.use('/public', express.static('./public'))

app.use((req, res) => {
  match(
    { routes: Routes(), location: req.url },
    (error, redirectLocation, renderProps) => {
      if (error) {
        res.status(500).send(error.message)
      } else if (redirectLocation) {
        res.redirect(302, redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {

        // assemble full route
        const routePath = renderProps.routes
          .map((m) => { return m.hasOwnProperty('path') ? m.path : null })
          .filter((f) => { return f !== null }).join('/')
        const pageOptions = { req, res, renderProps }
        const userAgent = req.headers['user-agent']

        if(routePath === '/:locale/explore/details/:detailsItemId' &&
          typeof userAgent !== 'undefined' &&
          (userAgent.indexOf('facebookexternalhit') !== -1 ||
          userAgent.indexOf('Twitterbot') !== -1)) {
            getPage('share', pageOptions)
        } else { // pages except explore page scraped by facebook and twitter bots
          getPage('generic', pageOptions)
        }

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
