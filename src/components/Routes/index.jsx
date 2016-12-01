const React = require('react')
// const { IndexRoute, Redirect, Route } = require('react-router')
const { IndexRedirect, Redirect, Route } = require('react-router')

const ConnectedIntlProvider = require('./ConnectedIntlProvider')
// const Landing = require('./Landing/index')
const Explore = require('./Explore/index')
const About = require('./About/index')

const Routes = () => (
  <div>
    <Route path='/:locale' component={ConnectedIntlProvider}>
      {/* <IndexRoute component={Landing} /> */}
      <IndexRedirect to='explore' />
      <Route path='about' component={About} />
      <Route path='explore' component={Explore} />
    </Route>

    <Redirect from='*' to='/ka/explore' />
  </div>
)

module.exports = Routes
