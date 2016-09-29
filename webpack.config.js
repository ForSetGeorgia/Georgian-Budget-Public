require('dotenv').config()

const Env = process.env.NODE_ENV || 'development'

const path = require('path')
const webpack = require('webpack')

const preloaders = []

if (Env === 'development') {
  preloaders.push({
    test: /\.jsx?$/,
    loader: 'eslint-loader',
    exclude: /node_modules/
  })
}

const definePlugin = new webpack.DefinePlugin({
  'process.env.API_URL': JSON.stringify(process.env.API_URL)
});

module.exports = {
  context: __dirname,
  entry: './js/browser.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
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
  plugins: [
    definePlugin
  ]
}
