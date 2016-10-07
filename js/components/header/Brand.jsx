const React = require('react')
const { Link } = require('react-router')

const Brand = (_props, { currentLocale }) => {
  return (
    <h1 className='brand'>
      <Link className='brand-link' to={`/${currentLocale}`}>
        ბიუჯეტის ამბები
      </Link>
    </h1>
  )
}

const { string } = React.PropTypes

Brand.contextTypes = {
  currentLocale: string
}

module.exports = Brand
