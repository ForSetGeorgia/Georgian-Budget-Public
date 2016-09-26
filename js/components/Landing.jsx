const React = require('react')
const { Link } = require('react-router')

const Helmet = require('react-helmet')

const Landing = () => (
  <main>
    <Helmet
      title='Home'
    />
    <Link to='/ka/explore/'>
      Click here to explore!
    </Link>
  </main>
)

module.exports = Landing
