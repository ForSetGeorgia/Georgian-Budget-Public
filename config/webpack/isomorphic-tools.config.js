const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin');
const paths = require('config/paths')

module.exports = {
  webpack_assets_file_path: `${paths.ROOT}/webpack-assets.json`,
  assets: {
    svg: {
      extensions: ['svg']
    },
    images: {
      extensions: ['png', 'jpg', 'gif', 'ico']
    }
  }
}
