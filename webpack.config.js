require('dotenv').config()
var ExtractTextPlugin = require("extract-text-webpack-plugin");

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
  }),
  new ExtractTextPlugin('bundle.css')
]

const UGLIFY = STAGING || PROD

if (UGLIFY) {
  plugins.push(new webpack.optimize.UglifyJsPlugin({
    mangle: true,
    sourceMap: true
  }))
}

const loaders = [
  {
    test: /\.jsx?$/,
    loader: 'babel'
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      'style',
      [
        UGLIFY ? 'css?minimize!' : 'css',
        'sass'
      ]
    )
  }
]

const config = {
  context: __dirname,
  entry: './js/browser.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: UGLIFY ? 'bundle.min.js' : 'bundle.js',
    publicPath: '/public/'
  },
  devtool: DEV ? 'eval-source-map' : 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root: [ path.resolve('.') ]
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: true
  },
  module: {
    preLoaders: preloaders,
    loaders: loaders
  },
  plugins: plugins
}

console.log('CONFIG IS: ', config)

module.exports = config
