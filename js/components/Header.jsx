const React = require('react')
const { Link } = require('react-router')

const Header = () => (
  <div>
    <Link to='/ka/explore'>
      Explore
    </Link>
    <Link to='/ka/about'>
      შესახებ
    </Link>
  </div>
)

module.exports = Header
