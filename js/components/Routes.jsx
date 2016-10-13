const React = require('react')
// const { IndexRoute, Redirect, Route } = require('react-router')
const { IndexRedirect, Redirect, Route } = require('react-router')

const ConnectedIntlProvider = require('js/components/ConnectedIntlProvider')
// const Landing = require('js/components/Landing')
const Explore = require('js/components/Explore')
const About = require('js/components/About')

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
