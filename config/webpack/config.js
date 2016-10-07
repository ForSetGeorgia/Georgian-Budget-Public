require('dotenv').config()
const paths = require('config/paths')

const Env = process.env.NODE_ENV || 'development'
const DEV = Env === 'development'
const STAGING = Env === 'staging'
const PROD = Env === 'production'

console.log('Running webpack in ' + Env + ' environment')

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')

var webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(
  require('./isomorphic-tools.config.js')
)

if (DEV) webpack_isomorphic_tools_plugin = webpack_isomorphic_tools_plugin.development()

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
  new ExtractTextPlugin('bundle.css'),
  webpack_isomorphic_tools_plugin
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
  },
  {
    test: /\.svg$/,
    loader: 'svg-inline'
  },
  {
    test: /\.ttf$/,
    loader: 'url?limit=10000'
  }
]

const config = {
  context: paths.ROOT,
  entry: 'js/browser.jsx',
  output: {
    path: paths.BUNDLES,
    filename: UGLIFY ? 'bundle.min.js' : 'bundle.js'
  },
  devtool: DEV ? 'eval-source-map' : 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx', '.scss', '.svg'],
    root: [ paths.ROOT ]
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
