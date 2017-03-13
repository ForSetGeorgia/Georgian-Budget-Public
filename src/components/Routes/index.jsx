const React = require('react')
const { IndexRedirect, Redirect, Route } = require('react-router')

const ConnectedIntlProvider = require('./ConnectedIntlProvider')
const ExploreDetails = require('./ExploreDetails/index')
const AboutContainer = require('./About/Container')

const Routes = () => (
  <div>
    <Route path='/:locale' component={ConnectedIntlProvider}>
      <IndexRedirect to='explore/details' />
      <Route path='about' component={AboutContainer} />

      <Route path='explore/details'>
        <IndexRedirect to='8b03adb43773622088d7291c38fbf87b82cbe626' />
        <Route path=':detailsItemId' component={ExploreDetails} />
      </Route>
    </Route>

    <Redirect from='*' to='/ka' />
  </div>
)

module.exports = Routes
