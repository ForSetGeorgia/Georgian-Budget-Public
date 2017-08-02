const React = require('react')
const { IndexRedirect, Redirect, Route } = require('react-router')

const ConnectedIntlProvider = require('./ConnectedIntlProvider')
const ExploreDetails = require('./ExploreDetails/index')
const About = require('./About/index')
const Media = require('./Media/index')
const Share = require('src/components/Share')

const Routes = () => (
  <div>
    <Route path='/:locale' component={ConnectedIntlProvider}>
      <IndexRedirect to='explore/details' />
      <Route path='about' component={About} />
      <Route path='media' component={Media} />
      <Route path='explore/details'>
        <IndexRedirect to='8b03adb43773622088d7291c38fbf87b82cbe626' />
        <Route path=':detailsItemId' component={ExploreDetails} />
      </Route>
      <Route path='share/details'>
        <IndexRedirect to='8b03adb43773622088d7291c38fbf87b82cbe626' />
        <Route path=':detailsItemId' component={Share} />
      </Route>
    </Route>

    <Redirect from='*' to='/ka' />
  </div>
)

module.exports = Routes
