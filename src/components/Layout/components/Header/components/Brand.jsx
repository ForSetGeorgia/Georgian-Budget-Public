const React = require('react')
const { Link } = require('react-router')
const Svg = require('src/components/shared/Svg')

const Brand = (_props, { currentLocale }) => {
  const brandSvg = require(`public/images/brand_${currentLocale}`)

  return (
    <h1 className='gb-Brand'>
      <Link className='gb-Brand-link' to={`/${currentLocale}`}>
        <Svg className='gb-Brand-link-img' markup={brandSvg} />
      </Link>
    </h1>
  )
}

const { string } = React.PropTypes

Brand.contextTypes = {
  currentLocale: string
}

module.exports = Brand
