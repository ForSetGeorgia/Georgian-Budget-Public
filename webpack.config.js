require('dotenv').config()

const Env = process.env.NODE_ENV || 'development'
const DEV = Env === 'development'
const STAGING = Env === 'staging'
const PROD = Env === 'production'

console.log('Running webpack in ' + Env + ' environment')

const path = require('path')
const webpack = require('webpack')

const preloaders = []

if (DEV) {
  preloaders.push({
    test: /\.jsx?$/,
    loader: 'eslint-loader',
    exclude: /node_modules/
  })
}

const plugins = [
  new webpack.DefinePlugin({
    'process.env.API_URL': JSON.stringify(process.env.API_URL)
  })
]

const UGLIFY = STAGING || PROD

if (UGLIFY) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    sourceMap: true
  }))
}

console.log('PLUGINS ARE: ', plugins)

module.exports = {
  context: __dirname,
  entry: './js/browser.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: UGLIFY ? 'bundle.min.js' : 'bundle.js',
    publicPath: '/public/'
  },
  devtool: DEV ? 'eval-cheap-module-source-map' : 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx'],
    root: [ path.resolve('.') ]
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    preLoaders: preloaders,
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader'
      }
    ]
  },
  plugins: plugins
}
