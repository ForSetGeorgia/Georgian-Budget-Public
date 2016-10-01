const React = require('react')
// const { IndexRoute, Redirect, Route } = require('react-router')
const { IndexRedirect, Redirect, Route } = require('react-router')

const Layout = require('./Layout')
// const Landing = require('./Landing')
const Explore = require('./Explore')
const About = require('./About')

const Routes = () => (
  <div>
    <Route path='/ka' component={Layout}>
      {/* <IndexRoute component={Landing} /> */}
      <IndexRedirect to='explore' />
      <Route path='about' component={About} />
      <Route path='explore' component={Explore} />
    </Route>
    <Redirect from='*' to='/ka/explore' />
  </div>
)

module.exports = Routes
