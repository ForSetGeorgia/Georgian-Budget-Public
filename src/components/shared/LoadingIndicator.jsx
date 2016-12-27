const React = require('react')
const Svg = require('src/components/shared/Svg')
const svg = require('public/images/loading_indicator')

const outerContainerStyle = {
  display: 'flex',
  'justifyContent': 'center'
}

const size = '600px'

const innerContainerStyle = {
  display: 'block',
  'width': size,
  'height': size,
  'maxWidth': '100%',
  'maxHeight': '100%'
}

const LoadingIndicator = () => (
  <span style={outerContainerStyle}>
    <span style={innerContainerStyle}>
      <Svg markup={svg} />
    </span>
  </span>
)

module.exports = LoadingIndicator
