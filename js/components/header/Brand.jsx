const React = require('react')
const { Link } = require('react-router')
const Svg = require('js/components/Svg')

const Brand = (_props, { currentLocale }) => {
  const brandSvg = require(`public/images/brand_${currentLocale}`)

  return (
    <h1 className='brand'>

      <Link className='brand-link' to={`/${currentLocale}`}>
        <Svg className='brand-link-img' markup={brandSvg} />
      </Link>
    </h1>
  )
}

const { string } = React.PropTypes

Brand.contextTypes = {
  currentLocale: string
}

module.exports = Brand
