require('dotenv').config()
const autoprefixer = require('autoprefixer')

const paths = require('src/paths')

const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const Webpack_isomorphic_tools_plugin = require('webpack-isomorphic-tools/plugin')

var webpack_isomorphic_tools_plugin = new Webpack_isomorphic_tools_plugin(
  require('./isomorphic-tools.config.js')
)

module.exports = env => {
  if (env.dev) webpack_isomorphic_tools_plugin = webpack_isomorphic_tools_plugin.development()

  const rules = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    },
    {
      test: /\.scss$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: [
          {
            loader: 'css-loader',
            options: {
              minimize: env.prod
            }
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      })
    },
    {
      test: webpack_isomorphic_tools_plugin.regular_expression('svg'),
      use: 'svg-inline-loader'
    },
    {
      test: webpack_isomorphic_tools_plugin.regular_expression('images'),
      use: 'file-loader'
    },
    {
      test: /\.ttf$/,
      use: 'url-loader'
    }
  ]

  if (env.dev) {
    rules.push({
      test: /\.jsx?$/,
      exclude: /node_modules/,
      enforce: 'pre',
      use: 'eslint-loader'
    })
  }

  const plugins = [
    new webpack.DefinePlugin({
      'process.env.API_URL': JSON.stringify(process.env.API_URL),
      'process.env.GOOGLE_ANALYTICS_ID': JSON.stringify(process.env.GOOGLE_ANALYTICS_ID),
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin(env.dev ? '[name].css' : '[name].[contenthash].css'),
    webpack_isomorphic_tools_plugin
  ]

  if (env.prod) {
    plugins.push(new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      sourceMap: true
    }))
  }

  plugins.push(new webpack.LoaderOptionsPlugin({
    options: {
      postcss: [ autoprefixer({ browsers: [ '> 1%' ]}) ]
    }
  }))

  const config = {
    context: paths.ROOT,
    entry: 'src/browser.jsx',
    output: {
      pathinfo: env.dev,
      path: paths.BUNDLES,
      publicPath: `/${paths.BUNDLES_RELATIVE}/`,
      filename: env.dev ? '[name].js' : '[name].[chunkhash].js'
    },
    devtool: env.dev ? 'eval' : 'source-map',
    resolve: {
      extensions: ['.js', '.jsx', '.json', '.scss', '.svg'],
      modules: [ paths.ROOT, 'node_modules' ]
    },
    stats: {
      colors: true,
      reasons: true,
      chunks: true
    },
    module: {
      rules: rules
    },
    plugins: plugins
  }

  if (env.debug) {
    console.log(config)
    debugger
  }

  return config
}
