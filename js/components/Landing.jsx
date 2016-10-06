const React = require('react')
const { Link } = require('react-router')

const Helmet = require('react-helmet')

const Landing = () => (
  <div>
    <Helmet
      title='Home'
    />
    <Link to='/ka/explore/'>
      Click here to explore!
    </Link>
  </div>
)

module.exports = Landing
